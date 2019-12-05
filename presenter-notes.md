* Main Doc: joshorndorff.github.io/cumulus-workshop
  * Share it with users! https://bit.ly/2rXBh70
* Using the server
  * ssh root@relaychain.bootnodes.net
  * password:
  * start scripts for each node and --fresh option
  ```bash
  ~/startalice.sh # Start's alice's node
  ~/startalice.sh --fresh  # Purges chain then start's alice's node
  ~/startbob.sh # start bob's node
  ~/startbob.sh --fresh # I bet you can guess
  ```
  * I run everything as root
  * websocket endpoints are `wss://relaychain.bootnodes.net/alice` and `/bob`
* If you register a parachain that ends up not working, you can deregister it with the ` registrar > deregisterPara` transaction.
* sudo key is //Alice (reminder, the DEV_PHRASE is bottom drive obey lake curtain smoke basket hold race lonely fit walk)
