# Connecting Additional Parachain Nodes

A parachain _can_ work with only a single collator as we've shown already. But that configuration is
not very decentralized. An adversary would only need to take down a single node to stall the
parachain.

> You should have _at least_ 2 **validators** (relay chain nodes) running for every **collator**
> (parachain nodes) on your network! This is why we have included a prebuilt 3 and 4 validator 
> chain spec for you in [the workshop assets](/#_1a-using-a-prebuilt-chain-spec), and you
> can add more as needed, described there.

## Start the Second Collator

The command to run additional collators is as follows. This command is nearly identical to the one
we used to start the first collator, but again we need to avoid conflicting ports and directories

```bash
parachain-collator \
--bob \
--collator \
--force-authoring \
--parachain-id 2000 \
--base-path /tmp/parachain/bob \
--bootnodes <a running collator node> \
--port 40334 \
--ws-port 9946 \
-- \
--execution wasm \
--chain <relay chain spec json> \
--port 30344 \
--ws-port 9978
--bootnodes <other relay chain node>
```

## Non-Collating Parachain Full Nodes

It is also possible to start non-collating full nodes in the parachain. For these options, simply
leave out the `--collator` flag.

```bash
parachain-collator \
  --base-path <a DB base path> \
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  -- \
  --chain <relay chain spec json> \
  --bootnodes <Alice, Bob, and other relay chain collators>
```
