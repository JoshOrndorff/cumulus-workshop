# Obtaining a (Relay) Chain Specification

You will need a chain specification for your relay chain network. You can use one that ships with
this workshop, or create your own. An important requirement to keep in mind is that you must always
have one more relay chain validator than you have connected parachains. For example, if you want to
connect two parachains, you need at least three validators in the relay chain.

Whichever spec you choose to use we will refer to it simply as `spec.json` in the upcoming
instructions. You will need to supply the proper path to the spec file you are using.

## The Specs in this Workshop Repo

This workshop contains three chain-spec files that you can use without modification:

<!-- for some reason these links can't be markdown. See https://github.com/substrate-developer-hub/cumulus-workshop/issues/16 -->

- <a href="specs/rococo-local.json" download>specs/rococo-local.json</a>: A two-validator relay
  chain with Alice and Bob as authorities. Useful for registering a single parachain. This is a
  direct export of the `rococo-local` spec that is included in polkadot.
- <a href="specs/rococo-3.json" download>specs/rococo-3.json</a>: A three-validator relay chain
  identical to `rococo-local` but with Charlie as a third validator.
- <a href="specs/rococo-4.json" download>specs/rococo-4.json</a>. A four-validator relay chain that
  adds Dave as a fourth validator.

These specs were created according to the steps in the next section. If you would like even more
validators, or to customize the relay chain in some other way, proceed to the final option.

> These specs are also present in the Polkadot docker image and can be used when running in Docker.

## Create Your Own

As with any Substrate chain, you can always create your own chain spec file. It is best to start
from an existing specification. We will use the built-in `rococo-local` as our starting point.

```bash
# Create the starting point that we will modify
polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo-custom-plain.json
```

That file contains most of the information we need already. Rococo is a Proof of Authority chain, so
we just need to add an authority and its session keys. Find the part of the part of the file shown
below, and modify it.

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

You will need to make these specific modifications. All the keys and addresses needed can be
generated using [subkey](https://substrate.dev/docs/en/knowledgebase/integrate/subkey).

1. Add your new authority's `AccountId` and `ValidatorId`.

In this runtime configuration, both IDs are the same and are generated from the "stash" account. You
can generate your own or inspect the well-known dev ids using subkey.

```bash
$ subkey -n polkadot inspect //Charlie//stash
Secret Key URI `//Charlie//stash` is account:
  Network ID/version: polkadot
  Secret seed:        0x66256c4e2f90e273bf387923a9a7860f2e9f47a1848d6263de512f7fb110fc08
  Public key (hex):   0x1e07379407fecc4b89eb7dbd287c2c781cfb1907a96947a3eb18e4f8e7198625
  Account ID:         0x1e07379407fecc4b89eb7dbd287c2c781cfb1907a96947a3eb18e4f8e7198625
  SS58 Address:       1gNafhMQMsZwntbSCUT1n8toPp6G8gDk7owaf9z7VXWQQM7
```

2. Add the grandpa session key (`ed25519` cryptography).

```bash
$ subkey -n polkadot -e inspect //Charlie
Secret Key URI `//Charlie` is account:
  Network ID/version: polkadot
  Secret seed:        0x072c02fa1409dc37e03a4ed01703d4a9e6bba9c228a49a00366e9630a97cba7c
  Public key (hex):   0x439660b36c6c03afafca027b910b4fecf99801834c62a5e6006f27d978de234f
  Account ID:         0x439660b36c6c03afafca027b910b4fecf99801834c62a5e6006f27d978de234f
  SS58 Address:       12Xct2dQgcnXSNa9Kpf9KRRDWuTfJijiJC2y33rHK2hNkmUE
```

3. Add the other session keys (`sr25519` cryptography).

```bash
$ subkey -n polkadot inspect //Charlie
Secret Key URI `//Charlie` is account:
  Network ID/version: polkadot
  Secret seed:        0xbc1ede780f784bb6991a585e4f6e61522c14e1cae6ad0895fb57b9a205a8f938
  Public key (hex):   0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22
  Account ID:         0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22
  SS58 Address:       14Gjs1TD93gnwEBfDMHoCgsuf1s2TVKUP6Z1qKmAZnZ8cW5q
```

4. The final change you should make is to delete the `forkBlocks` and `badBlocks` fields from the
   beginning. Remove these two lines:

```json
"forkBlocks": null,
"badBlocks": null,
```

> This fourth step should not be necessary, but it avoids parsing errors. See
> https://github.com/paritytech/cumulus/issues/126 for details.

Now that you've created your spec, you can generate the final raw spec file.

```bash
polkadot build-spec --chain rococo-custom-plain.json --raw --disable-default-bootnode > rococo-custom.json
```

> Your final spec _must_ start with the word `rococo` or the node will not know what runtime logic
> in include.

To learn more about the process we just completed and other things that can be configured, check out
these resources on understanding chain specs:

- https://substrate.dev/docs/en/tutorials/start-a-private-network/customspec#create-a-chain-specification
- https://substrate.dev/docs/en/knowledgebase/integrate/chain-spec
