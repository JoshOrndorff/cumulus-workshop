# 启动一条平行链

我们将首先部署一个贷有parachain id 200的平行链模板。这些说明是专门为parachain id 200编写的，但是您可以将这些说明与任何整理出现的数字200的parachain id一起重复使用。


## 生成初始状态

要注册一条平行链，中继链必须要知道平行链的初始状态。收集者节点可以为我们将该状态输出到文件中。
下面的命令将会创建一个文件，其中包括平行链的整个初始状态，十六进制编码。


```bash
parachain-collator export-genesis-state --parachain-id 200 > para-200-genesis
```

## 获取Wasm验证函数

中继链同样需要具体的平行链验证逻辑去验证平行链区块。收集者节点还有一个生成这个wasm blob的命令。


```bash
parachain-collator export-genesis-wasm > para-200-wasm
```

> Wasm blob不依赖于parachain id，因此我们不提供该标志。
> 如果您使用完全相同的运行时逻辑去启动多个平行链，则您不需要每次都重新生成Wasm blob(尽管这样做既快又无害)。


## 启动收集者节点

我们现在可以通过以下的命令来启动收集者节点。请注意，我们提供的中继链规范与启动中继链节点时使用的链规范是一样的。


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

关于这个命令，需要注意的一件事是，许多的参数在`--`之前被传递，以及更多的参数在它之后被传递。一个cumulus收集者包含实际的收集者节点，而且
也包含一个嵌入的中继链节点。这些参数在`--`之前是用于收集者，在`--`之后是用于嵌入的中继链节点。


我们给收集者一个基本路径和端口，就像我们之前为中继链节点做的那样。我们也指定parachain ID。如果您对第二条平行链执行这些指令，请记住修改这些具体的收集者的值。
然后，我们给嵌入的中继链节点我们正在使用的中继链规范。最后，我们给嵌入的中继链节点一些对等的地址。


## 这有用吗？

此时，您应该看到您的收集者节点运行，而且与中继链节点对等。您应该还 _不能_ 看到它authoring平行链的块。
当验证者在中继链上实际被注册了，authoring将会开始。


这时，您的收集者的日志应该看起来就像这样：

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
