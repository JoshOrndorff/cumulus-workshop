# 启动中继链

在我们可以连接任何基于cumulus的平行链之前，我们需要启动中继链。本页详细的描述了如何在具有两个验证者中的`rococo-local.json`规范中启动两个节点。
这份规范文件在这个工作间附带了启动其它节点的一般说明。


## 启动Alice节点

```bash
# Start Relay `Alice` node
polkadot \
--alice \
--validator \
--base-path /tmp/relay/alice \
--chain <path to spec json> \
--port 50555 \
--ws-port 9944
```

这个port和ws-port的端口是默认的，因此那些标志也可以被省略掉。然后，我选择留下它们以强制检查它们的值的习惯。由于Alice使用的是默认值，所以在中继链或者平行链的其它节点不能使用这些端口。


当节点启动时，您将看到许多日志消息。**记下其节点的对等ID** 
> 在日志中。将其他节点连接到她时，我们将需要它。看起来_像_
>这个: 
>
> ```bash
> 🏷 Local node identity is: 12D3KooWGjsmVmZCM1jPtVNp6hRbbkGBK3LADYNniJAKJ19NUYiq
> ```

### 连接应用程序UI

为了浏览和连接网络，您可以使用 Polkadot JS Apps UI。如果您已经使用上面的命令启动了这个节点，您可以用


要探索网络并与网络交互，您可以使用 Polkadot JS Apps UI。如果你已经开始
这个节点使用上面的命令，你可以访问该节点 
https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944


> 某些浏览器，尤其是 Firefox，不会从 https 网站连接到本地节点。一个简单的
> 解决方法是尝试其他浏览器，例如 Chromium。
>
> 在撰写本文时，此演示适用于上面链接的托管应用程序版本。如果某事有
> 在此期间更改，尝试
> [在本地托管接口](https://github.com/polkadot-js/apps#development) 使用提交
> 已定义 [版本兼容](/#versions-of-software) 注明。


## 启动Bob的节点

```bash
polkadot \
--bob \
--validator \
--base-path /tmp/relay-bob \
--chain <path to spec json> \
--bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
--port 30334 \
--ws-port 9955
```

Bob的命令与Alice完全相似。它与Alice的具体不同之处在于Bob指定了它自己的基本路径，提供它自己的validator keys(`--bob`)，
以及使用了它自己的端口。最后它也添加了一个`--bootnodes`标记。如果您在单个本地系统上运行整个网络，这个bootnodes标志并不是严格需要的，但是在网络上运行它时必须的，所以我选择了保留它。


## 启动附加节点 (可选)

> 如果您使用 `rococo-local.json` 规范, 您不需要启动附加节点。


如果您使用本研讨会随附的“rococo-custom-3.json”或“rococo-custom-4.json”规范，您将需要再启动一两个节点。同样，这个命令是完全类似的。你只需要确保同一物理系统上的节点没有冲突的端口或基目录。

```bash
polkadot \
--charlie \
--validator \
--base-path /tmp/relay-charlie \
--chain <path to spec json> \
--port 30335 \
--ws-port 9966
```
```

如果您自定义的链规范已经包含了自我生成的键，请参阅[Substrate private network tutorial](https://substrate.dev/docs/en/tutorials/start-a-private-network/customchain#add-keys-to-keystore)
以获得关于插入这些键的具体信息。

