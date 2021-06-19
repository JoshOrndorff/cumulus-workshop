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

- **Polkadot @ [`aa386760`](https://github.com/paritytech/polkadot/commit/aa386760948574af4078c59decf558d16efe15e2)**
- **Parachain Template @ [`9c65875f`](https://github.com/substrate-developer-hub/substrate-parachain-template/commit/9c65875fd7f59754c65c87662df0083cf56addf1)**
- **Polkadot JS Apps @ [`e9876dd5`](https://github.com/polkadot-js/apps/commit/e9876dd592c11590b08e0fbaba00de148555395f)**
    - _It is generally expected that the [hosted Polkadot JS Apps](https://polkadot.js.org/apps/#/explorer)
      _should_ work. If you have issues, build and host this UI yourself, at this commit.

> NOTE: you **must** use these commits exactly to ensure that you do not run into conflicts as parachain development
> development is actively making breaking changes between commits on these repositories!

#### Polkadot Testnet Compatibility

We on the devhub team do our best to keep the parachain template & this workshop updated presently
with the latest release of Polkadot. **But do not assume this is the case!**
Check with us in the [Rococo matrix channel](https://matrix.to/#/#rococo:matrix.parity.io) when
breaking changes and testnet resets occur.

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