# Launching a Parachain

We'll begin by deploying a parachain template with parachain id `200`. These instructions are written
specifically for parachain id 200, however you can re-use these instructions with any parachain id
by adjusting occurrences of the number 200 accordingly.

Note that the `parachain-collator` command used below comes from the [substrate-parachain-template repo](https://github.com/substrate-developer-hub/substrate-parachain-template/)
that we set up in the [Preparation/Compiling step](/#versions-of-software) at a _specific_ commit.

## Generate Parachain Genesis State

To register a parachain, the relay chain needs to know the parachain's genesis state. The collator
node can export that state to a file for us. The following command will create a file containing the
parachain's entire genesis state, hex-encoded.

```bash
parachain-collator export-genesis-state --parachain-id 2000 > para-2000-genesis
```

## Obtain Wasm Runtime Validation Function

The relay chain also needs the parachain-specific runtime validation logic to validate 
parachain blocks. The collator node also has a command to produce this Wasm blob:

```bash
parachain-collator export-genesis-wasm > para-2000-wasm
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
# NOTE: this command assumes a ParaId of 2000. Change as needed.
# Above `--` line are flags for the parachain collator, below for the embedded relay chain validator
parachain-collator \
--alice \
--collator \
--force-authoring \
--parachain-id 2000 \
--base-path /tmp/parachain/alice \
--port 40333 \
--ws-port 9945 \
-- \
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

> A Parachain node = (full) collator + (full) validator node.
> _Eventually_, this will change to only need a minimal light client for the relay chain node.
> There is also no such thing as a "light" collator node that does not include an embedded 
> relay chain node _yet_ - but there will also eventually be options for this.

## Is It Working?

At this point your _collator's logs_ should look something like this:

```bash
2021-05-30 16:57:39 Parachain Collator Template    
2021-05-30 16:57:39 ✌️  version 3.0.0-acce183-x86_64-linux-gnu    
2021-05-30 16:57:39 ❤️  by Anonymous, 2017-2021    
2021-05-30 16:57:39 📋 Chain specification: Local Testnet    
2021-05-30 16:57:39 🏷 Node name: Alice    
2021-05-30 16:57:39 👤 Role: AUTHORITY    
2021-05-30 16:57:39 💾 Database: RocksDb at /tmp/parachain/alice/chains/local_testnet/db    
2021-05-30 16:57:39 ⛓  Native runtime: template-parachain-1 (template-parachain-0.tx1.au1)    
2021-05-30 16:57:41 Parachain id: Id(2000)    
2021-05-30 16:57:41 Parachain Account: 5Ec4AhPUwPeyTFyuhGuBbD224mY85LKLMSqSSo33JYWCazU4    
2021-05-30 16:57:41 Parachain genesis state: 0x0000000000000000000000000000000000000000000000000000000000000000000a96f42b5cb798190e5f679bb16970905087a9a9fc612fb5ca6b982b85783c0d03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c11131400    
2021-05-30 16:57:41 Is collating: yes    
2021-05-30 16:57:41 [Parachain] 🔨 Initializing Genesis block/state (state: 0x0a96…3c0d, header-hash: 0xd42b…f271)    
2021-05-30 16:57:41 [Parachain] ⏱  Loaded block-time = 12s from block 0xd42bb78354bc21770e3f0930ed45c7377558d2d8e81ca4d457e573128aabf271    
2021-05-30 16:57:43 [Relaychain] 🔨 Initializing Genesis block/state (state: 0xace1…1b62, header-hash: 0xfa68…cf58)    
2021-05-30 16:57:43 [Relaychain] 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.    
2021-05-30 16:57:44 [Relaychain] ⏱  Loaded block-time = 6s from block 0xfa68f5abd2a80394b87c9bd07e0f4eee781b8c696d0a22c8e5ba38ae10e1cf58    
2021-05-30 16:57:44 [Relaychain] 👶 Creating empty BABE epoch changes on what appears to be first startup.    
2021-05-30 16:57:44 [Relaychain] 🏷 Local node identity is: 12D3KooWBjYK2W4dsBfsrFA9tZCStb5ogPb6STQqi2AK9awXfXyG    
2021-05-30 16:57:44 [Relaychain] 📦 Highest known block at #0    
2021-05-30 16:57:44 [Relaychain] 〽️ Prometheus server started at 127.0.0.1:9616    
2021-05-30 16:57:44 [Relaychain] Listening for new connections on 127.0.0.1:9945.    
2021-05-30 16:57:44 [Parachain] Using default protocol ID "sup" because none is configured in the chain specs    
2021-05-30 16:57:44 [Parachain] 🏷 Local node identity is: 12D3KooWADBSC58of6ng2M29YTDkmWCGehHoUZhsy9LGkHgYscBw    
2021-05-30 16:57:44 [Parachain] 📦 Highest known block at #0    
2021-05-30 16:57:44 [Parachain] Unable to listen on 127.0.0.1:9945    
2021-05-30 16:57:44 [Parachain] Unable to bind RPC server to 127.0.0.1:9945. Trying random port.    
2021-05-30 16:57:44 [Parachain] Listening for new connections on 127.0.0.1:45141.    
2021-05-30 16:57:45 [Relaychain] 🔍 Discovered new external address for our node: /ip4/192.168.42.204/tcp/30334/ws/p2p/12D3KooWBjYK2W4dsBfsrFA9tZCStb5ogPb6STQqi2AK9awXfXyG    
2021-05-30 16:57:45 [Parachain] 🔍 Discovered new external address for our node: /ip4/192.168.42.204/tcp/30333/p2p/12D3KooWADBSC58of6ng2M29YTDkmWCGehHoUZhsy9LGkHgYscBw    
2021-05-30 16:57:48 [Relaychain] ✨ Imported #8 (0xe60b…9b0a)    
2021-05-30 16:57:49 [Relaychain] 💤 Idle (2 peers), best: #8 (0xe60b…9b0a), finalized #5 (0x1e6f…567c), ⬇ 4.5kiB/s ⬆ 2.2kiB/s    
2021-05-30 16:57:49 [Parachain] 💤 Idle (0 peers), best: #0 (0xd42b…f271), finalized #0 (0xd42b…f271), ⬇ 2.0kiB/s ⬆ 1.7kiB/s    
2021-05-30 16:57:54 [Relaychain] ✨ Imported #9 (0x1af9…c9be)    
2021-05-30 16:57:54 [Relaychain] ✨ Imported #9 (0x6ed8…fdf6)    
2021-05-30 16:57:54 [Relaychain] 💤 Idle (2 peers), best: #9 (0x1af9…c9be), finalized #6 (0x3319…69a2), ⬇ 1.8kiB/s ⬆ 0.5kiB/s    
2021-05-30 16:57:54 [Parachain] 💤 Idle (0 peers), best: #0 (0xd42b…f271), finalized #0 (0xd42b…f271), ⬇ 0.2kiB/s ⬆ 0.2kiB/s    
2021-05-30 16:57:59 [Relaychain] 💤 Idle (2 peers), best: #9 (0x1af9…c9be), finalized #7 (0x5b50…1e5b), ⬇ 0.6kiB/s ⬆ 0.4kiB/s    
2021-05-30 16:57:59 [Parachain] 💤 Idle (0 peers), best: #0 (0xd42b…f271), finalized #0 (0xd42b…f271), ⬇ 0 ⬆ 0    
2021-05-30 16:58:00 [Relaychain] ✨ Imported #10 (0xc9c9…1ca3)
```

You should see your collator node running (alone) and peering with the already 
running relay chain nodes. You should **_not_** see it authoring parachain blocks yet!
Authoring will begin when the collator is actually **registered on the relay chain**.
