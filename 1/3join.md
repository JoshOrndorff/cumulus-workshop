# Connect to the Network

You can use the `substrate-node-template` you compiled earlier and this chain specification file to connect to our network.

1. Save the [`spec.json`](https://sfbw.bootnodes.net/spec.json) file in the `substrate-node-template` folder.

2. Launch your node:

	```bash
	./target/release/node-template \
		--chain spec.json \
		--name YourNodeName
	```

> You can use the flag `--log sub-libp2p,sync` for verbose network logs for debugging if you need it.

It will use these bootstrap nodes:

```json
"bootNodes": [
    "/dns4/sfbw.bootnodes.net/tcp/30333/p2p/QmNdzun5tXSo7TPEntmujvU3eLEjTJKfXpJAvwp1ikpa6T",
    "/ip4/167.71.86.67/tcp/30333/p2p/QmdP4qG1ZSgzmsdFpBwuPAVWG9zjPRHV3dSkTT8v4TGP4J"
],

```


Notice that your node now appears on the telemetry page.


## Discussion

* Raw Spec
* Node Roles
	* Boot Nodes
	* Validators
	* Full Nodes
