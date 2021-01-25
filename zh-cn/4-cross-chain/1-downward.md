# 向下转账

Polkadot的XCMP(跨链信息传递)将允许不同的区块链之间任意资产的转移。CMMP仍然在开发中，而且可能会发生重大变化，但是它已经组后稳定，可以进行演示和实验。
这个工作间主要关注跨链传输代币的 _过程_。您可以通过这些资源学习更多的信息传递的常识。


- [信息传递概述](https://github.com/paritytech/polkadot/blob/master/roadmap/implementers-guide/src/messaging.md)
- [信息格式规范](https://github.com/paritytech/xcm-format)

## 质押和铸币模型

当从一条中继链向一条平行链发送DOTs时，我们使用一个质押和铸币模型。DOTs将发送者账户留在中继链上，并被转移到中继链上特定的平行链的账户中。
当平行链接收到此转账已经发生的消息时，它将在平行链上的指定账户中创建相应数量的代币。


## 向下发送代币

要将代币从Alice在中继链上的账户发送到她自己在parachain 200的账户上，您需要在中继链上提交一个交易。返回连接到中继链的Apps实例，导航到Parachains选项，然后单击"Transfer to chain"按钮。


根据您所期望的填写具体的信息并提交交易

![Sending tokens down](../../../assets/img/downward-transfer-screenshot.png)

## 确认收到DOTs

一旦中继链已经处理完交易，您应该可以看到代币显示在平行链相应的账户中。在连接到平行链的Apps实例中，检查Alice的账户余额并确定代币已经到账了。


## 更多玩法

这个单笔交易已经演示了向平行链发送代币的基本原理。但是通过玩玩还有很多的东西需要学习。尝试下从不同的账户向不同的平行链发送代币。

