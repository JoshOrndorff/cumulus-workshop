# Substrate Cumulus 工作坊

通过 Cumulus 连接 Substrate 区块链到波卡。

在这个亲自动手的工作间，参与者们将开始一个类似波卡的中继链，注册平行链，实现跨链转账，以及通过使用 Cumulus 将他们自己的 Substrate 运行时逻辑转换成平行链。

##先决条件


在开始之前，您需要进行 ** substrate彻底检查** 并确保您的硬件可以构建和运行这组（资源密集型）软件。

### Substrate要求 


如果您_没有_任何以前的substrate经验，您可能不理解或
不能完成本教程。在继续之前，请完成以下教程：

- [创建您的第一个Substrate Chain](https://substrate.dev/docs/en/tutorials/create-your-first-substrate-chain/)
- [启动私有网络](https://substrate.dev/docs/en/tutorials/start-a-private-network/)

假设您已经了解这些涉及的所有步骤，我们将参考这些，并将您的机器配置为基于substrate代码库编译。

### 硬件要求

任何机器都可以_处理构建平行链模板，但这是一个 \_very* 资源密集型的过程！
我们建议在具有**不少于**的机器上运行这些构建：

- 16 GB 内存（建议 32）
- 4 个 CPU 内核（建议 8 个）
- 50 GB 的可用 HDD/SSD 空间

如果这里没有最小的 RAM，您很可能 ** 内存不足，导致 `SIGKILL` 错误！**
这通常发生在 `polkadot-service` 构建中 - 所以一定要*监控你的 RAM 使用情况*
（类似于 [htop](https://htop.dev/)）并注意开始使用交换。

如果你不能在这里使用最低限度的机器，你可以尝试一些交易时间更长的东西
限制 RAM 使用的次数。
- 使用更少的线程cargo 的`j` 标志== 用于构建的线程数。
  尝试使用比可用总量少的几个，并监控 RAM 使用情况。
- Cargo 的 
  [codegen units](<](https://doc.rust-lang.org/cargo/reference/profiles.html#codegen-units)>)
  功能进行更优化的构建，并使用更少的内存，但编译时间_更长_！

```bash
# 使用更少的代码生成单元
RUSTFLAGS="-C codegen-units=1" cargo build --release 
# 设置要编译的内核/线程数（用于在 rpi 3 上构建 cumulus/polkadot）
cargo build --release -j 1
```

尝试一种或两种方法一起使用，以换取有限 RAM 机器的时间。

> 最终`polkadot-service` 将不那么单一，但目前这是一个低优先级。
> 它为 polkadot 存储库中的_每个网络_ 构建一个节点。

## 软件的版本

目前，平行链与中继链的代码库_非常紧密地耦合_它们是
连接到。如果你想将你的 parachian 连接到一个正在运行的中继网络，比如
[rococo](https://wiki.polkadot.network/docs/en/build-parachains-rococo) 测试网络，你_必须_
确保您正在针对该中继链的完全相同的构建进行测试。

该工作间已经经过测试：

- **Polkadot @
  [`5d466006`](https://github.com/paritytech/polkadot/commit/5d46600684ff009fa691d399e0c865de4a1e0a81)**
- **平行链模版 @
  [`4c47b6e2`](https://github.com/substrate-developer-hub/substrate-parachain-template/commit/4c47b6e2b88bf23807be3325e0d798a8540a2e84)**
- **Polkadot JS Apps @
  [`23adf03b`](https://github.com/polkadot-js/apps/commit/23adf03b85ba2b9ae1090b9862ed04796e644cf4)**
  - _普遍而言
    [hosted Polkadot JS Apps](https://polkadot.js.org/apps/#/explorer) \_应该_管用. 如果你
    有问题，在此提交时自己构建和托管此 UI.


> 注意：您 ** 必须** 准确地使用这些提交，以确保您不会在平行链开发中遇到冲突
> 开发正在积极地在这些存储库的提交之间进行重大更改！

#### Polkadot 测试网兼容性

我们在 devhub 团队尽最大努力保持平行链模板和这个研讨会目前更新
随着 Polkadot 的最新版本。 **但不要假设是这种情况！**
在 [Rococo matrix 频道](https://matrix.to/#/#rococo:matrix.parity.io) 与我们联系时
发生重大更改和测试网重置。

＃＃ 学到更多

在官方阅读[平行链区块的路径](https://polkadot.network/the-path-of-a-parachain-block/)
波卡博客。

## 致谢与贡献

参考[致谢与贡献](acknowledgement-contribution.md)


## 执照

[MIT](LICENCE)

## 免责

**Cumulus 是仍在开发中的预发布软件。** 虽然本次研讨会力求有用，但材料
它涵盖了在 Cumulus 完全释放之前可能发生变化或破裂的情况。这里展示的任何东西都不能用于价值承载
区块链！
