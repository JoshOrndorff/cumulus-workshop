# Register a Rococo Parachain

Rococo is Parity's official test network for Cumulus-based parachains. The purpose of this document is to guide Cumulus
parachain developers through the steps needed to register their parachain with the Rococo test network.

## Write Your Parachain

Follow the steps in the previous chapter to develop your parachain. In particular, refer to the
[Parachain Template Overview](../5-develop/1-template-overview.md) and
[Template Pallet](../5-develop/3-template-pallet.md) sections.

## Test Your Parachain

Follow the steps in the previous section to test your parachain. In particular, refer to the
[Sending Messages](../5-develop/4-sending-messages.md) and [Receiving Messages](../5-develop/5-receiving-messages.md)
sections.

## Request ROC Tokens

The symbol for the Rococo test network's native currency is ROC. You will need some ROC in order to register your Rococo
parachain. There is a deposit required to register a parachain (currently 1,000 ROC) and you will also need some
additional ROC in order pay transaction fees. Please use our
[#Rococo Element chat room](https://app.element.io/#/room/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.org) to
request ROC tokens.

## Launch Rococo Validators

In order to register a parachain with the Rococo test network, we require you to support the central Rococo relay chain
by running at least two Rococo validator nodes. Refer to the first chapter to learn how to
[build a Rococo validator node](../1-prep/1-compiling.md#building-a-relay-chain-node). To launch your Rococo validator
nodes, run the following command:

```shell
./target/release/polkadot --chain rococo --validator
```

You will need to generate session keys for each of your Rococo validator nodes. To generate keys for a node, use the
`author.rotateKeys` RPC call. One way to invoke this RPC method is by using `curl`:

```shell
curl http://<validator address>:<WebSocket port>\
  -H "Content-Type:application/json;charset=utf-8"\
  -d '{ "jsonrpc":"2.0", "id":1, "method":"author_rotateKeys" }'
```

You can also use the [Polkadot JS Apps UI RPC app](https://polkadot.js.org/apps/#/rpc) to invoke the RPC method, just
make sure you are connected to the correct node. Regardless of how you generate these keys, take note of them and treat
them with care - you need to provide them when you submit your request for parachain registration.

## Request Parachain Registration

In [Chapter 3, Section 2](../3-parachains/2-register.md) we used the Sudo pallet on a development relay chain to
register a parachain. The actual Rococo relay chain uses
[the Propose Parachain pallet](https://github.com/paritytech/polkadot/blob/rococo-branch/runtime/rococo/src/propose_parachain.rs)
to allow parachain developers to request parachain registration. Use the
[Polkadot JS Apps UI Extrinsics app](https://polkadot.js.org/apps/#/extrinsics) to call the
`proposeParachain.proposeParachain` dispatchable and provide the following parameters:

- `para_id`: the ID of your parachain
- `name`: a hex-encoded name for your parachain
- `validation_function`: the Wasm runtime for your parachain
- `initial_head_state`: your parachain's genesis state
- `validators`: two validators from the previous step
- `balance`: the constant value `1000`

Let us know when you have submitted this request (use the Element chat room), and we will do our best to get back to you
within a day or two.
