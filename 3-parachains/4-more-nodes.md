# Adding Parachain Nodes

A parachain _can_ work with only a single collator as we've shown already. But that configuration is
not very decentralized. An adversary would only need to take down a single node to stall the
parachain.

## Start the Second Collator

The command to run additional collators is as follows. This command is nearly identical to the one
we used to start the first collator, but again we need to avoid conflicting ports and directories

```bash
parachain-collator \
  --collator \
  --tmp
  --parachain-id <Your ID> \
  --port <Your chosen libp2p port> \
  --ws-port <Your chosen websocket port> \
  --bootnodes <Your first collator> \
  --bob \
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain <relay chain spec json> \
  --port <Your chosen libp2p port> \
  --ws-port <Your chosen websocket port> \
  --bootnodes <Alice, and other relay chain collators>
```

## Full Nodes

It is also possible to start non-collating full nodes in the parachain. For these options, simply
leave out the `--collator` flag.

```bash
parachain-collator \
  --tmp
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain spec.json \
  --bootnodes <Alice, Bob, and other relay chain collators>
```
