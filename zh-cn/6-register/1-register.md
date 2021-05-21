# Rococo

Rococo是基于Cumulus的平行链，是Parity的官方测试网。


> **重要信息** 对于cumulus和 polkadot `rococo-v1` 分支，您 _必须_ 使用 _相同的_ 承诺
> 来创建您的平行链才能兼容！在连接到rocco之前，您 _必须_ 成功的在当地注册您的平行链！

** [Polkadot `rococo-v1` branch](https://github.com/paritytech/polkadot/tree/rococo-v1) **
** [Cumulus `rococo-v1` branch](https://github.com/paritytech/cumulus/tree/rococo-v1) **


该网路正在不断的发展中，因此如果您希望与网路连接，请期待您的平行链随rococo的变化而发展和更新。

加入 [rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io)向rococo团队提问和联系。 
## 编写您的平行链

您已经在[Parachain Template Overview](../5-develop/1-template-overview.md)和[Template Pallet](../5-develop/3-template-pallet.md)部分包含了这份材料。


## 索要ROC代币

Rococo测试网的本地货币标志是ROC。为了注册您的Rococo平行链，您需要一些ROC。被要求质押去注册平行链(当前是 1,000ROC)，而且您也需要一些额外的ROC为了支付交易费用。

为了可以在注册前体验Rococo, 并鼓励您的团队支持Rococo上的众筹，请不要使用主要的聊天室，请使用我们[rococo faucet channel] (https://matrix.to/#/#rococo-faucet:matrix.org) 来索要一些ROC代币。

因为您所需要的不仅仅是允许注册，请加入并在[rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io)提问。如果您让我们知道（并提供证据）证明您有一个平行链准备注册，Parity团队的成员会帮您设置



##  启动洛可可式验证器

为了在洛可可测试网络中注册平行链，我们要求您支持中央通过运行**至少一个Rococo验证器节点**来实现Rococo中继链。



###  启动验证器节点

这与我们已完成的[启动中继链]（en / 2-relay-chain / 1-launch）指南相同，但是使用指定的测试网Rococo并作为验证程序运行：

```bash
# Also set the flags needed for ports and expose
# them as needed for your setup. `--help` for more.
polkadot \
--chain rococo \
--validator \
--port 30333 \
--ws-port 9945 \
--rpc-port 9933 \
--wasm-execution=Compiled \
--name <your-node-name> # set a unique validator node name here
# --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \ # *optional* telemetry 
```

You will need to generate session keys for each of your Rococo validator nodes. To generate keys for
a node, use the `author.rotateKeys` RPC call. One way to invoke this RPC method is by using `curl`:
您需要给每个Rococo验证节点产生密钥。使用`author.rotateKeys` RPC call来产生密钥。调用此RPC方法的一种方法是使用`curl`：

```bash
# By default: localhost:9933
curl http://<validator address>:<HTTP port>\
  -H "Content-Type:application/json;charset=utf-8"\
  -d '{ "jsonrpc":"2.0", "id":1, "method":"author_rotateKeys" }'
```
_Output Example_:
```json
{
  "jsonrpc":"2.0",
  "result":"0xcd1e2d16bba602f5247b7e220ca15fc6e5ace0181c51aab510f16aeb358510cdfc9b39c84874e3b4025d29c3a23b4624cc4ea22335f431e3510f088f0514a64864da893bda27d6cdfa797f1d8a2e8cc4b49d90517587bbd215705e34fa1bac790825912435517e8cc7b107b71f4744411abb4740087c95415e712314e6dc2b4d9aa7c891718f08903018f8de983dd1648c98c85f4f7ba41a495a0d656acf9f6108aa481e5374203fc8a035ea9d94a62c5821a575e4515f74a799e60878765d04023bf989b976b5e2da7c42d76a03e4fd2aa4ccbdecc8237cdc3a887b2a97619d96",
  "id":1
}
```

这是您的_秘密钥匙_-保管好！默认情况下，它也在密钥库中: `~/.local/share/polkadot/chains/rococo_v1_5/keystore`

您还可以使用 [Polkadot JS Apps UI RPC app](https://polkadot.js.org/apps/#/rpc) 来调用
RPC 方法， 确认您与您的节点链接。 根据您的设置要求设置端口标志并公开。


提交对平行链注册的请求时，需要提供** ValidatorId **。为了生成ValidatorId，您必须从** session **托盘外部调用`SetKeys`。在“密钥”字段中，您将提供在上一步中生成的密钥。 证明字段将被忽略，因此您可以编写任何文本。

![session_keys](../../assets/img/session-keys.png)

The **AccountId** (address) that you used to make this call is going to become your **ValidatorId**.
您的** AccountId **（地址）将成为您的** ValidatorId **。 因此，您希望已经建立了一个帐户并有资金，
[request some ROC](en/6-register/1-register?id=request-roc-tokens) an account first via the faucet. 

## 注册一个 Parathread

All Parachains will need to Register as a "parathread" first. To do this, you need:
所有的平行链都需要先注册一个"parathread" ，您需要：

- 一个独特的`para_id` (之前没有注册过的,
  [check the listings](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/accounts))
  - 该整数_必须大于1000，因为对于系统副链，必须保留0-999！
- `initial_head_state`: your parachain's genesis state ([Same process as before](en/3-parachains/1-launch#generate-parachain-genesis-state))
- `validation_function`: the Wasm runtime for your parachain ([Same process as before](en/3-parachains/1-launch#obtain-wasm-runtime-validation-function))

在这里提要要求的领域
[apps UI here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/parathreads)

![register-parathread.png](../../assets/img/register-parathread.png)

If your extrinsic succeeds, you will see this in the explorer's block data:
如果外部成功，则将在资源管理器的块数据中看到以下内容：

![parathread-register-success.png](../../assets/img/parathread-register-success.png)

And that your parathread registration is *onboarding*:
您的parathread注册正在“开始”：

![parathread-onboarding.png](../../assets/img/parathread-onboarding.png)


> 提交这一数据后，需要“两个部分” ([如下](#relevant-values) 长度)

> 完全完备一个Parathread



## 平行链争名次

Parathead可以被选成平行链，其中PoV包含在中继链中保证为他们分配的时隙持续时间。系统平行链将绕过拍卖，但是所有正常的连锁店（包括您的连锁店）都需要赢得一次平行链老虎机拍卖才能获得！

只有完全配备的rococo parathreads才有资格参加rococo 平行链的名次竞争。

### 相关值

> 请注意，这些是示例值；一切可能会改变。

- 时间: 10分钟
- 租赁期: 1天 = 14400块
- 结束期: 60分钟 = 600块
- 当前租赁期指数=当前块编号/ 14400


>注意：从Para *到不同状态的所有转换将至少需要2个会话（入门，离线，升级，降级等）

### 投标


任何注册了“完备的平行链”的人都可以竞标获得其Para ID的平行链的机会。
假设此个人帐户的出价可以超过所有其他参与该出价的出价，则此操作可以独立完成名次竞争

通过[apps UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/auctions):

选择您的Para ID，您要出价的多少以及您要出价：

![parachain-bid.png](../../assets/img/parachain-bid.png)

### 众筹

如果您（或宁愿不）赢得单个帐户中拥有的ROC的名次竞争，则您必须获得rococo社区的支持，并开始进行众筹，支持者可以
借给他们他们的ROC拍卖！

#### 开始众筹

重要笔记：

- 您只能为您拥有/已注册的Para ID创建众筹。
- 众筹上限是您的众筹贷款可以收取的最大金额。就算您低于上限，只要您的价格是投标中最高的，您仍可以中标。
- Block截至是指您希望结束众包贷款的时间。如果您知道拍卖会在3天后开始，并持续5天，您可能希望将众筹贷款的期限设置为10天或类似的天数时间尺度。这样，您可以确定整个竞标过程中您的众筹活动都处于活跃状态
  过程。
-您不想将众筹时间设置得太长，否则您将锁定用户资金用于时间长了，他们可能不想参加。
-第一个位必须是您要竞标的第一个位。因此，如果当前拍卖是针对位置（3，4，5，6），您的第一个广告位可以至少为3。
-最后一个位置也必须在该范围内。
-只要您没有收到捐款，就可以取消众包贷款（如果您输入有误）。

![parachain-crowdloan.png](../../assets/img/parachain-crowdloan.png)

如果您的外部成功，您将获得：

![crowdloan-success.png](../../assets/img/crowdloan-success.png)

#### 给众筹捐款

拥有免费ROC余额并选择为您的众筹捐款的任何帐户，包括始于此众筹的相同帐户始于 
[the apps UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/crowdloan):

![crowdloan-contribute.png](../../assets/img/crowdloan-contribute.png)

在[rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io)上发布有关您的平行链，并集会支持让其他人借给您您需要赢得位置的资金。
