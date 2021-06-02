# Substrate Cumulus 工作坊

通过 Cumulus 连接 Substrate 区块链到波卡。

在这个亲自动手的工作间，参与者们将开始一个类似波卡的中继链，注册平行链，实现跨链转账，以及通过使用 Cumulus 将他们自己的 Substrate 运行时逻辑转换成平行链。

## 先决条件

在开始之前，您需要进行 **Substrate 彻底检查** 并确保您的硬件可以构建和运行这组（资源密集型）软件。

### Substrate 运行要求

如果您 _没有_ 任何以前的 Substrate 经验，您可能不理解或
不能完成本教程。在继续之前，请完成以下教程：

- [创建您的第一个Substrate Chain](https://substrate.dev/docs/en/tutorials/create-your-first-substrate-chain/)
- [启动私有网络](https://substrate.dev/docs/en/tutorials/start-a-private-network/)

假设您已经了解这些涉及的所有步骤，我们将参考这些，并将您的机器配置为基于substrate代码库编译。

### 硬件要求

任何机器都可以处理构建平行链模板，但这是一个 _非常_ 资源密集型的过程！
我们建议在具有**不少于**的机器上运行这些构建：
- 16 GB 内存（建议 32）
- 4 个 CPU 内核（建议 8 个）
- 50 GB 的可用 HDD/SSD 空间

如果这里没有最少的 RAM 數量，您很可能 **内存不足，导致有 `SIGKILL` 報错！**
这通常发生在 `polkadot-service` 构建中 - 所以一定要*监控你的 RAM 使用情况*
（类似于 [htop](https://htop.dev/)）并注意开始使用交换。

如果你不能在这里使用最低限度的机器，你可以尝试一些交易时间更长的东西
限制 RAM 使用的次数。
- 使用更少的线程cargo 的`j` 标志== 用于构建的线程数。
  尝试使用比可用总量少的几个，并监控 RAM 使用情况。
- Cargo 的 [codegen units](](https://doc.rust-lang.org/cargo/reference/profiles.html#codegen-units))
  功能进行更优化的构建，并使用更少的内存，但编译时间_更长_！

```bash
# 使用更少的代码生成单元
RUSTFLAGS="-C codegen-units=1" cargo build --release 
# 设置要编译的内核/线程数（用于在 rpi 3 上构建 cumulus/polkadot）
货物构建 --release -j 1
```

尝试一种或两种方法一起使用，以换取有限 RAM 机器的时间。

> 最终`polkadot-service` 将不那么单一，但目前这是一个低优先级。
> 它为 polkadot 存储库中的_每个网络_ 构建一个节点。

## 软件版本

目前，平行链与中继链的代码库是 _非常紧密地耦合_ 的。如果你想将你的平行链 连接到一个正在运行的中继网络，比如
[rococo](https://wiki.polkadot.network/docs/en/build-parachains-rococo) 测试网络，你 _必须_ 确保您正在针对该中继链的完全相同的构建进行测试。

该工作间已经经过测试：
- **Polkadot @ [`127eb17a`](https://github.com/paritytech/polkadot/commit/127eb17a25bbe2a9f2731ff11a65d7f8170f2373)**
- **Parachain Template @ [`1e1e725`](https://github.com/substrate-developer-hub/substrate-parachain-template/commit/1e1e7257e4429e8413f5a27940d4941d220317a7)**
- **Polkadot JS Apps @ [`35b238a `](https://github.com/polkadot-js/apps/commit/35b238a1bfb59a4c4e7488671a7261b54bf314c9)**
    - _It is generally expected that the [hosted Polkadot JS Apps](https://polkadot.js.org/apps/#/explorer)
      _should_ work. 如果您有问题，请在此提交时自己构建和托管此 UI。


> 注意：由於平行鏈開發在如火如荼的進行著，經常出現最新版本不兼容舊版本情況，請 **必须**
> 使用这些提交版本，以确保您不会在平行链开发中遇到冲突。
