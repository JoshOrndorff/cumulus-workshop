# Substrate Cumulus Workshop

Connect Substrate blockchains to Polkadot with Cumulus

In this hands-on workshop, participants will start a Polkadot-like relay chain, register parachains, make cross-chain
asset transfers, and convert their own Substrate runtimes to parachains using Cumulus.

## Versions

This workshop has been tested on commits:

- Polkadot @ [`943038a`](https://github.com/paritytech/polkadot/commit/943038a888bfaf736142642e2610b248f7af486c)
- Parachain Template @ [`???`]()
    - FIXME!! needs companion PR! 
- Polkadot JS Apps @ [`e2b51e6 `](https://github.com/polkadot-js/apps/commit/e2b51e6033f0a0c25fffc037be18d1326e1e8f39)

> NOTE: you **must** use these commits exactly to ensure that you do not run into conflicts as parachain development
> development is actively making breaking changes between commits on these repos!

#### Rococo Compatibility

We on the devhub team do our best to keep the parachain template & this workshop updated presently
with the HEAD of the [rococo-v1](https://github.com/paritytech/polkadot/commits/rococo-v1) branch
of Polkadot. **But do not assume this is the case!** Check the latest commit for rococo that is
reported in the [rococo matrix channel](https://matrix.to/#/#rococo:matrix.parity.io) when breaking
changes and test-network resets occur.

## Learn More

Read about [The Path of a Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) on the official
Polkadot Blog.

## Acknowledgement & Contribution

Refer to [Acknowledgement & Contribution](acknowledgement-contribution.md)

## License

[MIT](LICENCE)

## Disclaimer

**Cumulus is pre-release software that is still under development.** While this workshop strives to be useful, the material
it covers may change or break before Cumulus is fully released. Nothing presented here is ready for use in value-bearing
blockchains!