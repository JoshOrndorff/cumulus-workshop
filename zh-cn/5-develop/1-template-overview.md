# 平行链整理模板

对于[Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template) 熟悉的substrate开发者会对平行链模板也熟悉。
它们具有相同的一般结构，但具有`node`的特征，`runtime`和`pallets`目录。它们的运行时类似，并且功能相同
托盘。除了一些新特性外，货盘本身基本上是相同的。许多[Substrate devhub教程]（https://substrate.dev/tutorials/）可以很少使用
对顺链模板的修改。


这两个模板的相似性会给您自信，如果您创建了substrate链，那么创建平行链将对您而言没有问题！

## 节点模板的不同之处

但是，这两个模板之间有一些重要的区别，值得开始时了解。

### 平行链信息托盘

此货盘旨在将有关平行链注册的信息注入其自身运行。目前，它只是注入在其链上注册的旁链ID。这允许运行时知道哪些跨链消息适用于它。

### 信息代理托盘

该货盘负责将通过网络接收的跨链消息分发到他们打算用于的托盘。如果您打算接收跨链消息，则应使用这个托盘。

### `register_validate_block!` Macro

每个平行链必须向中继链提供一个“ validate_block”功能，表示为Wasm Blob。注册时，节点模板不提供此功能，但平行链模板可以提供。
多亏了cumulus，为Substrate运行时创建此函数就像添加一行内容一样简单。
运行时底部的代码：

```rust
cumulus_runtime::register_validate_block!(Block, Executive);
```

###无Aura 托盘

许多流行的Substrate运行时，例如Polkadot，都包含与共识有关的托盘和运行时API。节点模板具有Aura托盘及其关联的运行时“ AuraApi”。这些
都没有从平行链模板中丢失。

这是因为整理者以固定的时间间隔进行屏蔽，而不是使用更多复杂的共识引擎，例如Aura，Babe或PoW。未来这种创作行为将可能是可配置的，并且可能会重新引入运行时的这些部分。在这里追踪进度：


- https://github.com/paritytech/cumulus/issues/166
- https://github.com/paritytech/cumulus/issues/36
- https://github.com/paritytech/cumulus/issues/115
- https://github.com/paritytech/cumulus/issues/116

### 无 GRANDPA 托盘

许多流行的Substrate运行时（包括节点模板）都具有与终结性相关的GRANDPA托盘及其关联的“ GrandpaApi”。这些都没有从平行链模板中丢失。


这是因为平行链遵循中继链的终结性，而不是自己运行最终决定性小工具。这是Polkadot架构的基础，不会改变

### 服务


整理器的服务与节点模板的服务完全不同。虽然你可以找到相似之处在于，服务的结构有很大不同。这项新服务是主要变化cumulus所提供的。

> 修改现有的Substrate链以使用Cumulus时，通常最好复制模板上的服务代码。

## 使用模板

以下各节中的说明通过使用平行链进行了一些基本练习模板。它们可能以任何顺序被遵循，并且不会彼此依存。为了更彻底
有关底物开发的入门知识，请浏览[Substrate Developer Hub](https://substrate.dev).


这些说明假设您已经[在本地系统上编译了平行链模板]（../ 1-prep / 1-compiling.md）。如果还没有请回去做。

如果您是github使用者, 请从这里开始
[forking the parachain template](https://github.com/substrate-developer-hub/substrate-pallet-template),

