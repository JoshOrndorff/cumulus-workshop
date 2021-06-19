# 您的中继链规格

您将需要一条中继链网络的链规范。您可以使用这个工作间的附带的工具，也可以创建您自己第工具。

需要记住的一个重要的要求是，您必须比连接的平行链至少多一个中继链的验证者节点。
例如，如果您想连接两条平行链，您就需要在中继链中至少有三个验证者节点。


不管您选择哪一种规范，我们都将在后面的说明中简称为 `chain-spec.json`。您将需要为正在使用的规范文件提供正确的路径。

您需要为适当的路径提供您正在使用的规范文件。 **These _conventionally_ live**
**in a `/res` folder that is published in your node's codebase for others to use**. 例如：

- Polkadot 包括  [these **relay chain** `chain-spec.json` files](https://github.com/paritytech/polkadot/tree/master/node/service/res)
- Cumulus 包括 [these **parachain** `chain-spec.json` files](https://github.com/paritytech/cumulus/tree/master/rococo-parachains/res)

> 如果您打算让其他人链接到您的网路，您必须链条规格必须有genesis Wasm 
> 您的在机网路需要可以让其他节点在开始时复制确切的文件。
> 这源于 [non-determinism](https://dev.to/gnunicorn/hunting-down-a-non-determinism-bug-in-our-rust-wasm-build-4fk1))
> Wasm的运行编译，将其包含在您的代码库中是最佳实践 

验证是否工作，我们建议您使用我们提供给您的[precompiled raw](#_1a-using-a-prebuilt-chain-spec) specifications 之一。如果您想自定义您的网路，切换到[create your chain spec](#_1b-create-your-own-chain-spec).
无论怎样，如果您使用**普通**链规格（可读），当开始您的节点时，您需要转换成SCALE编码的**raw** 链条规格来使用。切换到[conversion section](#_2-convert-to-raw-chain-spec) 去看如何做到这一点。


## 1.a) 使用预建链规范

这个工作间包含三个链规范文件，您可以不用修改就可以使用它们：

<!-- 由于某些原因，这些文件不能被编辑. 详见  https://github.com/substrate-developer-hub/cumulus-workshop/issues/16 -->

- <a href="shared/chainspecs/rococo-local.json" download>shared/chainspecs/rococo-local.json</a>: 由Alice和Bob作为一个具有两个验证者节点的中继链的权威节点。用于注册一个单个平行链。
这是`rococo-local`规范的直接输出被包含在polkadot中。
**[polkadot包括](https://github.com/paritytech/polkadot/tree/master/node/service/res).**
  - 普通链规格: <a href="shared/chainspecs/rococo-custom-plain.json" download>shared/chainspecs/rococo-custom-plain.json</a> 

- <a href="shared/chainspecs/rococo-3.json" download>shared/chainspecs/rococo-3.json</a>: 一个具有三个验证者节点的中继链与`rococo-local`相同，但是是以Charlie作为第三个验证者节点。
- 普通链条规格:  <a href="shared/chainspecs/rococo-custom-plain-3.json" download>shared/chainspecs/rococo-custom-plain-3.json</a> 

- <a href="shared/chainspecs/rococo-4.json" download>shared/chainspecs/rococo-4.json</a>. 一个具有四个验证者节点的中继链，增加了Dave作为第四个验证者节点。
- 普通链条规格: <a href="shared/chainspecs/rococo-custom-plain-4.json" download>shared/chainspecs/rococo-custom-plain-4.json</a> 


包含的所有 `*plain.json` 文件都用于以更易读和可修改的格式进行检查，该格式也可用于派生[新的自定义原始规范](#adjust-the-chain-spec)。

这些规范是根据下一节中的步骤创建的。如果你还想要更多
验证器，或以其他方式自定义中继链，请继续阅读，否则
**[启动您的中继链](en/2-relay-chain/1-launch)** 使用 **原始链规范文件**。

<!--> 这些规范也存在于 Polkadot docker 镜像中，可以在 Docker 中运行时使用。 -->

## 1.b) 创建属于您自己的

跟任何Substrate链一样，您总是可以创建自己的链规范文件。最好是从现有的规范开始。我们将使用内部构建好的`rococo-local`作为我们的出发点。


```bash
# 创建我们要将要修改的初始链规范文件
polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo-custom-plain.json
```

那个文件包含了我们已经需要的大部分的信息。Rococo是一个权威证明的链，所以我们只需要增加一个权限和它的会话密钥。查找下面显示的文件部分，并修改它。


```json
"palletSession": {
  "keys": [
    [
      "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",                           // <---- The Validator Authority (//Alice//stash)
      "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
      {
        "grandpa": "5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu",              // <---- The GRANDPA ed25519 session key (//Alice)
        "babe": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",                 // <---- The sr25519 session keys (//Alice)
        "im_online": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", 
        "para_validator": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        "para_assignment": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        "authority_discovery": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        "beefy": "KW39r9CJjAVzmkf9zQ4YDb2hqfAVGdRqn53eRqyruqpxAP5YL",               // <---- The BEEFY *encoded* ecdsa session keys (//Alice)
       }
    ],
  // -- snip -- ADD MORE KEYS HERE, following the same format
},
```


### 调整链条规格

#### 生成权限和会话密钥

添加您新权威的`AccountId`和`ValidatorId`。

在这个运行时配置中，两个IDs都是一样的，而且都是从“stash”账户生成的。您可以生成您自己的账户或检查【众所周知的发展成熟的账户】
(https://substrate.dev/docs/en/knowledgebase/integrate/subkey#well-known-keys).


一下命令显示了`palletSession`的第一部分是如何在规格文件中重新产生的。第二部分与`//Bob` and `//Bob//stash`相似。

> 所有钥匙和地址需要使用如下一种来产生：
> - The [`subkey` tool](https://substrate.dev/docs/en/knowledgebase/integrate/subkey) (BEEFY 键的 v2.0.1 及更高版本)
> - The `node key` 子命令. (这可以是基于最新基板的“polkadot”或“parachain-collat​​or”二进制文件)


`//Alice//stash`（`sr25519` 密码学）的 Polkadot **验证器权限** 地址：

Polkadot **validator authority** address for `//Alice//stash` (`sr25519` cryptography):

```bash
# 用任何基于基板的节点二进制文件替换 `node`，比如 `polkadot`
subkey inspect --scheme sr25519 --network substrate //Alice//stash

*Output:*
```
Secret Key URI `//Alice//stash` is account:
  Secret seed:       0x3c881bc4d45926680c64a7f9315eeda3dd287f8d598f3653d7c107799c5422b3
  Public key (hex):  0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f
  Public key (SS58): 5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY
  Account ID:        0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f
  SS58 Address:      5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY
```

添加一个grandpa会话密钥 (`ed25519`加密)。

```bash
subkey inspect --scheme ed25519 --network substrate //Alice
```
*Output:*
```
Secret Key URI `//Alice` is account:
  Secret seed:       0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a76909115
  Public key (hex):  0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee
  Public key (SS58): 5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu
  Account ID:        0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee
  SS58 Address:      5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu
```


3.添加其它会话密钥(`sr25519`加密)。

```bash
subkey inspect --scheme sr25519 --network substrate //Alice
```
*Output:*
```
Secret Key URI `//Alice` is account:
  Secret seed:       0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a
  Public key (hex):  0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Public key (SS58): 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
  Account ID:        0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  SS58 Address:      5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
```

4.最后 **encoded SS58** ecdsa BEEFY key:
```bash
subkey inspect --scheme ecdsa --network substrate //Alice
```
*Output:*
```
Secret Key URI `//Alice` is account:
  Secret seed:       0xcb6df9de1efca7a3998a8ead4e02159d5fa99c3e0d4fd6432667390bb4726854
  Public key (hex):  0x020a1091341fe5664bfa1782d5e04779689068c916b04cb365ec3153755684d9a1
  Public key (SS58): KW39r9CJjAVzmkf9zQ4YDb2hqfAVGdRqn53eRqyruqpxAP5YL
  Account ID:        0x01e552298e47454041ea31273b4b630c64c104e4514aa3643490b8aaca9cf8ed
  SS58 Address:      5C7C2Z5sWbytvHpuLTvzKunnnRwQxft1jiqrLD5rhucQ5S9X
```
注意BEEFY钥匙是 `公共钥匙 (SS58)` 与 `SS58 Address`中的
ECDSA 钥匙有所不同[见 如下](#ss58-encoding-of-key-vs-address)的原因).

> 天哪! 那么多钥匙! 想要知道“为什么或如何”，请见 
> [session keys](session-keys) 下方。

#### 将您的钥匙加入到 `custom-plain.json` 文档。


现在您已经有了您需要的所有钥匙，把它们附件到您的* 普通 *规范文件的`palletSession`部分

您可以产生新的ID或通过相同的步骤使用其它众所周知的账户。
您可以继续使用**raw** `chain-spec.json` files [上述提到的](#using-a-prebuilt-chain-spec).

---

### 2. 转换为原始链规格

创建规范后，您就可以生成最终的原始规范文件。

> 您的最终文件必须以 `rococo`开头，否则节点将无法认同 运行逻辑
>包括

```bash
polkadot build-spec --chain rococo-custom-plain.json --raw --disable-default-bootnode > rococo-custom.json
```


您可能会收到输出警告: `Took active validators from set with wrong size`.
生成的`chain-spec.json`仍将“完全稳定”，您可以安全地忽略它。

## 更多资源

**生产链**不需要在普通情况下添加此自定义会话密钥-因为这些
是从您的`chain-spec.rs`文件为您生成的，更简单，更具体。上面的练习是
之所以使用它，是因为在这种情况下，您必须重新编译您的节点_才能添加权限！
因此，如果您需要做的就是像我们所做的那样根据已知的基础链规范配置一些小事情，那么您将需要
在“ chain-spec.rs”中设置信息，并生成二进制文件，最后使用CLI生成
您的自定义链规格。

### 链条规格

要了解有关我们所做工作之外的更多事情以及可以配置的更多信息，请查看
这些有关了解链规范的资源：

- https://substrate.dev/docs/en/tutorials/start-a-private-network/customspec#create-a-chain-specification
- https://substrate.dev/docs/en/knowledgebase/integrate/chain-spec

### 会议钥匙

The [fn `impl_opaque_keys!`](https://github.com/paritytech/substrate/blob/master/primitives/runtime/src/traits.rs#L1186-L1321)
macro *implements* [`type Keys`](https://github.com/paritytech/substrate/blob/master/frame/session/src/lib.rs#L386)
that is [used in rococo](https://github.com/paritytech/polkadot/blob/master/runtime/rococo/src/lib.rs#L173-L183)
to actually [generate all the keys](https://github.com/paritytech/polkadot/blob/master/runtime/rococo/src/lib.rs#L1117-L1127).
This ingests the keys you set in your
[chain_spec.rs](https://github.com/paritytech/polkadot/blob/master/node/service/src/chain_spec.rs#L174-L192) 
file for you when you _compile your runtime_ based on what you configure 
[in this section](https://github.com/paritytech/polkadot/blob/master/node/service/src/chain_spec.rs#L656) of that file.

BEEFY钥匙是编码的, 这来源于 [polkadot launch CLI tool](https://github.com/paritytech/polkadot-launch/blob/89e9704c8addd7f4dffa7cc75236393fd8c80bab/src/spec.ts#L68) using the [@polkadot-js/util-crypto](https://github.com/polkadot-js/common/tree/master/packages/util-crypto) node package [here](https://github.com/polkadot-js/common/blob/e7e82443231b75b7a546b462a63385db82a57f36/packages/keyring/src/pair/index.ts#L115) as a [SS58 encoded key](https://substrate.dev/docs/en/knowledgebase/advanced/ss58-address-format) of the form:

```
base58encode ( concat ( <address-type>, <address>, <checksum> ) )
```

幸运的是，`subkey` 和 `node key` 子命令会为你生成这个！所以没必要
在这里不再担心细节。


#### SS58 钥匙编码 vs. 地址


如果是sr25519和ed25519加密，则帐户ID与公钥匹配，因此采用SS58编码
用户ID地址与SS58公钥编码相同。

如果是ECDSA，我们会用blake2公钥以获取地址（由于大小不同
33 VS 32字节），因此SS58编码是不同的。


公钥的默认Ser / De实现使用SS58编码，因此每次使用
编码形式的公共密钥，我们将需要SS58编码。一个值得注意的情况是
链规范JSON文件和会话密钥编码（最重要的是BEEFY）。