# Bring Your Own Runtime

Many Substrate developers have runtimes already written and in use as stand-alone blockchains. These runtimes can be adapted to work with Cumulus.

Overview:

* Clone the [Collator template](https://github.com/paritytech/cumulus/tree/joshy-workshop/collator-template)
* Change the runtime dependency in Cargo.toml to your own runtime
```diff
- parachain-runtime = { package = "parachain-two-runtime", path = "runtime" }
+ parachain-runtime = { package = "my-runtime", git = <my-repo> }
```
* Copy genesis configuration to collator template (or put it in it's own module)
* Change the hard-coded parachain id in `src/main.rs`.

The one big catch is getting the versions to match. To make this work with the current cumulus your runtime will have to build against the `bkchr-cumulus-branch` of Substrate.

## Local Testnet

When developing and testing a cumulus based node, one can reproduce a minimal version of the network we built in this workshop. Instructions are in the [cumulus readme](https://github.com/paritytech/cumulus/#cumulus).
