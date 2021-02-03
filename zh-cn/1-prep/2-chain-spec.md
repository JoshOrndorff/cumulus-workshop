# 获取一条 (中继) 链规范

您将需要一条中继链网络的链规范。您可以使用这个工作间的附带的工具，也可以创建您自己第工具。需要记住的一个重要的要求是，您必须比连接的平行链至少多一个中继链的验证者节点。
例如，如果您想连接两条平行链，您就需要在中继链中至少有三个验证者节点。


不管您选择哪一种规范，我们都将在后面的说明中简称为 `spec.json`。您将需要为正在使用的规范文件提供正确的路径。


## 这个工作间的规范文件

这个工作间包含三个链规范文件，您可以不用修改就可以使用它们：

<!-- 由于某些原因，这些文件不能被编辑. 详见 https://github.com/substrate-developer-hub/cumulus-workshop/issues/16 -->

- <a href="shared/chainspecs/rococo-local.json" download>shared/chainspecs/rococo-local.json</a>: 由Alice和Bob作为一个具有两个验证者节点的中继链的权威节点。用于注册一个单个平行链。
这是`rococo-local`规范的直接输出被包含在polkadot中。
- <a href="shared/chainspecs/rococo-3.json" download>shared/chainspecs/rococo-3.json</a>: 一个具有三个验证者节点的中继链与`rococo-local`相同，但是是以Charlie作为第三个验证者节点。
- <a href="shared/chainspecs/rococo-4.json" download>shared/chainspecs/rococo-4.json</a>. 一个具有四个验证者节点的中继链，增加了Dave作为第四个验证者节点。

这些规范是根据下一节中的步骤创建的。如果您想要更多的验证者节点，或者以其它一些方式去定义中继链，请进入最后一个选项。

> 这些规范也出现在 Plokadot docker 镜像中，并且也可以在运行Docker时被使用。

## 创建属于您自己的

跟任何Substrate链一样，您总是可以创建自己的链规范文件。最好是从现有的规范开始。我们将使用内部构建好的`rococo-local`作为我们的出发点。


```bash
# 创建我们要将要修改的初始链规范文件
polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo-custom-plain.json
```

那个文件包含了我们已经需要的大部分的信息。Rococo是一个权威证明的链，所以我们只需要增加一个权限和它的会话密钥。查找下面显示的文件部分，并修改它。


```json
"session": {
	"keys": [
		[
			"5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
			"5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
			{
				"grandpa": "5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu",
				"babe": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
				"im_online": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
				"parachain_validator": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
				"authority_discovery": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
			}
		],
		[
			"5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
			"5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
			{
				"grandpa": "5GoNkf6WdbxCFnPdAnYYQyCjAKPJgLNxXwPjwTh6DGg6gN3E",
				"babe": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
				"im_online": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
				"parachain_validator": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
				"authority_discovery": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
			}
		]
	]
},
```

您将需要进行这些具体的修改。所有的建和地址东可以通过[subkey](https://substrate.dev/docs/en/knowledgebase/integrate/subkey)被生成。


1.添加您新权威的`AccountId`和`ValidatorId`。

在这个运行时配置中，两个IDs都是一样的，而且都是从“stash”账户生成的。您可以使用subkey去生成您自己的或检查众所周知的dev ids。


```bash
$ subkey -n polkadot inspect //Charlie//stash
Secret Key URI `//Charlie//stash` is account:
  Network ID/version: polkadot
  Secret seed:        0x66256c4e2f90e273bf387923a9a7860f2e9f47a1848d6263de512f7fb110fc08
  Public key (hex):   0x1e07379407fecc4b89eb7dbd287c2c781cfb1907a96947a3eb18e4f8e7198625
  Account ID:         0x1e07379407fecc4b89eb7dbd287c2c781cfb1907a96947a3eb18e4f8e7198625
  SS58 Address:       1gNafhMQMsZwntbSCUT1n8toPp6G8gDk7owaf9z7VXWQQM7
```

2.添加一个grandpa会话密钥 (`ed25519`加密)。

```bash
$ subkey -n polkadot -e inspect //Charlie
Secret Key URI `//Charlie` is account:
  Network ID/version: polkadot
  Secret seed:        0x072c02fa1409dc37e03a4ed01703d4a9e6bba9c228a49a00366e9630a97cba7c
  Public key (hex):   0x439660b36c6c03afafca027b910b4fecf99801834c62a5e6006f27d978de234f
  Account ID:         0x439660b36c6c03afafca027b910b4fecf99801834c62a5e6006f27d978de234f
  SS58 Address:       12Xct2dQgcnXSNa9Kpf9KRRDWuTfJijiJC2y33rHK2hNkmUE
```

3.添加其它会话密钥(`sr25519`加密)。

```bash
$ subkey -n polkadot inspect //Charlie
Secret Key URI `//Charlie` is account:
  Network ID/version: polkadot
  Secret seed:        0xbc1ede780f784bb6991a585e4f6e61522c14e1cae6ad0895fb57b9a205a8f938
  Public key (hex):   0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22
  Account ID:         0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22
  SS58 Address:       14Gjs1TD93gnwEBfDMHoCgsuf1s2TVKUP6Z1qKmAZnZ8cW5q
```

4.最后的修改您需要做的是从最开始删除`forkBlocks`和`badBlocks`字段。删除这两行：


```json
"forkBlocks": null,
"badBlocks": null,
```

> 这第四步不是必须的，但是它避免了解析错误。详情请参阅https://github.com/paritytech/cumulus/issues/126 for details。


现在您已经创建了您自己的规范，您可以生成最终的 raw spec文件了。


```bash
polkadot build-spec --chain rococo-custom-plain.json --raw --disable-default-bootnode > rococo-custom.json
```

> 您最终的规范必须是以rococo开头的，否则节点将不知道其中包含的运行时逻辑。

要学习更多我们刚刚完成的过程以及其它可以配置的东西，请查看理解链规范的这些资源：

- https://substrate.dev/docs/en/tutorials/start-a-private-network/customspec#create-a-chain-specification
- https://substrate.dev/docs/en/knowledgebase/integrate/chain-spec
