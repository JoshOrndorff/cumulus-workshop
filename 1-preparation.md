# Preparation

You can participate in this workshop in any (or all) of three roles. You will need to complete the shared steps and the steps listed under each role that you intend to play.

The roles are:

* **Relay Chain Validator** -- Stake tokens to create and finalize relay chain blocks. Validate parachain blocks for the parachain you are assigned to.
* **Parachain Collators** -- Author blocks on a fundamental parachain.
* **Custom Parachain Authors** -- Install Cumulus on your already-written runtime. If you want to actually run your own chain, you should be prepared to collate it, or recruit peers to collate it for you.

## Shared Preparation Steps
Install substrate prerequisites
* TODO Insert instructions here
* TODO Support Windows?

Pre-read the relevant sections of this write-up.

Observe the notes page at the end. We'll use it to coordinate throughout the workshop.

## Preparing to Validate
Clone the Polkadot source code. We will be using a specific branch for this workshop.
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
Clone cumulus project
Build one (or a few)) of the parachains we have provided
start a dev chain (is that a thing?) to ensure it runs correctly

## Preparing a Custom Parachain
TODO
