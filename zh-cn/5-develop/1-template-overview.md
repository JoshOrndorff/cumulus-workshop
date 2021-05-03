# Parachain Collator Template

Substrate developers who are familiar with the
[Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template) will
find the parachain template familiar. They have the same general structure featuring `node`,
`runtime`, and `pallets` directories. Their runtimes are similar and feature many of the same
pallets. And apart from a few new traits, the pallets themselves are essentially identical. Many of
the [Substrate devhub tutorials](https://substrate.dev/tutorials/) can be used with few
modifications on the parachain template.

The similarities between these two templates should give you confidence, that if you've built a
Substrate chain, you will have no problem building a parachain!

## Differences from the Node Template

There are, however, a few important difference between the two templates that are worth observing at
the outset.

### Parachain Info Pallet

This pallet is designed to inject information about the parachain's registration into its own
runtime. Currently it just injects the parachain id that the chain is registered at. This allows the
runtime to know which cross-chain messages are intended for it.

### Message Broker Pallet

This pallet is responsible for distributing cross-chain messages received over the network to the
pallets that they are intended for. If you intend to receive cross chain messages, you should use
this pallet.

### Token Dealer Pallet

This pallet serves as an example of both sending and receiving crosschain messages. It is the pallet
that implements the [cross-chain token transfers](../4-cross-chain/1-downward.md) we saw earlier. If
you want to accept DOTs or other assets from foreign chains, you should either use this pallet or
use its code as inspiration.

### `register_validate_block!` Macro

Each parachain must supply a `validate_block` function, expressed as a Wasm blob, to the relay chain
when registering. The node template does not provide this function, but the parachain template does.
Thanks to cumulus, creating this function for a Substrate runtime is as simple as adding one line of
code at the bottom of your runtime:

```rust
cumulus_runtime::register_validate_block!(Block, Executive);
```

### No Aura Pallet

Many popular Substrate runtimes, such as Polkadot, include consensus-related pallets and
runtime-apis. The node template features the Aura pallet and its associated runtime `AuraApi`. These
are both missing from the parachain template.

This is because the collator authors blocks at a regular interval, rather than using a more
sophisticated consensus engine such as Aura, Babe, or PoW. It the future this authoring behavior
will likely be configurable and these parts of the runtime may be reintroduced. Follow progress on
this at:

- https://github.com/paritytech/cumulus/issues/166
- https://github.com/paritytech/cumulus/issues/36
- https://github.com/paritytech/cumulus/issues/115
- https://github.com/paritytech/cumulus/issues/116

### No GRANDPA Pallet

Many popular Substrate runtimes including the node template feature a finality-related GRANDPA
pallet and its associated `GrandpaApi`. These are both missing from the parachain template.

This is because parachains follow the finality of the relay chain rather than running their own
finality gadget. This is fundamental to Polkadot's architecture and will not change.

### Service

The collator's service is entirely different from the node template's. While you can find
similarities, the structure of the service is much different. This new service is the primary change
that cumulus provides.

> When modifying an existing Substrate chain to use Cumulus, it is generally best to copy the
> service code from the template.

## Using the Template

The instructions in the following sections walk through a few basic exercises using the parachain
template. They may be followed in any order and do not build on one another. For a more thorough
primer on Substrate development, explore the [Substrate Developer Hub](https://substrate.dev).

These instructions assume that you have already
[compiled the parachain template](../1-prep/1-compiling.md) on your local system. If you haven't,
please go back and do that.

If you're a github user, begin by
[forking the parachain template](https://github.com/substrate-developer-hub/substrate-pallet-template),
and work in your fork.
