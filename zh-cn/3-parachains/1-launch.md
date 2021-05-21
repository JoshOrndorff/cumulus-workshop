# 启动一条平行链

我们将首先部署一个贷有parachain id 200的平行链模板。这些说明是专门为parachain id 200编写的，但是您可以将这些说明与任何整理出现的数字200的parachain id一起重复使用。

请注意，下面使用的“ parachain-collat​​or”命令来自[substrate-parachain-template repo]（https://github.com/substrate-developer-hub/substrate-parachain-template/）
我们在[准备/编译步骤]（/＃versions-of-software）中以_specific_提交的方式进行了设置。

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

>这仅适用于_genesis_-您目前无法将平行链与任何先前的
>状态到中继链。所有副链必须从中继链的块0开始。
>目前没有“hot swap”共识或重新生成。



## 启动收集者节点

我们现在可以通过以下的命令来启动收集者节点。请注意，我们提供的中继链规范与启动中继链节点时使用的链规范是一样的。


```bash
parachain-collator \
  --collator \
  --base-path /tmp/parachain-alice \
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

关于这个命令，需要注意的一件事是，许多的参数在`--`之前被传递，以及更多的参数在它之后被传递。一个cumulus收集者包含实际的收集者节点，而且
也包含一个嵌入的中继链节点。这些参数在`--`之前是用于收集者，在`--`之后是用于嵌入的中继链节点。


我们给收集者一个基本路径和端口，就像我们之前为中继链节点做的那样。我们也指定parachain ID。如果您对第二条平行链执行这些指令，请记住修改这些具体的收集者的值。
然后，我们给嵌入的中继链节点我们正在使用的中继链规范。最后，我们给嵌入的中继链节点一些对等的地址。


## 这有用吗？

此时，您应该看到您的收集者节点运行，而且与中继链节点对等。您应该还 _不能_ 看到它authoring平行链的块。
当验证者在中继链上实际被注册了，authoring将会开始。


这时，您的收集者的日志应该看起来就像这样：

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

您应该看到您的整理器节点正在运行（单独）并与已经存在的对等节点
运行中继链节点。您不应该尚未看到它编写了
平行链。当整理者实际上是在中继链上**注册时，创作便开始了。

