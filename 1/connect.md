# Connect to the Network

You can use the `substrate-node-template` and this node configuration file to
connect to our network.

1. Save the [`spec.json`](https://bootnodes.net/spec.json) file in the `substrate-node-template` folder.

2. Run the following:

	```bash
	./target/release/node-template \
		--chain spec.json
		--
	```

> **NOTE:** You can use the flag `--log sub-libp2p,sync` for verbose network logs useful for debugging.

It will use these bootstrap nodes:

```json
  "bootNodes": [
    "/ip4/45.55.48.79/tcp/30333/p2p/QmUdcY7duoqaE6xEpaTTRK8FHpTGGHtxLwL3XW9kM5yd47",
    "/ip4/167.71.86.67/tcp/30333/p2p/QmQHVSS6xtd2MMz94KQNVKyLxgAdX8y7CKtEcvEkoKsVD2"
  ],
```

## Discussion

* Raw Spec
* Boot Nodes
