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

The symbol for the Rococo test network's native currency is ROC; you will need some ROC in order to register your Rococo
parachain. Please use
[our #Rococo Element chat room](https://app.element.io/#/room/!WuksvCDImqYSxvNmua:matrix.parity.io?via=matrix.org) to
request ROC tokens.

## Launch Rococo Validators

In order to register a parachain with the Rococo test network, it is necessary to support the central Rococo relay chain
by running two Rococo validator nodes. Refer to the first chapter to learn how to
[build a Rococo validator node](../1-prep/1-compiling.md#building-a-relay-chain-node) and the second chapter to learn
how to [launch the node you just built](../2-relay-chain/2-launch.md). Once you have launched your nodes, you will need
to rotate your session keys and make note of the new keys.

## Request Parachain Registration

Use
[the Propose Parachain pallet](https://github.com/paritytech/polkadot/blob/rococo-branch/runtime/rococo/src/propose_parachain.rs)
to request parachain registration and wait for us to approve it.
