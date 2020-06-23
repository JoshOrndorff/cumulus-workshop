# Launching a Parachain

We'll begin by deploying the test parachain with parachain id 100. These instructions are written specifically for parachain ID 100, however you can re-use these instructions with any parachain ID adjusting occurrences of the number 100 accordingly.

## Generate Genesis State

To register a parachain, the relay chain needs to know the parachain's genesis state. The collator node can export that state to a file for us. The following command will create a file containing the parachain's entire genesis state, hex-encoded.

```bash
test-collator export-genesis-state para-100-genesis
```

> Creating this file is fast and easy, so this file is not included in the repository

## Obtaining the Wasm Validation Function

The relay chain also needs the parachain-specific validation logic to validate parachain blocks. This validation logic was created and included with the Wasm runtime when you compiled the collator. You can find it at `target/release/wbuild/cumulus-test-parachain-collator/cumulus-test-parachain-collator.compact.wasm`.

In case you chose to use a pre-built collator (eg a docker container) this validation blob is also included with this repository at `assets/cumulus-test-parachain-collator.compact.wasm`.

## Start the Collator Node
We can now start the collator node with the following command. Notice that we're supplying the same relay chain spec we used when launching relay chain nodes.

```bash
test-collator \
  --base-path collator-100 \
  --ws-port 9977 \
  --port 30336 \
  --parachain-id 100 \
  -- \
  --chain spec.json \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
  --bootnodes <Other Relay Chain Node(s)
```

The first thing to notice about this command is that several arguments are passed before the lone `--`, and several more agruments are passed after it. A cumulus collator contains the actually collator node, and also an embedded relay chain node. The arguments before the `--` are for the collator, and the arguments after the `--` are for the embedded relay chain node.

We give the collator a base path and ports as we did for the relay chain node previously. We also specify the parachain ID. Remember to change these collator-specific values if you are executing these instructions a second time for a second parachain. Then we give the embedded relay chain node the relay chain spec we are using. Finally, we give the embedded relay chain node some peer addresses.

## Is It Working?

At this point you should see your collator node running and peering with the relay-chain nodes. You should _not_ see it authoring parachain blocks yet. Authoring will begin when the collator is actually registered on the relay chain (the next step).

At this point your collator's logs should look something like this:
```
2020-06-23 07:21:48 Cumulus Test Parachain Collator
2020-06-23 07:21:48 ✌️  version 0.1.0-05a83e8-x86_64-linux-gnu
2020-06-23 07:21:48 ❤️  by Parity Technologies <admin@parity.io>, 2017-2020
2020-06-23 07:21:48 📋 Chain specification: Local Testnet
2020-06-23 07:21:48 🏷  Node name: sad-sheet-9926
2020-06-23 07:21:48 👤 Role: FULL
2020-06-23 07:21:48 💾 Database: RocksDb at /tmp/collator-100/chains/local_testnet/db
2020-06-23 07:21:48 ⛓  Native runtime: wasm-test-parachain-4 (wasm-test-parachain-4.tx1.au3)
2020-06-23 07:21:50 Parachain id: Id(100)
2020-06-23 07:21:50 Parachain Account: 5Ec4AhP7HwJNrY2CxEcFSy1BuqAY3qxvCQCfoois983TTxDA
2020-06-23 07:21:50 Parachain genesis state: 0x0000000000000000000000000000000000000000000000000000000000000000008959d19fd6f3c67c6e83c0db48a52f0a08bcd9e1cc216a171b75e75a045444bd03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c11131400
2020-06-23 07:21:50 🔨 Initializing Genesis block/state (state: 0x8959…44bd, header-hash: 0x74be…fddf)
2020-06-23 07:21:50 📦 Highest known block at #0
2020-06-23 07:21:50 Using default protocol ID "sup" because none is configured in the chain specs
2020-06-23 07:21:50 🏷  Local node identity is: 12D3KooWBJBdWL7JesD7F1ytwuyi4csbuG4NvRDBD83f32W3vsid (legacy representation: QmbmsEtwLJenQgQ3detY4ThTy9f5tY4U8KERdkRDYrbgpc)
2020-06-23 07:21:51 🔍 Discovered new external address for our node: /ip4/10.52.0.7/tcp/30336/p2p/12D3KooWBJBdWL7JesD7F1ytwuyi4csbuG4NvRDBD83f32W3vsid
2020-06-23 07:21:51 🔨 Initializing Genesis block/state (state: 0xcd74…9bd3, header-hash: 0x4ed0…5c89)
2020-06-23 07:21:51 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2020-06-23 07:21:52 ⏱  Loaded block-time = BabeGenesisConfiguration { slot_duration: 6000, epoch_length: 600, c: (1, 4), genesis_authorities: [(Public(8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48 (5FHneW46...)), 1), (Public(90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22 (5FLSigC9...)), 1), (Public(d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d (5GrwvaEF...)), 1)], randomness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], allowed_slots: AllowedSlots::PrimaryAndSecondaryPlainSlots } milliseconds from genesis on first-launch
2020-06-23 07:21:52 👶 Creating empty BABE epoch changes on what appears to be first startup.
2020-06-23 07:21:52 📦 Highest known block at #0
2020-06-23 07:21:52 🏷  Local node identity is: 12D3KooWLEFP2ZWAs9hZZtkyKox88LdRxFuoZmkLxNhLAMVWQt6i (legacy representation: QmbtLknBn5ejU47RoQfCkaTzQUusWLVgpnbMvfUyRBULSh)
2020-06-23 07:21:52 〽 Prometheus server started at 127.0.0.1:9616
2020-06-23 07:21:52 📪 Libp2p listener () closed: Address already in use (os error 98)
2020-06-23 07:21:52 📪 Libp2p listener () closed: Address already in use (os error 98)
2020-06-23 07:21:52 Received message on non-registered protocol: [70, 82, 78, 75]
2020-06-23 07:21:55 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 2.2kiB/s ⬆ 2.1kiB/s
2020-06-23 07:21:57 💤 [Relaychain] Idle (2 peers), best: #2 (0x5273…d217), finalized #0 (0x4ed0…5c89), ⬇ 2.8kiB/s ⬆ 2.3kiB/s
2020-06-23 07:22:00 ✨ [Relaychain] Imported #3 (0xcc7f…d2a5)
2020-06-23 07:22:00 Starting parachain attestation session on top of parent 0xcc7fe1df367b434bd0258bda7effb6622848e08b31e0c4ae5bf714f7334bd2a5. Local parachain duty is None
2020-06-23 07:22:00 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 48 B/s ⬆ 45 B/s
2020-06-23 07:22:02 💤 [Relaychain] Idle (2 peers), best: #3 (0xcc7f…d2a5), finalized #0 (0x4ed0…5c89), ⬇ 0.3kiB/s ⬆ 0.3kiB/s
2020-06-23 07:22:05 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 0 ⬆ 0
2020-06-23 07:22:06 ✨ [Relaychain] Imported #4 (0xe04d…eb43)
2020-06-23 07:22:06 Starting parachain attestation session on top of parent 0xe04d5b5b0ad077bfe6a56731ba4154262241d0ee488fc4e4390019aac809eb43. Local parachain duty is None
2020-06-23 07:22:07 💤 [Relaychain] Idle (2 peers), best: #4 (0xe04d…eb43), finalized #0 (0x4ed0…5c89), ⬇ 0.3kiB/s ⬆ 0.2kiB/s
2020-06-23 07:22:10 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 0.3kiB/s ⬆ 0.3kiB/s
2020-06-23 07:22:12 ✨ [Relaychain] Imported #5 (0xa697…fbc4)
2020-06-23 07:22:12 Starting parachain attestation session on top of parent 0xa697b82fae4fd75c65845af6191a39f211f2cc7512d7b8b3419a557f8f9efbc4. Local parachain duty is None
2020-06-23 07:22:12 💤 [Relaychain] Idle (2 peers), best: #5 (0xa697…fbc4), finalized #0 (0x4ed0…5c89), ⬇ 0.3kiB/s ⬆ 0.3kiB/s
2020-06-23 07:22:15 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 0 ⬆ 0
2020-06-23 07:22:17 💤 [Relaychain] Idle (2 peers), best: #5 (0xa697…fbc4), finalized #0 (0x4ed0…5c89), ⬇ 0.2kiB/s ⬆ 0.2kiB/s
2020-06-23 07:22:18 ✨ [Relaychain] Imported #6 (0xe175…92c8)
2020-06-23 07:22:18 Starting parachain attestation session on top of parent 0xe17562fff84d32fde412a227a2b0465ebed4c094ba5eebd87b7dd79df67892c8. Local parachain duty is None
2020-06-23 07:22:20 💤 [Parachain] Idle (0 peers), best: #0 (0x74be…fddf), finalized #0 (0x74be…fddf), ⬇ 0 ⬆ 0
2020-06-23 07:22:22 💤 [Relaychain] Idle (2 peers), best: #6 (0xe175…92c8), finalized #0 (0x4ed0…5c89), ⬇ 0.3kiB/s ⬆ 0.3kiB/s
2020-06-23 07:22:24 ✨ [Relaychain] Imported #7 (0xbd7a…03cd)
```
