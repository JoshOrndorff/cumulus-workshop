# Launching a Parachain

We'll begin by deploying a parachain template with parachain id `200`. These instructions are written
specifically for parachain id 200, however you can re-use these instructions with any parachain id
by adjusting occurrences of the number 200 accordingly.

Note that the `parachain-collator` command used below comes from the [substrate-parachain-template repo](https://github.com/substrate-developer-hub/substrate-parachain-template/)
that we set up in the [Preparation/Compiling step]((../README#versions-of-software) at a _specific_ commit.

## Generate Parachain Genesis State

To register a parachain, the relay chain needs to know the parachain's genesis state. The collator
node can export that state to a file for us. The following command will create a file containing the
parachain's entire genesis state, hex-encoded.

```bash
parachain-collator export-genesis-state --parachain-id 200 > para-200-genesis
```

## Obtain Wasm Runtime Validation Function

The relay chain also needs the parachain-specific runtime validation logic to validate 
parachain blocks. The collator node also has a command to produce this Wasm blob:

```bash
parachain-collator export-genesis-wasm > para-200-wasm
```

> The Wasm blob does not depend on the parachain id, so we do not provide that flag. If you are
> launching multiple parachains using the exact same runtime, you do not need to regenerate the Wasm
> blob each time (although it is fast and harmless to do so).

> This is for the _genesis_ only - you cannot, at this time, connect a parachian with any previous 
> state to a relay chain. All parachains _must_ start from block 0 on the relay chain.
> There is _no_ "hot swap" consensus or re-genesis possible at the moment either.

## Start the Collator Node

We can now start the collator node with the following command. Notice that we need to supply the same
relay chain spec we used when launching relay chain nodes.

```bash
parachain-collator \
  --collator \
  --tmp \
  --parachain-id 200 \
  --port 40333 \
  --ws-port 9844 \
  --alice \
  -- \ # Above are flags for the parachain _collator_, below for the embedded relay chain _validator_
  --execution wasm \
  --chain <relay chain spec json> \
  --port 30343 \
  --ws-port 9977
```

The first thing to notice about this command is that several arguments are passed before the lone
`--`, and several more arguments are passed after it. A cumulus collator contains the actual
collator node, and also an **embedded relay chain node**. The arguments before the `--` are for the
collator, and the arguments after the `--` are for the embedded relay chain node.

We give the collator a base path and ports as we did for the relay chain node previously. We also
specify the parachain id.

> Remember to change the collator-specific values if you are executing
> these instructions a second time for a second parachain.
> You will use the same relay chain chain spec, but need different ports exposed.

> A Parachain node = (full) collator + (full) vallidator node.
> _Eventually_, this will change to only need a minimal light client for the relay chain node.
> There is also no such thing as a "light" collator node that does not include an embedded 
> relay chain node _yet_ - but there will also eventually be options for this.

## Is It Working?

At this point your _collator's logs_ should look something like this:

```bash
2021-01-14 15:47:03  Cumulus Test Parachain Collator
2021-01-14 15:47:03  ✌️  version 0.1.0-4786231-x86_64-linux-gnu
2021-01-14 15:47:03  ❤️  by Parity Technologies <admin@parity.io>, 2017-2021
2021-01-14 15:47:03  📋 Chain specification: Local Testnet
2021-01-14 15:47:03  🏷 Node name: Alice
2021-01-14 15:47:03  👤 Role: AUTHORITY
2021-01-14 15:47:03  💾 Database: RocksDb at /tmp/substrateIZ0HQm/chains/local_testnet/db
2021-01-14 15:47:03  ⛓  Native runtime: cumulus-test-parachain-3 (cumulus-test-parachain-1.tx1.au1)
2021-01-14 15:47:03  Parachain id: Id(200)
2021-01-14 15:47:03  Parachain Account: 5Ec4AhPTL6nWnUnw58QzjJvFd3QATwHA3UJnvSD4GVSQ7Gop
2021-01-14 15:47:03  Parachain genesis state: 0x000000000000000000000000000000000000000000000000000000000000000000b86f2a5f94d1029bf54b07867c3c2fa0339e69e31748cfd5921bbb2f176ada6f03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c11131400
2021-01-14 15:47:03  Is collating: yes
2021-01-14 15:47:04  [Relaychain] 🔨 Initializing Genesis block/state (state: 0x1693…5e3f, header-hash: 0x2fc1…2ec3)
2021-01-14 15:47:04  [Relaychain] 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2021-01-14 15:47:04  [Relaychain] ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
2021-01-14 15:47:04  [Relaychain] 👶 Creating empty BABE epoch changes on what appears to be first startup.
2021-01-14 15:47:04  [Relaychain] 🏷 Local node identity is: 12D3KooWDTBqULpZPTTnRrEZtA53xG3Ade223mQfbLWstg7L3HA4
2021-01-14 15:47:04  [Relaychain] 📦 Highest known block at #0
2021-01-14 15:47:04  [Relaychain] 〽️ Prometheus server started at 127.0.0.1:9616
2021-01-14 15:47:04  [Relaychain] Listening for new connections on 127.0.0.1:9977.
2021-01-14 15:47:05  [Parachain] 🔨 Initializing Genesis block/state (state: 0xb86f…da6f, header-hash: 0x755b…42ca)
2021-01-14 15:47:05  [Parachain] Using default protocol ID "sup" because none is configured in the chain specs
2021-01-14 15:47:05  [Parachain] 🏷 Local node identity is: 12D3KooWEmhCGHnxfuYX9yWoWmnS1MSU7mkoZFnPSAKws2ZL3CCd
2021-01-14 15:47:05  [Parachain] 📦 Highest known block at #0
2021-01-14 15:47:05  [Parachain] Listening for new connections on 127.0.0.1:9855.
2021-01-14 15:47:06  [Relaychain] 🔍 Discovered new external address for our node: /ip4/127.0.0.1/tcp/30343/p2p/12D3KooWDTBqULpZPTTnRrEZtA53xG3Ade223mQfbLWstg7L3HA4
2021-01-14 15:47:06  [Relaychain] 🔍 Discovered new external address for our node: /ip4/192.168.178.77/tcp/30343/p2p/12D3KooWDTBqULpZPTTnRrEZtA53xG3Ade223mQfbLWstg7L3HA4
2021-01-14 15:47:06  [Parachain] 🔍 Discovered new external address for our node: /ip4/192.168.178.77/tcp/30433/p2p/12D3KooWEmhCGHnxfuYX9yWoWmnS1MSU7mkoZFnPSAKws2ZL3CCd
2021-01-14 15:47:08  [Relaychain] 👶 New epoch 29 launching at block 0x765e…c213 (block slot 268439271 >= start slot 268439271).
2021-01-14 15:47:08  [Relaychain] 👶 Next epoch starts at slot 268439281
2021-01-14 15:47:08  [Relaychain] ✨ Imported #291 (0x765e…c213)
2021-01-14 15:47:09  [Relaychain] 💤 Idle (3 peers), best: #291 (0x765e…c213), finalized #289 (0xca88…7eb1), ⬇ 196.9kiB/s ⬆ 161.9kiB/s
2021-01-14 15:47:10  [Parachain] 💤 Idle (0 peers), best: #0 (0x755b…42ca), finalized #0 (0x755b…42ca), ⬇ 809.4kiB/s ⬆ 773.7kiB/s
2021-01-14 15:47:12  [Relaychain] ✨ Imported #292 (0x1cdf…7cf7)
2021-01-14 15:47:12  [Relaychain] ✨ Imported #292 (0x26a5…7d91)
2021-01-14 15:47:14  [Relaychain] 💤 Idle (3 peers), best: #292 (0x1cdf…7cf7), finalized #289 (0xca88…7eb1), ⬇ 256.8kiB/s ⬆ 270.0kiB/s
2021-01-14 15:47:15  [Parachain] 💤 Idle (0 peers), best: #0 (0x755b…42ca), finalized #0 (0x755b…42ca), ⬇ 814.3kiB/s ⬆ 799.9kiB/s
```

You should see your collator node running (alone) and peering with the already 
running relay chain nodes. You should _not_ see it authoring parachain blocks yet.
Authoring will begin when the collator is actually **registered on the relay chain**.
