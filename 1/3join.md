# Connect to the Network

You can use the `substrate-node-template` you compiled earlier and this chain specification file to connect to our network.

1. Save the [`spec.json`](https://bootnodes.net/spec.json) file in the `substrate-node-template` folder.

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
    "/ip4/45.55.48.79/tcp/30333/p2p/QmUdcY7duoqaE6xEpaTTRK8FHpTGGHtxLwL3XW9kM5yd47",
    "/ip4/167.71.86.67/tcp/30333/p2p/QmQHVSS6xtd2MMz94KQNVKyLxgAdX8y7CKtEcvEkoKsVD2"
  ],
```

## Discussion

* Raw Spec
* Node Roles
	* Boot Nodes
	* Validators
	* Full Nodes
