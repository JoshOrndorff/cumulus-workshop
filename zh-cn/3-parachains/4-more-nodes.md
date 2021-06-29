# 链接添加的平行链节点

正如我们已经展示的那样，平行链 仅 使用一个整理器。但是這種配置不是很分散。攻击者只需要关闭一个节点即可阻止平行链。

> 您应该为每个 **collat​​or** 运行至少 2 个 **validators**（中继链节点）
> （平行链节点）在您的网络上！这就是我们包含预构建的 3 和 4 验证器的原因
> [车间资产](/#_1a-using-a-prebuilt-chain-spec) 中为您提供的链规范，并且您
> 可以根据需要添加更多，在那里描述。

## 启动第二个收集者节点

运行其它收集者节点的命令如下。这个命令与我们用来启动第一个收集者节点的命令几乎完全相同，但是我们需要避免冲突的端口和目录

```bash
parachain-collator \
--bob \
--collator \
--force-authoring \
--parachain-id 2000 \
--base-path /tmp/parachain/bob \
--bootnodes <a running collator node> \
--port 40334 \
--ws-port 9946 \
-- \
--execution wasm \
--chain <relay chain spec json> \
--port 30344 \
--ws-port 9978
--bootnodes <other relay chain node>
```

## 非整理平行链完整节点

也可以在平行链中启动非整理完整节点。对于这些选项，只需省略 `--collat​​or` 标志。

```bash
parachain-collator \
  --base-path <a DB base path> \
  --bootnodes <Your first collator> \
  --ws-port <Your chosen websocket port> \
  --port <Your chosen libp2p port> \
  --parachain-id <Your ID> \
  -- \
  --chain <relay chain spec json> \
  --bootnodes <Alice, Bob, and other relay chain collators>
```
