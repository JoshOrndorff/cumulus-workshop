
<!-- fIXME - 目前没有维护用于此的 docker。这只是从编译页面复制的。需要更新才能使用！ -->

## 缩短工作间

如果您打算将此材料用于现场研讨会，您可以通过切断步骤来缩短它
结束。如果您的研讨会不包括编写您自己的平行链，您可以跳过所有
使用提供的 docker 镜像进行编译。

如果您更喜欢主要专注于工作间的开发，您也可以跳过初始中继
通过自己执行这些步骤来准备研讨会或使用公众来设置链
rococo测试网。有关设置 Bootnode 的说明，请参阅 [Setting Up The Bootnode](../SettingUpTheBootnode.md)
基于云的中继链。

---

## 使用 Docker 镜像

> 本地搭建节点可跳过此步骤

本次研讨会可用的两个 docker 镜像运行与我们描述的完全相同的二进制文件
上一节中的构建。

- `joshyorndorff/cumulus-workshop-polkadot` 是中继链节点。
- `joshyorndorff/cumulus-workshop-parachain-collat​​or` 是平行链节点。

因为这些容器需要相互通信，所以你需要处理
联网。 [Docker 中的网络](https://docs.docker.com/network/) 超出了本文的范围
教程，并且有许多有效的选项。我将在这里简要描述一个简单的选项
帮助许多初学者快速入门和运行。

“主机网络”是最简单的技术，允许看起来最相似的命令
在研讨会上给出。它告诉 docker 在不隔离容器的情况下运行节点；就像
如果您正在运行本地二进制文件。

```bash
# Instead of running
polkadot --my-args

# You should run
docker run --network host joshyorndorff/cumulus-workshop-polkadot --my-args
```

```bash
# Instead of running
parachain-collator --para-args -- --relay-args

# You should run
docker run --network host joshyorndorff/cumulus-workshop-parachain-collator --para-args -- --relay-args
```

在整个工作间中，当我们需要运行节点时，我们将它们简称为`polkadot`和
`parachain-collat​​or`。您需要将这些命令转换为适当的 docker 命令。