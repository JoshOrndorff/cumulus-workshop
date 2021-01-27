# 启动中继链

在我们可以连接任何基于cumulus的平行链之前，我们需要启动中继链。本页详细的描述了如何在具有两个验证者中的`rococo-local.json`规范中启动两个节点。
这份规范文件在这个工作间附带了启动其它节点的一般说明。


## 启动Alice节点

```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9944 \
  --port 30333 \
  --alice
```

这个port和ws-port的端口是默认的，因此那些标志也可以被省略掉。然后，我选择留下它们以强制检查它们的值的习惯。由于Alice使用的是默认值，所以在中继链或者平行链的其它节点不能使用这些端口。


当节点启动时，您将看到许多日志消息。注意下面这个例子。这里列出了Alice的peerId。我们需要它来连接其它的节点。


```
Local node identity is: 12D3KooWLRPJAA6CrXP14FRJztzCh4JmgtRzKWpiBjL3BtseEfyv
```

### 连接应用程序UI

为了浏览和连接网络，您可以使用 Polkadot JS Apps UI。如果您已经使用上面的命令启动了这个节点，您可以用


> 有些浏览器，尤其是Firefox，不会从https网络连接到本地节点。一个简单的解决方法是尝试另一个浏览器，比如Chromium。另一个选择是[本地托管这个接口](https://github.com/polkadot-js/apps#development)。

> 在编辑本文时，这个示例项目与上面链接的托管版本的Apps一起工作。如果同时发生了更改，请尝试使用 commit`28c3fb1`[本地托管这个接口](https://github.com/polkadot-js/apps#development)。


## 启动Bob的节点

```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9955 \
  --port 30334 \
  --bob \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID>
```

Bob的命令与Alice完全相似。它与Alice的具体不同之处在于Bob指定了它自己的基本路径，提供它自己的validator keys(`--bob`)，
以及使用了它自己的端口。最后它也添加了一个`--bootnodes`标记。如果您在单个本地系统上运行整个网络，这个bootnodes标志并不是严格需要的，但是在网络上运行它时必须的，所以我选择了保留它。


## 启动附加节点 (可选)

> 如果您使用 `rococo-local.json` 规范, 您不需要启动附加节点。

如果您正在使用`rococo-3.json`或者`rococo-4.json`规范在这个工作间，您将需要至少启动一个或者两个，甚至更多个节点。
同样，这个命令完全类似。您只需要确保同一物理系统上的节点没有冲突的端口或者基本目录。


```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9966 \           # Any unused port
  --port 30335 \             # Any unused port
  --charlie \                # The appropriate key for your validator
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
  --bootnodes /ip4/<Bob IP>/tcp/30334/p2p/<Bob Peer ID>
```

就像前面描述的，如果在本地系统运行，则不必指定具体的bootnodes。此外，从来没有必要同时指定两个bootnodes，尽管这样做可能有助于节点更快的对等。


如果您自定义的链规范已经包含了自我生成的键，请参阅[Substrate private network tutorial](https://substrate.dev/docs/en/tutorials/start-a-private-network/customchain#add-keys-to-keystore)
以获得关于插入这些键的具体信息。

