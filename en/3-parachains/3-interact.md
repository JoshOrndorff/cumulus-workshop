# Interact with your Parachain

The entire point of launching and registering parachains is that we can submit transactions to the
parachains and interact with them.

## Connecting the Apps UI

We've already connected the Apps UI to the relay chain node. Now we can also connect to the
parachain collator. Open another instance of Apps in a new browser window, and connect it to the
appropriate endpoint. If you have followed these instructions so far, you can connect to the
parachain node at https://polkadot.js.org/apps/#/?rpc=ws://localhost:9844

## Submit Transactions

You can make some simple token transfers to ensure that the parachain is operating normally. You can
also make some on-chain remarks by submitting `Extrinsics` -> `System` -> `remark`.

If transactions go through as expected, you have a working parachain! 

If you get a UI error
indicating "Could not convert parameter `tx` between node and runtime: No such variant in 
enum MultiSignature", go into `Settings` -> `Developer` and add these metadata types:

```json
{
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress"
}
```

## Cross-chain Message Passing (XCMP)

A parachain is it's own chain, but one key feature of connecting to a _common_ relaychain is the
ability to communicate _between_ the connected partied. This functionality is a _very active_
area of development, and for now is not implemented in this workshop. A few things to keep
in mind when interacting with the various connected chains:

- The relay chain has no parachain state, so can't query parachain data. 
  Only Proof of Validity (PoV) information resides in relay chain storage: the Wasm runtime 
  validation functions and PoV headers.
- The relaychain is not the place to submit extrinsics or gather events data about parachains
  and vice versa. You should communicate with a _collator_ node directly for parachain operations.
  - Vertical message passing (VMP) will eventually allow for  
  - Systems and possibly common-good parachains will likely be accessible directly from relaychain
    for extrinsics and events, but in general, most parachains are not expected to do this. 

> For a detailed overview, see the [Polkadot wiki on XCMP](https://wiki.polkadot.network/docs/en/learn-crosschain)
