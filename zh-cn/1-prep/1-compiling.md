# 编译

这个工作间包含了准备一条中继链，连接平行链，链之间资产的转账，以及开发您自己的平行链运行时逻辑的所有过程。自然而然地，如果您想要构建自己所有的内容，会有一些更值得注意的编译。（如果您喜欢使用Docker镜像，则可以避免编译波卡和平行链的模板节点。）

## 安装Substrate的前提条件

这个 Substrate Developer Hub 描述了如何创建一个本地的开发环境。请按照这里的指示： https://substrate.dev/docs/en/knowledgebase/getting-started/

## 构建一个中继链节点

克隆Polkadot仓库，以及运行节点。我们正在为这个工作间使用[specific commit](/#versions-of-software) 。在您的标准的工作间目录执行这些步骤。

```bash
# 克隆polkadot数据库
git clone https://github.com/paritytech/polkadot.git

# 切换到polkadot目录
cd polkadot

# 切换到合适的分支
git checkout 5d466006

# 构建中继链节点
cargo build --release

# 打印帮助页面，确保节点被正确构建
./target/release/polkadot --help
```

如果打印了帮助页面，那么您已经成功的构建了一个Polkadot节点。

对于这个工作间的剩余部分，当我们需要去运行这个二进制文件时，我们将其简称为`polkadot`。您可能将刚刚构建的二进制文件移动到更方便的地方，或者将它保留在原处。您需要恰当的输入它的完整路径。

## 构建一个收集者模板

这个Substrate DevHub团队维护一个[parachain template](https://github.com/substrate-developer-hub/substrate-parachain-template) (与[node template](https://github.com/substrate-developer-hub/substrate-node-template)非常类似)，然后我们将开始我们的第一条平行链以及实现跨链转账。
然后，我们将使用它作为我们平行链开发的一个启动节点。在您的标准的工作间目录执行这些步骤。

> 注意：除非您有_大量的 RAM_，否则您将需要等待继链编译才能编译你的链。每个在峰值时最少需要约 12 GB 的 RAM来 完成。

```bash
# 克隆平行链模板
git clone https://github.com/substrate-developer-hub/substrate-parachain-template


# 切换到平行链目录
cd substrate-parachain-template

# 切换到合适的分支
git checkout 4c47b6e2

# 构建平行链模板的收集者节点
cargo build --release

# 打印帮助页面，确保节点被正确构建
./target/release/parachain-collator --help
```

如果打印了帮助页面，就表示您已经成功的构建了基于Cumulus的平行链收集者节点。

对于这个工作间的其余部分，当我们需要去运行这个二进制文件时，我们更喜欢将他简称为`parachain-collator`。您可能将刚刚构建的二进制文件移动到更方便的地方，或者将它保留在原处。您需要恰当的输入它的完整路径。


## 构建您自定义的平行链

> 您必须配置一个本地的开发黄静以及构建平行链模板来编译这个工作间的这个部分。

您自定义的平行链将基于我们上面编译的模板。构建它看起来是一样的，但是您必须在构建它之前需要写好您自己的代码。我们将在这个工作间的这一部分重复构建过程。

