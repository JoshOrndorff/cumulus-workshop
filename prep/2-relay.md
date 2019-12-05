# Preparing a Relay Chain Node
Clone the Polkadot repository. We will be using the `bkchr-cumulus-branch` for this workshop.

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
