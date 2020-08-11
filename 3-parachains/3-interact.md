# Interact with your Parachain

The entire point of launching and registering parachains is that we can submit transactions to the parachains and interact with them.

## Connecting the Apps UI

We've already connected the Apps UI to the relay chain node. Now we can also connect to the parachain collator. Open another instance of Apps in a new browser window, and connect it to the appropriate endpoint. If you have followed thes instructions so far, you can connect to Alice's node at https://polkadot.js.org/apps/#/?rpc=ws://localhost:9977

## Adding Custom Types

The Collator has introduced some custom data types that the front end does not know about. In order to properly encode transactions, we must tell the front end about these types. Enter the following json in the `Settings` -> `Developer` tab.

```json
{
  "Address": "AccountId",
  "LookupSource": "AccountId",
}
```

## Submit Transactions

If you're using a parachain that has the balances pallet (like the test parachain for example), you can make some simple token transfers to ensure that the parachain is operating normally. You can also make some onchain remarks by submitting `Extrinsics` -> `System` -> `remark`.
