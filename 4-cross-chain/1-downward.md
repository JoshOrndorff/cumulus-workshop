# Downward Transfers

Polkadot's XCMP (cross chain message passing) will allow transfer of arbitrary assets between different blockchains. The [XCMP spec](https://github.com/paritytech/xcm-format) is still being developed, and may change significantly, but it is already stable enough for some demonstrations.

## Depository and Mint Model

When sending DOTs from the relay chain to a parachain, we use a depository and mint model. The DOTs leave the senders account on the Relay chain and are transferred into a parachain-specific account on the relay chain. When the parachain receives a message that this transfer has happened, it mints a corresponding amount of tokens in the specified account on the parachain.

## Sending Tokens Down

To send tokens from Alice's account on the Relay chain to her own account on parachain 200, you submit a single transaction on the Relay chain. Return the the Apps instance that is connected to the relay chain and submit `Extrinsics` -> `Parachains` -> `transferToParachain` with the following parameters. (We continue using parachain 200 as the example.)

to: 200
amount: 123
remark: 0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d

The first two fields are self-explanatory, and the amount can be customized as desired. The third field, although called `remark`, is used to indicate the receiving account on the Parachain. In general we cannot assume that the parachain uses the same account model as the relay chain, and thus this field must remain an opaque vector of bytes. However in this specific case, we know that the parachain uses the exact same account model as the relay chain. So we can enter Alice's public key. (When using Apps UI like we are, you can also enter Alice's regular old Address `5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY` and the UI will convert it to a public key for you.)

## Confirming Receipt of DOTs

Once the transaction has processed on the Relay Chain, you should see the tokens show up in the corresponding account on the Parachain. In the Apps instance that is connected to the Parachain, inspect Alice's account balance and confirm that the tokens have arrived.

## Play More

This single transaction has demonstrated the fundamentals of sending tokens to parachains. But there is much more to learn by playing around. Try sending tokens from Bob's relay chain account to Charlie's parachain account. Try sending tokens to a different parachain.
