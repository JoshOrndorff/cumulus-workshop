# Preparation

You can participate in this workshop in any (or all) of three roles. You will need to complete the shared steps and the steps listed under each role that you intend to play.

The roles are:

* **Relay Chain Validator** -- Stake tokens to create and finalize relay chain blocks. Validate parachain blocks for the parachain you are assigned to.
* **Parachain Collators** -- Author blocks on a fundamental parachain.
* **Custom Parachain Authors** -- Install Cumulus on your already-written runtime. If you want to actually run your own chain, you should be prepared to collate it, or recruit peers to collate it for you.

## Shared Preparation Steps
Install Substrate prerequisites

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

Manual [instructions for Windows](https://substrate.dev/docs/en/getting-started/installing-substrate#windows) are also available. Although Windows is a supported platform for Substrate and Polkadot, it will only be supported on a best-effort basis for this workshop.

Pre-read the relevant sections of this write-up.

Notice the final [notes page](5-notes.md) on this walkthrough. We will use it to coordinate throughout the workshop.

## Preparing to Validate
Clone the Polkadot repository. We will be using a specific branch for this workshop.
TODO should we choose a specific commit before sub0?
```bash
git clone -b bkchr-cumulus-branch https://github.com/paritytech/polkadot.git
cd polkadot
```

Build the Relay Chain Node
```bash
cargo build --release
```

Start a development chain to ensure that the node runs as expected.
```bash
./target/release/polkadot --dev
```

If you see output like the following, everything is working as expected.
```
$ ./target/release/polkadot --dev
Running in --dev mode, RPC CORS has been disabled.
Parity Polkadot
  version 0.6.0-x86_64-linux-gnu
  by Parity Team <admin@parity.io>, 2017-2019
Chain specification: Development
Node name: uppity-sneeze-9793
Roles: AUTHORITY
Initializing Genesis block/state (state: 0xb522…0bd2, header-hash: 0xc8eb…eacd)
Loading GRANDPA authority set from genesis on what appears to be first startup.
Loaded block-time = BabeConfiguration { slot_duration: 6000, epoch_length: 2400, c: (1, 4), genesis_authorities: [(Public(d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d (5GrwvaEF...)), 1)], randomness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], secondary_slots: true } seconds from genesis on first-launch
Creating empty BABE epoch changes on what appears to be first startup.
Highest known block at #0
Local node identity is: QmQtTqR5BZy4gLPbxAsLALfSBEiaru2dEAYrEUZfV92iMn
Starting BABE Authorship worker
```


## Preparing to Collate
Clone Cumulus repository. As with Polkadot, we will be using a custom branch for this workshop.
```bash
git clone -b joshy-workshop https://github.com/paritytech/cumulus.git
```

Build one (or a few) of the parachains we have provided. There are three parachains you can choose from. For each parachain you want to collate on, build the binary.

```bash
cargo build --release -p parachain-zero-collator
cargo build --release -p parachain-one-collator
cargo build --release -p parachain-two-collator
```

Then run a development chain to ensure the collator runs as expected.
```bash
# Replace zero with one or two as necessary
./target/release/parachain-zero-collator --dev
```

If you see output like this, all worked as expected
```
2019-12-02 21:38:50 Running in --dev mode, RPC CORS has been disabled.
2019-12-02 21:38:50 Cumulus Test Parachain Collator
2019-12-02 21:38:50   version 0.1.0-x86_64-linux-gnu
2019-12-02 21:38:50   by Parity Technologies <admin@parity.io>, 2019
2019-12-02 21:38:50 Chain specification: Local Testnet
2019-12-02 21:38:50 Node name: sincere-brother-1867
2019-12-02 21:38:50 Roles: AUTHORITY
2019-12-02 21:38:50 Parachain id: Id(0)
2019-12-02 21:38:50 Initializing Genesis block/state (state: 0x206a…7c3a, header-hash: 0xaee8…7f1a)
2019-12-02 21:38:50 Highest known block at #0
2019-12-02 21:38:50 Using default protocol ID "sup" because none is configured in the chain specs
2019-12-02 21:38:50 Local node identity is: QmRpDNN7c2eDc7nTraNS7L7AtzyaGdfHYoB1emZb5WF4xi
2019-12-02 21:38:50 Not registering Substrate logger, as there is already a global logger registered!
2019-12-02 21:38:50 Running in --dev mode, RPC CORS has been disabled.
2019-12-02 21:38:50 Cumulus Test Parachain Collator
2019-12-02 21:38:50   version 0.1.0-x86_64-linux-gnu
2019-12-02 21:38:50   by Parity Technologies <admin@parity.io>, 2017-2019
2019-12-02 21:38:50 Chain specification: Development
2019-12-02 21:38:50 Node name: actually-mine-4188
2019-12-02 21:38:50 Roles: AUTHORITY
2019-12-02 21:38:51 Initializing Genesis block/state (state: 0xd4c5…2106, header-hash: 0x4b54…1ee0)
2019-12-02 21:38:51 Loading GRANDPA authority set from genesis on what appears to be first startup.
2019-12-02 21:38:51 Loaded block-time = BabeConfiguration { slot_duration: 6000, epoch_length: 2400, c: (1, 4), genesis_authorities: [(Public(d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d (5GrwvaEF...)), 1)], randomness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], secondary_slots: true } seconds from genesis on first-launch
2019-12-02 21:38:51 Creating empty BABE epoch changes on what appears to be first startup.
2019-12-02 21:38:51 Highest known block at #0
2019-12-02 21:38:51 Local node identity is: QmP6ZVZTJDMDxLRDPC9wQzBkdVHe2CxoCzhSCtSfsPeWzA
```

## Preparing a Custom Parachain
TODO
