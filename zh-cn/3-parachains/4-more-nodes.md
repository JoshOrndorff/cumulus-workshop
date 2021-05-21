# 链接添加的平行链节点

就像我们之前展示的，一条平行链 _只能_ 使用一个校对节点。但是这种配置并不是非常去中心化。一个恶意的对方只要关闭单个节点就可让平行链失控。


> 您应该有至少两个**认证点**（中继链）来运行每个**校对节点**（（You should have _at least_ 2 **validators** (relay chain nodes) running for every **collator**
> （平行链节点）在您的网络上！这就是为什么我们包括一个预先构建的3和4验证器的原因
> 链条规格在这里[the workshop assets](/#_1a-using-a-prebuilt-chain-spec), 
> 您可以在这里添加更多，描述如下



## 启动第二个收集者节点

运行其它收集者节点的命令如下。这个命令与我们用来启动第一个收集者节点的命令几乎完全相同，但是我们需要避免冲突的端口和目录


```bash
parachain-collator \
  --collator \
  --base-path /tmp/parachain-bob \         # <-- set a proper path
  --parachain-id <Your ID> \
  --port <Your chosen libp2p port> \
  --ws-port <Your chosen websocket port> \
  --bootnodes <Your first collator> \
  --bob \                                  # <-- set a proper authority
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain <relay chain spec json> \
  --port <Your chosen libp2p port> \
  --ws-port <Your chosen websocket port> \
  --bootnodes <Alice, and other relay chain collators>
```

## 全节点

在平行链中启动一个无法校对的全节点也是有可能的。对于这些选项，只需要省略`--validator`这个标志。
It is also possible to start non-collating full nodes in the parachain. For these options, simply
leave out the `--validator` flag.

```bash
parachain-collator \
  --base-path <a DB base path> \           # <-- set a proper path
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain <relay chain spec json> \
  --bootnodes <Alice, Bob, and other relay chain collators>
```

