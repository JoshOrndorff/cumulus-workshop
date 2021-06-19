# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch a relay chain to connect to.
This page describes in detail how to start both nodes in the two-validator `rococo-custom.json` 
spec that ships with this workshop as well as general instructions for starting additional nodes.

## Start Alice's Node

```bash
# Start Relay `Alice` node
polkadot \
--alice \
--validator \
--base-path /tmp/relay/alice \
--chain <path to spec json> \
--port 50555 \
--ws-port 9944
```

The port and websocket port specified here are the defaults and thus those flags can be omitted.
However We've chosen to leave them in to enforce the habit of checking their values. Because Alice
is using the defaults, no other nodes on the relay chain or parachains can use these ports.

> When the node starts you will see several log messages. **Take note of her node's Peer ID** 
> in the logs. We will need it when connecting other nodes to her. It will look something _like_
> this: 
>
> ```bash
> 🏷 Local node identity is: 12D3KooWGjsmVmZCM1jPtVNp6hRbbkGBK3LADYNniJAKJ19NUYiq
> ```

### Connect Apps UI

To explore and interact with the network, you can use the Polkadot JS Apps UI. If you've started
this node using the command above, you can access the node as
https://polkadot.js.org/apps/#/?rpc=ws://localhost:9944

> Some browsers, notably Firefox, will not connect to a local node from an https website. An easy
> work around is to try another browser, like Chromium.
> 
> At time of writing, this demo works with the hosted version of Apps linked above. If something has
> changed in the meantime, try to
> [host the interface locally](https://github.com/polkadot-js/apps#development) using the commit
> that is defined [the version compatablilty](/#versions-of-software) noted.

## Start Bob's Node

```bash
polkadot \
--bob \
--validator \
--base-path /tmp/relay-bob \
--chain <path to spec json> \
--bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID>
--port 30334 \
--ws-port 9955 \
```

Bob's command is perfectly analogous to Alice's. It differs concretely from Alice's in that Bob has
specified his own base path, provided his own valiator keys (`--bob`), and used his own ports.
Finally he has added a `--bootnodes` flag. This bootnodes flag is not strictly necessary if you are
running the entire network on a single local system, but it is necessary when operating over the
network, so I've chosen to leave it in.

## Starting Additional Nodes (Optional)

> If you are using the `rococo-custom.json` spec, you do not need to start additional nodes.

If you're using the `rococo-custom-3.json` or `rococo-custom-4.json` specs that ship with this workshop you will
need to start one or two more nodes. Again, this command is entirely analogous. You just need to
make sure that nodes on the same physical system do not have conflicting ports or base directories.

```bash
polkadot \
--charlie \
--validator \
--base-path /tmp/relay-charlie \
--chain <path to spec json> \
--port 30335 \
--ws-port 9966
```

If your custom chainspec includes self-generated keys, see the
[Substrate private network tutorial](https://substrate.dev/docs/en/tutorials/start-a-private-network/customchain#add-keys-to-keystore)
for details on inserting these keys.
