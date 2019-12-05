# Preparing a Collator Node
This workshop's focus is on registering parachains, and confirming that their blocks are tracked by the relay chain, more than it is about actually using the parachains. Nonetheless, we have provided three parachains with unique functionality. Choose a parachainchain that you would like to collate for, and build the corresponding collator.

## About the Chains

### Parachain Zero - A Token Chain
Parachain zero acts as a basic cryptocurrency using Substrate's Balances pallet.

### Parachain One - A Proof of Existence Chain
Parachain one includes a runtime module that provides decentralized timestamping. The Substrate Developer Hub hosts a tutorial on [writing the Proof of Existence Module](https://substrate.dev/docs/en/next/tutorials/creating-your-first-substrate-chain/).

### Parachain Two - A Collator Template
Parachain two includes the same template pallet that exists in the [Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template). In addition to using it as one of our parachains, it also serves as a starting point for writing custom Parachains.

## Building the Collator
After you've chosen which collator(s) to build, clone the Cumulus repository. We will be using the `joshy-workshop` branch for this workshop.
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
