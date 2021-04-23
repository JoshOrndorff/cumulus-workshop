# Register a Rococo Parachain

Rococo is Parity's official test network for Cumulus-based parachains. The purpose of this document
is to guide Cumulus parachain developers through the steps needed to register their parachain with
the Rococo test network. This page is an _addendum_ to the main workshop. Before you attempt to
register your parachain on a public testnet like Rococo, we expect that you have done the proper local testing.
[#Rococo Element chat room](https://app.element.io/#/room/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.org)

## Request ROC Tokens

The symbol for the Rococo test network's native currency is ROC. You will need some ROC in order to
register your Rococo parachain. There is a deposit required to register a parachain (currently 1,000
ROC) and you will also need some additional ROC in order pay transaction fees. Please use our
[#Rococo Element chat room](https://app.element.io/#/room/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.org)
to request ROC tokens.

## Launch Rococo Validators

In order to register a parachain with the Rococo test network, we require you to support the central
Rococo relay chain by running at least one Rococo validator nodes.

### Building the Validator Node

For the live testnet, you should build the tip of the `rococo-v1` branch in the [Polkadot repository](https://github.com/paritytech/polkadot).
Compile it with the `real-overseer` feature.
```shell
cargo build --release --features=real-overseer
```

### Launching the Validators

To launch each Rococo validator node, run the following command:

```shell
polkadot --chain rococo --validator --name <your-node-name>
```

You will need to generate session keys for each of your Rococo validator nodes. To generate keys for
a node, use the `author.rotateKeys` RPC call. One way to invoke this RPC method is by using `curl`:

```shell
curl http://<validator address>:<HTTP port>\
  -H "Content-Type:application/json;charset=utf-8"\
  -d '{ "jsonrpc":"2.0", "id":1, "method":"author_rotateKeys" }'
```

You can also use the [Polkadot JS Apps UI RPC app](https://polkadot.js.org/apps/#/rpc) to invoke the
RPC method, just make sure you are connected to the correct node.

You need to provide the **ValidatorId** when you submit your request for parachain registration.
In order to generate a ValidatorId, you must call the `SetKeys` extrinsic from the **session** pallet.
In the **keys** field you will provide the keys generated in the previous step.
The **proof** field will be ignored so you can write any text you want.

![session_keys](../../assets/img/session-keys.png)

The **AccountId** (address) that you used to make this call is going to become your **ValidatorId**.

## Request Parachain Registration

In the workshop we used the Sudo wrapper pallet on a development
relay chain to register a parachain. The actual Rococo relay chain uses
[the Propose Parachain pallet](https://github.com/paritytech/polkadot/blob/rococo-v1/runtime/rococo/src/propose_parachain.rs)Use the
[Polkadot JS Apps UI Extrinsics app](https://polkadot.js.org/apps/#/extrinsics?rpc=wss://rococo-rpc.polkadot.io)
to call the `proposeParachain.proposeParachain` dispatchable on the Rococo relay chain and provide
the following parameters:

- `para_id`: the ID of your parachain
- `name`: a hex-encoded name for your parachain
- `validation_function`: the Wasm runtime for your parachain
- `initial_head_state`: your parachain's genesis state
- `validators`: one validator from the previous step
- `balance`: the constant value `1000`

Let us know when you have submitted this request (use the Element chat room), and we will do our
best to get back to you within a day or two.
