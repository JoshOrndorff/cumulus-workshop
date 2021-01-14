# Interact with your Parachain

The entire point of launching and registering parachains is that we can submit transactions to the
parachains and interact with them.

## Connecting the Apps UI

We've already connected the Apps UI to the relay chain node. Now we can also connect to the
parachain collator. Open another instance of Apps in a new browser window, and connect it to the
appropriate endpoint. If you have followed these instructions so far, you can connect to the
parachain node at https://polkadot.js.org/apps/#/?rpc=ws://localhost:9855

## Submit Transactions

You can make some simple token transfers to ensure that the parachain is operating normally. You can
also make some on-chain remarks by submitting `Extrinsics` -> `System` -> `remark`.

If transactions go through as expected, you have a working parachain! In the next section we'll
learn about cross-chain transfers.
