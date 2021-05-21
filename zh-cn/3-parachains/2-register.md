# 注册平行链

我们有我们启动了的中继链，而且我们的平行链收集者准备去注册。现在我们必须在中继链上注册平行链。在实时的Polkadot网络中，
这会通过[平行链-拍卖](https://wiki.polkadot.network/docs/en/learn-auction)来完成。但是现在，我们使用Sudo来完成平行链的注册。

## 注册交易

这个交易可以通过`Apps > Sudo > Registrar > registerPara`进行，参数如下：

- id: `200`
- genesisHead: upload the file `para-200-genesis` (from the previous step)
- validationCode: upload the file `para-200-wasm` (from the previous step)
- parachain: Yes

![Registration screenshot](../../assets/img/registration-screenshot.png)


成功的调度将发出`sudo.Sudid`事件，可在中继链浏览器页面中查看。

如果您运行的网络中有两个以上的验证器，则可以通过
相同的界面并相应调整了参数添加更多的平行链。关于此的更重要的细节
[本教程中的最后部分]（en / 3-parachains / 4-more-nodes）。

### 区块生产

一旦成功注册后，收集者应该启动了生产平行链的区块(即排序)。收集者应该开始生成如下所示的日志信息：

```
2021-01-14 16:09:54  [Relaychain] ✨ Imported #519 (0x7c22…71b8)
2021-01-14 16:09:54  [Relaychain] Starting collation for relay parent 0x7c22474df9f10b44aed7616c3ad9aef4d0db82e8421a81cbc3c10e63569971b8 on parent 0x4d77beb48b42979b070e0e81357f66629da194faa0f72be0bb70ee6828c220d0.
2021-01-14 16:09:54  [Relaychain] 🙌 Starting consensus session on top of parent 0x4d77beb48b42979b070e0e81357f66629da194faa0f72be0bb70ee6828c220d0
2021-01-14 16:09:54  [Relaychain] 🎁 Prepared block for proposing at 18 [hash: 0x8cb3aa750b83e1dfc120c81243e8d7fdb3f6926adfe79b977ec7d8f4a5f7bb7b; parent_hash: 0x4d77…20d0; extrinsics (3): [0x9d73…3794, 0xd860…3108, 0x6fdb…0112]]
2021-01-14 16:09:54  [Relaychain] Produced proof-of-validity candidate 0x67b91f2a3e0cc82d0b18a2ec31212081853b24e5c8f7de98d39fabfd89f46bee from block 0x8cb3aa750b83e1dfc120c81243e8d7fdb3f6926adfe79b977ec7d8f4a5f7bb7b.
2021-01-14 16:09:54  [Parachain] ✨ Imported #18 (0x8cb3…bb7b)
2021-01-14 16:09:54  [Relaychain] 💤 Idle (4 peers), best: #519 (0x7c22…71b8), finalized #516 (0x982f…d9cf), ⬇ 239.4kiB/s ⬆ 239.6kiB/s
2021-01-14 16:09:55  [Parachain] 💤 Idle (0 peers), best: #17 (0x4d77…20d0), finalized #15 (0x25ec…a10b), ⬇ 633.5kiB/s ⬆ 622.3kiB/s
2021-01-14 16:09:59  [Relaychain] 💤 Idle (4 peers), best: #519 (0x7c22…71b8), finalized #517 (0x6852…ec17), ⬇ 216.3kiB/s ⬆ 216.6kiB/s
2021-01-14 16:10:00  [Relaychain] ✨ Imported #520 (0x0ecb…4dba)
2021-01-14 16:10:00  [Parachain] 💤 Idle (0 peers), best: #17 (0x4d77…20d0), finalized #16 (0xd7e0…ae67), ⬇ 503.7kiB/s ⬆ 494.3kiB/s
2021-01-14 16:10:04  [Relaychain] 💤 Idle (4 peers), best: #520 (0x0ecb…4dba), finalized #518 (0x15df…f3fa), ⬇ 282.0kiB/s ⬆ 275.3kiB/s
2021-01-14 16:10:05  [Parachain] 💤 Idle (0 peers), best: #17 (0x4d77…20d0), finalized #16 (0xd7e0…ae67), ⬇ 605.2kiB/s ⬆ 595.0kiB/s
```
```

### 整理器数据库损坏或丢失

>注意：您的唯一整理者是_所有平行链数据的唯一宿主_，因为只有一个节点
>在您的整个网络上！中继链仅存储_header_信息！如果parachian DB丢失了
>（我以用`--tmp`为例，作为您的整理者），您将**无法**恢复链！

如果您必须清除链，则需要注销并重新注册！测试可能会更容易
而是清除所有链条。要清除整理DB，请运行：

```bash
# 清除整理器
parachain-collator purge-chain\
  --base-path <your collator DB path set above> \  # <-- set a proper path

# 清除验证器
polkadot purge-chain\
  --base-path <your collator DB path set above> \  # <-- set a proper path
```


然后从[空白面板]（＃registration-transaction）重新注册。

### 平行链区块完成
中继链跟踪每个平行链的最新区块（头部）。当中继链阻塞时
完成后，所有完成了
[validation process](https://polkadot.network/the-path-of-a-parachain-block/) 也完成了。
这就是Polkadot实现共享安全性的方式。


我们可以跟踪记录了哪些平行链以及它们最新的头部数据在
Apps UI中的“网络>平行链”标签。

![Parachain Head Information](../../assets/img/parachain-summary-screenshot.png)