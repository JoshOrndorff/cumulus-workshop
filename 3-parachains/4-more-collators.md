# Adding More Collators

A parachain _can_ work with only a single collator as we've shown already. But that configuration is not very decentralized. The adversary would only need to take down a single node to stall the parachain.

## This is Experimental
Cumulus has come a long way over the past several months, but there are a few rough edges. Multiple collators is one of them. We will try this exercise to learn the principles, and practice the steps. Understand that this may break our chain. That's okay.

## Start the Second Collator
The command to run another test collator is as follows. This command is nearly identical to the one we used to start the first collator.

```bash
test-collator \
  --bootnodes <Your first collator>
  --ws-port
  --port
  --parachain-id
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain spec-raw.json \
  --bootnodes <Alice, Bob, and other relay chain collators> \
  --base-path collator2
```
