# Adding Parachain Nodes

A parachain _can_ work with only a single collator as we've shown already. But that configuration is not very decentralized. The adversary would only need to take down a single node to stall the parachain.

## Start the Second Collator
The command to run additional collators is as follows. This command is nearly identical to the one we used to start the first collator, but again we need to avoid conflicting ports and directories

```bash
parachain-collator \
  --bootnodes <Your first collator>
  --ws-port
  --port
  --parachain-id
  --validator
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain spec-raw.json \
  --bootnodes <Alice, Bob, and other relay chain collators> \
  --base-path collator2
```

## Full Nodes
It is also possible to start non-collating full nodes in the parachain. For these options, simply leave out the `--validator` flag.
