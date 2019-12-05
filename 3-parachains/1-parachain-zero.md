# Connecting Parachain Zero

We'll begin by deploying parachain zero -- the cryptocurrency parachain -- with a single collator.

## Generate Genesis State
To register a parachain, the relay chain needs to know the parachain's genesis state. The collator node can export that state to a file for us. The following command will create a file containing the parachain's entire genesis state, hex-encoded.

```bash
./target/release/parachain-zero-collator export-genesis-state genesis-state-zero
```

## Start the Collator Node
We can now start the collator node with the following command. Notice that we're supplying the same relay chain spec we used when launching relay chain nodes.

```bash
./target/release/parachain-zero-collator \
  --base-path collator-zero \
  --chain WorkshopRelayChainRaw.json \
  --bootnodes --bootnodes /dns4/relaychain.bootnodes.net/tcp/30333/p2p/QmayQzZgh1t41b3ta5GSm6tKvV7gpWnBYfHrPAYh756vSH
```

## Registration Transaction
When Polkadot is live, parachain slots will be auctioned. For the purpose of this workshop, we will skip the overhead of the auction, and instead use sudo transactions to force parachain registration. The transaction can be made from `Apps > Sudo > Registrar > registerPara` with the following parameters:

id: 0
ParaInfo: Always
code: from wbuild directory
initial_head_data: from previous step

![Registration screenshot](../assets/registration-screenshot.png)

## Is It Working?
Now that the parachain has been registered with the relay chain, we should see a few things start happening. Look for each of these signs that the parachain is live.

### Block Production
The collator should start producing parachain blocks (aka collating) once the registration is successful. The collator should start producing log messages like the following:
```
TODO
```

### Updating Heads
The relay chain tracks the latest heads of each parachain. When a relay chain block is finalized, any parachain blocks that are referenced from it or any of its parents are also finalized. This is how polkadot achieves shared security. We can check whether new parachain blocks are being referenced by the relay chain by querying the chain state in `Apps > Chain state > parachains > heads`. You should see the value change every few blocks.

<!--
## Interact
TODO When cumulus is more mature, it would be very insightful to actually submit transactions to the parachains and confirm that they execute properly
-->
