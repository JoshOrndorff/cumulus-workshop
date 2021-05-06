# Substrate Cumulus Workshop

Connect Substrate blockchains to Polkadot with Cumulus

In this hands-on workshop, participants will start a Polkadot-like relay chainn, register
parachains, make cross-chain asset transfers, and convert their own Substrate runtimes to
parachains using Cumulus.

## Prerequisites

Before you start you need to do a **substrate comprehension check** and ensure your hardware
can build and run this (rather resource intensive) set of software.


### Substrate Requirements 

If you are here _without_ any former substrate experience, you are likely to not understand or
complete this tutorial. Before you continue please complete the following tutorials:

- [Create Your First Substrate Chain](https://substrate.dev/docs/en/tutorials/create-your-first-substrate-chain/)
- [Start a Private Network](https://substrate.dev/docs/en/tutorials/start-a-private-network/)

We will reference these assuming you have already understand all the steps involved in these,
and have your machine configured for substrate based code base compilation.

### Hardware Requirements

Any machine may_ handle building a parachain template, but it is a _very_ resource intensive process!
We suggest running these builds on a machine with **no less than**:
- 16 GB of RAM (32 is suggested)
- 4 CPU cores (8 is suggested)
- 50 GB of free HDD/SSD space

Without the minimal RAM here, you are likely to **run out of memory resulting in a `SIGKILL` error!**
This generally happens on the `polkadot-service` build - so be sure to *monitor your RAM usage*
(with something like [htop](https://htop.dev/)) and lookout for swap starting to be used.

If you cannot use a machine with the minimums here,you can try a few things that trade longer build 
times for limited RAM usage.
- Use Less threads cargo's `j` flag == the number of threads to use to build.
  Try to use just a few less than you have available total and monitor RAM usage.
- Cargo's [codegen units](](https://doc.rust-lang.org/cargo/reference/profiles.html#codegen-units)) 
  feature makes more optimized builds, and uses less ram, but _much_ longer compile times!

```bash
# use less codegen units
RUSTFLAGS="-C codegen-units=1" cargo build --release 
# set the number of cores/threads to compile (used to build cumulus/polkadot on rpi 3)
cargo build --release -j 1
```

Try one, or both of these methods together, to trade time for limited RAM machines. 

> Eventually `polkadot-service` will be less monolithic, but this is presently a low priority.
> It builds a node for _every network_ in the polkadot repo.

## Versions of Software

At the moment, parachains are _very tightly coupled_ with the relay chainn's codebase they are 
connecting to. If you want to connect your parachian to a running relay network like the 
[rococo](https://wiki.polkadot.network/docs/en/build-parachains-rococo) test network, you _must_
be sure that you are testing against the exact same build of that relay chainn. 

This workshop has been tested on commits:

- **Polkadot @ [`127eb17a`](https://github.com/paritytech/polkadot/commit/127eb17a25bbe2a9f2731ff11a65d7f8170f2373)**
- **Parachain Template @ [`1e1e725`](https://github.com/substrate-developer-hub/substrate-parachain-template/commit/1e1e7257e4429e8413f5a27940d4941d220317a7)**
- **Polkadot JS Apps @ [`35b238a `](https://github.com/polkadot-js/apps/commit/35b238a1bfb59a4c4e7488671a7261b54bf314c9)**
    - _It is generally expected that the [hosted Polkadot JS Apps](https://polkadot.js.org/apps/#/explorer)
      _should work. If you have issues, build and host this yourself at this commit._

> NOTE: you **must** use these commits exactly to ensure that you do not run into conflicts as parachain development
> development is actively making breaking changes between commits on these repositories!

#### [Rococo](https://wiki.polkadot.network/docs/en/build-parachains-rococo) Compatibility

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