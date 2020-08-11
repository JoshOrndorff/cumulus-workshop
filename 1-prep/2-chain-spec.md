# Obtaining a (Relay)  Chain Specification

You will need a chain specification for your relay chain network. There are three ways to obtain this spec, and you only need to do one. An important criteria to keep in mind is that you must always have one more relay chain validator than you have connected parachains. For example, if you want to connect two parachains, you need three validators in the relay chain.

Whichever spec you choose to use we will refer to it simply as `spec.json` in the upcoming instructions. You will need to supply the proper path to the spec file you are using.

## The `rococo-local` Spec

The Polkadot project itself contains a built-in spec for a minimal relay chain called `rococo-local`. This spec provides for two validators, Alice and Bob. If you only want to test a single parachain, this is the fastest and easiest way to start. If you want to connect multiple parachains, you will need more validators, so continue to the next option.

## The Specs in this Workshop Repo

This workshop contains chain-spec files at `specs/rococo-3.json`, and `specs/rococo-4.json`. The `rococo-3.json` adds Charlie as a third validator and `rococo-r.json` adds Dave as a fourth. You may use these specs to register more parachains or experiment with more validators.

These specs were created according to the steps in the next section. If you would like even more validators, or to customize the relay chain in some other way, proceed to the final option.

> These specs are also present in the Polkadot docker image and can be used when running in Docker.

## Create Your Own

As with any Substrate chain, you can always create your own chain spec file. It is best to start from an existing specification. We will use the built-in `rococo-local` as our starting point.

```bash
# Create the starting point that we will modify
polkadot build-spec --chain rococo-local > plain-spec.json
```

That file contains most of the information we need already. We just need to add an authority. Find the part of the part of the file shown below, and modify it. We will be adding validators by using the same account for stash and controller. This is not how you should manage your funds on a live network, but it works fine for this experiment. You will need to make these specific modifications.

1. Increase the validator count.
2. Add your stash account as an invulnerable.
3. Add your account as a staker. The four values in the list are
  * Stash Account
  * Controller Account
  * Stake
  * Role
4. Add your account's session keys.
  * The first two lines are both the stash address
  * The grandpa key is ed25519
  * The other keys are all sr25519

```json
"staking": {
	"historyDepth": 84,
	"validatorCount": 2,
	"minimumValidatorCount": 1,
	"invulnerables": [
		"5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
		"5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc"
	],
	"forceEra": "NotForcing",
	"slashRewardFraction": 100000000,
	"canceledPayout": 0,
	"stakers": [
		[
			"5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
			"5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
			100000000000000,
			"Validator"
		],
		[
			"5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc",
			"5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
			100000000000000,
			"Validator"
		]
	]
},
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

The final change you need to make is to delete the `forkBlocks` and `badBlocks` fields. I'm not sure why this is necessary, but it avoids parsing errors. See https://github.com/paritytech/cumulus/issues/126. Remove these two lines:

```json
"forkBlocks": null,
"badBlocks": null,
```

Now that you've created your spec, you need to convert it to a raw spec file.
```bash
polkadot build-spec --chain plain-spec.json --raw --disable-default-bootnode > spec.json
```

To learn more about the process we just completed and other things that can be configured, check out these resources on understanding chain specs:
* https://substrate.dev/docs/en/tutorials/start-a-private-network/customspec#create-a-chain-specification
* https://substrate.dev/docs/en/knowledgebase/integrate/chain-spec
