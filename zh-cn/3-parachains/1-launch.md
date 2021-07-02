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

关于这个命令，需要注意的一件事是，许多的参数在`--`之前被传递，以及更多的参数在它之后被传递。一个cumulus收集者包含实际的收集者节点，而且
也包含一个嵌入的中继链节点。这些参数在`--`之前是用于收集者，在`--`之后是用于嵌入的中继链节点。

我们为整理者提供了一个基本路径和端口，就像我们之前为中继链节点所做的那样。我们也指定平行链 ID。

> 如果您正在执行，请记住更改特定于整理者的值
> 对第二条平行链再次使用这些说明。
> 您将使用相同的中继链链规范，但需要公开不同的端口。

> 平行链节点 =（完整）整理者 +（完整）验证者节点。
> _最终_，这将更改为中继链节点只需要一个最小的轻客户端。
> 也不存在不包含嵌入式的“轻量级”整理器节点
> 中继链节点 _yet_ - 但最终也会有这方面的选择


## 这有用吗？

此时，您应该看到您的收集者节点运行，而且与中继链节点对等。您应该还 _不能_ 看到它authoring平行链的块。
当验证者在中继链上实际被注册了，authoring将会开始。


这时，您的收集者的日志应该看起来就像这样：

```
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
您应该看到您的整理器节点正在运行（单独）并与已经存在的对等节点
运行中继链节点。您**不**应该尚未看到它编写了
平行链。当整理者实际上是**在中继链上注册时**，创作便开始了。

