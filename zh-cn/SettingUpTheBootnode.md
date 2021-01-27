# Objective

# Reference material

https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04

https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04

https://www.digitalocean.com/community/questions/configure-nginx-for-nodejs-backend-and-react-frontend-app

https://serverfault.com/questions/424452/nginx-enable-site-command

# Steps

## Base System

From digital ocean (or similar) create a new machine starting with Ubuntu 18.04. SSH in as root

## Setup the web server

install nginx `apt install nginx`

Confirm the server is working by going directly to your IP in the browser. Should see the nginx test page.

`cd /var/www/html` `cp index.nginx-debian.html index.html` `vim index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>SFBW Substrate Testnet</title>
    <style>
      body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>SFBW Substrate Testnet</h1>
    <p>Thanks for joining our Substrate testnet.</p>

    <p>
      You may compile the node from github
      <a href="https://github.com/substrate-develeoper-hub/substrate-node-template">Substrate Node Template</a>.<br />
      Download the <a href="spec.json">Chain Specification</a>.<br />
      Download the <a href="alice.json">Prefunded Alice Key</a>.<br />
    </p>
  </body>
</html>
```

We'll create those linked files later. Confirm the new webpage loads.

## Adding SSL

We need a domain. Registering it and setup dns so it points to your server. This process varies a lot by registrar. When
your domain loads the webpage we just created, you may proceed to setup SSL.

For setting up subdomains like sfbw.bootnodes.net just use an A record `sfbw A 1.2.3.4 3600`

Install certbot

```bash
add-apt-repository ppa:certbot/certbot
apt install python-certbot-nginx
```

Setup server block

```bash
cd /etc/nginx/sites-available
vim sfbw.bootnodes.net
```

```
server {
       listen 80;
       listen [::]:80;

       server_name sfbw.bootnodes.net;

       root /var/www/html/;
       index index.html;

       location / {
               try_files $uri $uri/ =404;
       }
}
```

Enable the new config by linking it from sites-available to sites-enabled
`ln -s /etc/nginx/sites-available/sfbw.bootnodes.net /etc/nginx/sites-enabled/` confirm config format is ok `nginx -t`.
reload the server `systemctl reload nginx`

Use certbot to setup ssl `certbot --nginx -d sfbw.bootnodes.net --register-unsafely-without-email` You could also fork
over your email. It only goes to EFF. I chose not to redirect http, but we should experiment with it. If it doesn't
break anything, we should do it.

Confirm your site loads with ssl by navigating to eg `https://sfbw.bootnodes.net`

## Install Node

```bash
# First time around I did the apt/rustup installs manually
# Script also works as of 1Nov2019
curl https://getsubstrate.io -sSf | bash -s -- --fast

git clone https://github.com/substrate-developer-hub/substrate-node-template
cd substrate-node-template
cargo build --release # If cargo was _just_ installed, start a new shell so it's on your path
```

## Server blocks for node

Once the node is built, add server blocks to redirect standard ports 9944 and 9933. These settings assume that the node
will expose ws and rpc on ports 9994 and 9993 respectively. That can be done with `--ws-port 9994 --rpc-port 9993`.
We'll automate those settings shortly.

Add this at the bottom, and notice the top has changed thanks to certbot. You'll need to adjust the domain name in these
lines.

```
server {
  listen 9944 ssl;

  server_name sfbw.bootnodes.net;

  ssl_certificate /etc/letsencrypt/live/sfbw.bootnodes.net/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/sfbw.bootnodes.net/privkey.pem; # managed by Certbot

  location / {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:9994;
    proxy_http_version 1.1;
  }
}


server {
  listen 9933 ssl;

  server_name sfbw.bootnodes.net;

  ssl_certificate /etc/letsencrypt/live/sfbw.bootnodes.net/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/sfbw.bootnodes.net/privkey.pem; # managed by Certbot

  location / {
    proxy_buffers 16 4k;
    proxy_buffer_size 2k;
    proxy_pass http://localhost:9993;
  }
}

```

check syntax and reload

```bash
nginx -t
systemctl reload nginx
```

Start your node with --ws-port 9994 --rpc-port 9993 and confirm you can connect with hosted apps. On settings tab use
`wss://sfbw.bootnodes.net:9944`

## Create a shared chainspec

Create a basic chainspec based on local testnet `node-template build-spec --chain local > spec.json`

Edit the name and id of the network, the root key, the prefunded accounts etc.

Before we can add bootnodes to the chainspec, we need to know their node identities. That means we need to start each
node once to let it generate node keys.

Start Alice's node like `node-template --chain=spec.json --alice` Once the node starts, observe its node identity, then
kill it with ^C. Repeat this for any other nodes you'd like in the chainspec's bootnodes section.

Now edit the chainspec again, adding each bootnode in the format

```json
"bootNodes": [
    "/dns4/sfbw.bootnodes.net/tcp/30333/p2p/QmNdzun5tXSo7TPEntmujvU3eLEjTJKfXpJAvwp1ikpa6T",
    "/ip4/167.71.86.67/tcp/30333/p2p/QmdP4qG1ZSgzmsdFpBwuPAVWG9zjPRHV3dSkTT8v4TGP4J"
],
```

Warning: You should not delete the node's entire data directory from this point on. You may purge the chain with the
`purge-chain` sub command, but if you delete the entire directory, it will delete the node key and change the node's
identity.

Finally, publish the chainspec by copying it to the web directory

`cp spec.json /var/www/html/spec.json`

Comfirm you can access it over the web `https://sfbw.bootnodes.net/spec.json`

## Startup scripts (optional)

If your nodes need many flags, it may be wise to make a startup script just so you don't mess it up live. I usually
write one like this.

```bash
# Purge any old chain.
# Only wise for chains that will be restarted frequently (eg workshops)
# Long running chains should not be purged to avoid constant re-syncs
./target/release/node-template purge-chain --chain=spec.json -y

./target/release/node-template \
        --chain=spec.json \
        --alice \
        --ws-port 9994 \
        --rpc-port 9993
```

## Share the prefunded account

Remember at that our website offers users to download the pre-funded key. Add the Alice key to apps and export it to
json.
[Dev phrase](https://github.com/paritytech/substrate/blob/93123cc63eac37fed7a6cc6cc58e7e43d666ee03/core/primitives/src/crypto.rs#L40)

bottom drive obey lake curtain smoke basket hold race lonely fit walk //Alice I use password: alice or just a Upload the
json key to the server

## Host a frontend

Back in /root, clone the front end template
`git clone https://github.com/substrate-developer-hub/substrate-front-end-template/`

Install yarn following https://yarnpkg.com/lang/en/docs/install/#debian-stable

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt update
apt install yarn
```

install dependencies `yarn` modify production server to match your needs `vim src/config/production.json` and use
wss://sfbw.bootnodes.net:9944

build production release with `yarn build` then move build output directory inside of web root
`mv build /var/www/html/front-end`

You have to make sure the project name in the config file matches where you're serving it from.
