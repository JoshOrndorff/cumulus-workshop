# Launching a Parachain

We'll begin by deploying a parachain template with parachain id 200. These instructions are written
specifically for parachain id 200, however you can re-use these instructions with any parachain ID
adjusting occurrences of the number 200 accordingly.

## Generate Genesis State

To register a parachain, the relay chain needs to know the parachain's genesis state. The collator
node can export that state to a file for us. The following command will create a file containing the
parachain's entire genesis state, hex-encoded.

```bash
parachain-collator export-genesis-state --parachain-id 200 > para-200-genesis
```

## Obtain Wasm Validation Function

The relay chain also needs the parachain-specific validation logic to validate parachain blocks. The
collator node also has a command to produce this wasm blob.

```bash
parachain-collator export-genesis-wasm > para-200-wasm
```

> The Wasm blob does not depend on the parachain id, so we do not provide that flag. If you are
> launching multiple parachains using the exact same runtime, you do not need to regenerate the Wasm
> blob each time (although it is fast and harmless to do so).

## Start the Collator Node

We can now start the collator node with the following command. Notice that we're supplying the same
relay chain spec we used when launching relay chain nodes.

```bash
parachain-collator \
  --tmp \
  --ws-port 9977 \
  --port 30336 \
  --parachain-id 200 \
  --validator \
  -- \
  --chain spec.json \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
  --bootnodes <Other Relay Chain Node(s)
```

The first thing to notice about this command is that several arguments are passed before the lone
`--`, and several more arguments are passed after it. A cumulus collator contains the actual
collator node, and also an embedded relay chain node. The arguments before the `--` are for the
collator, and the arguments after the `--` are for the embedded relay chain node.

We give the collator a base path and ports as we did for the relay chain node previously. We also
specify the parachain ID. Remember to change these collator-specific values if you are executing
these instructions a second time for a second parachain. Then we give the embedded relay chain node
the relay chain spec we are using. Finally, we give the embedded relay chain node some peer
addresses.

## Is It Working?

At this point you should see your collator node running and peering with the relay-chain nodes. You
should _not_ see it authoring parachain blocks yet. Authoring will begin when the collator is
actually registered on the relay chain (the next step).

At this point your collator's logs should look something like this:

```
2020-08-11 13:58:05 Parachain Collator Template
2020-08-11 13:58:05 ✌️  version 0.1.0-9c4e41f-x86_64-linux-gnu
2020-08-11 13:58:05 ❤️  by Parity Technologies <admin@parity.io>, 2017-2020
2020-08-11 13:58:05 📋 Chain specification: Local Testnet
2020-08-11 13:58:05 🏷  Node name: seemly-coil-3428
2020-08-11 13:58:05 👤 Role: AUTHORITY
2020-08-11 13:58:05 💾 Database: RocksDb at /tmp/para-200-collator-1/chains/local_testnet/db
2020-08-11 13:58:05 ⛓  Native runtime: parachain-template-1 (parachain-template-1.tx1.au1)
2020-08-11 13:58:06 Parachain id: Id(200)
2020-08-11 13:58:06 Parachain Account: 5Ec4AhPTL6nWnUnw58QzjJvFd3QATwHA3UJnvSD4GVSQ7Gop
2020-08-11 13:58:06 Parachain genesis state: 0x00000000000000000000000000000000000000000000000000000000000000000097600fcfeeed0c7c2e7d922081a466c4c00f2af96ce17f4a07d59e7d47e8354b03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c11131400
2020-08-11 13:58:06 Is collating: yes
2020-08-11 13:58:06 🔨 Initializing Genesis block/state (state: 0x9760…354b, header-hash: 0xfbcf…0630)
2020-08-11 13:58:06 Using default protocol ID "sup" because none is configured in the chain specs
2020-08-11 13:58:06 🏷  Local node identity is: 12D3KooWKtybPXqyVERSL15voBJ7dayKkjdtkAAhyThh9i1yQ8Hu (legacy representation: Qmcn7THzcAkSU1umdfvqJksPbZDR5YnekpfGeVpvA6FLiL)
2020-08-11 13:58:06 📦 Highest known block at #0
2020-08-11 13:58:07 🔨 Initializing Genesis block/state (state: 0x9cfe…2550, header-hash: 0x5bc8…5d56)
2020-08-11 13:58:07 👴 Loading GRANDPA authority set from genesis on what appears to be first startup.
2020-08-11 13:58:07 ⏱  Loaded block-time = 6000 milliseconds from genesis on first-launch
2020-08-11 13:58:07 👶 Creating empty BABE epoch changes on what appears to be first startup.
2020-08-11 13:58:07 🏷  Local node identity is: 12D3KooWLMqjB74XBUDkNdA8dYkoNKDpE8XURBLxQoLenTE8YeXz (legacy representation: QmQf5MovRs6db6kekKSscr7JnCj6nsiPeghTzSm4sNTAXM)
2020-08-11 13:58:07 📦 Highest known block at #0
2020-08-11 13:58:07 〽 Prometheus server started at 127.0.0.1:9616
2020-08-11 13:58:07 Unable to bind RPC server to 127.0.0.1:9945. Trying random port.
2020-08-11 13:58:07 🔍 Discovered new external address for our node: /ip4/192.168.1.216/tcp/30334/p2p/12D3KooWLMqjB74XBUDkNdA8dYkoNKDpE8XURBLxQoLenTE8YeXz
2020-08-11 13:58:11 💤 [Parachain] Idle (0 peers), best: #0 (0xfbcf…0630), finalized #0 (0xfbcf…0630), ⬇ 2.1kiB/s ⬆ 2.1kiB/s
2020-08-11 13:58:12 ✨ [Relaychain] Imported #11 (0xfb65…b485)
2020-08-11 13:58:12 💤 [Relaychain] Idle (2 peers), best: #11 (0xfb65…b485), finalized #8 (0xef9d…f488), ⬇ 4.6kiB/s ⬆ 3.8kiB/s
2020-08-11 13:58:16 💤 [Parachain] Idle (0 peers), best: #0 (0xfbcf…0630), finalized #0 (0xfbcf…0630), ⬇ 0.8kiB/s ⬆ 0.9kiB/s
2020-08-11 13:58:17 💤 [Relaychain] Idle (2 peers), best: #11 (0xfb65…b485), finalized #9 (0x3ea7…688f), ⬇ 1.2kiB/s ⬆ 1.0kiB/s
2020-08-11 13:58:18 ✨ [Relaychain] Imported #12 (0x2570…6502)
2020-08-11 13:58:21 💤 [Parachain] Idle (0 peers), best: #0 (0xfbcf…0630), finalized #0 (0xfbcf…0630), ⬇ 1.4kiB/s ⬆ 1.3kiB/s
2020-08-11 13:58:22 💤 [Relaychain] Idle (2 peers), best: #12 (0x2570…6502), finalized #10 (0x3208…7944), ⬇ 1.6kiB/s ⬆ 1.1kiB/s
2020-08-11 13:58:24 ✨ [Relaychain] Imported #13 (0xa251…7bef)
2020-08-11 13:58:26 💤 [Parachain] Idle (0 peers), best: #0 (0xfbcf…0630), finalized #0 (0xfbcf…0630), ⬇ 0.6kiB/s ⬆ 0.7kiB/s
2020-08-11 13:58:27 💤 [Relaychain] Idle (2 peers), best: #13 (0xa251…7bef), finalized #10 (0x3208…7944), ⬇ 1.4kiB/s ⬆ 1.1kiB/s
2020-08-11 13:58:30 ✨ [Relaychain] Imported #14 (0x2acc…0911)
2020-08-11 13:58:31 💤 [Parachain] Idle (0 peers), best: #0 (0xfbcf…0630), finalized #0 (0xfbcf…0630), ⬇ 1.6kiB/s ⬆ 1.5kiB/s
2020-08-11 13:58:32 💤 [Relaychain] Idle (2 peers), best: #14 (0x2acc…0911), finalized #11 (0xfb65…b485), ⬇ 1.6kiB/s ⬆ 1.2kiB/s
2020-08-11 13:58:36 ✨ [Relaychain] Imported #15 (0x0693…3216)
```
