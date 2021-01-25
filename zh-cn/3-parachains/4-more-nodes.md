# 添加平行链节点

就像我们之前展示的，一条平行链 _只能_ 使用一个收集者节点。但是这种配置并不是非常去中心化。一个恶意的对方只要关闭单个节点就可让平行链失控。


## 启动第二个收集者节点

运行其它收集者节点的命令如下。这个命令与我们用来启动第一个收集者节点的命令几乎完全相同，但是我们需要避免冲突的端口和目录


```bash
parachain-collator \
  --tmp
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  --validator \
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain spec.json \
  --bootnodes <Alice, Bob, and other relay chain collators>
```

## 全节点

在平行链中启动一个无法校对的全节点也是有可能的。对于这些选项，只需要省略`--validator`这个标志。
It is also possible to start non-collating full nodes in the parachain. For these options, simply
leave out the `--validator` flag.

```bash
parachain-collator \
  --tmp
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  -- \ # Any flags after this -- go to the embedded polkadot node
  --chain spec.json \
  --bootnodes <Alice, Bob, and other relay chain collators>
```
