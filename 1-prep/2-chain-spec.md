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
we just need to add an authority and its session keys. The snippet below shows the relevant part of the generated spec file. All keys in the generated file belong to the usual well known accounts used in other tutorials. 

```json
"session": {
  "keys": [
    [
      "15Jbynf3EcRqdHV1K14LXYh7PQFTbp5wiXfrc4kbMReR9KxA", 
      "15Jbynf3EcRqdHV1K14LXYh7PQFTbp5wiXfrc4kbMReR9KxA",
      {
	"grandpa": "146SvjUZXoMaemdeiecyxgALeYMm8ZWh1yrGo8RtpoPfe7WL",
	"babe": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
	"im_online": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
	"parachain_validator": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5",
	"authority_discovery": "15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5"
      }
    ],
    [
      "16kZJGPJ37uYxjs7adswyEHbPYeHS9jQHSaSUJhkfvWPcoeF",
      "16kZJGPJ37uYxjs7adswyEHbPYeHS9jQHSaSUJhkfvWPcoeF",
      {
	"grandpa": "15jftzMaVPDfhKQ98RbYZ82t1wNxNdw6cS8E6kgSmMhcrxVz",
	"babe": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3",
	"im_online": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3",
	"parachain_validator": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3",
	"authority_discovery": "14E5nqKAp3oAJcmzgZhUD2RcptBeUBScxKHgJKU4HPNcKVf3"
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

The following subkey commands demonstrate how the first part of the `session` section inside the spec file ccan be reproduced. The second part is obtained similarly with //Bob and //Bob//stash

Polkadot address for //Alice//stash (`sr25519` cryptography)
```bash
$ subkey inspect --scheme sr25519 --network polkadot //Alice//stash
Secret Key URI `//Alice//stash` is account:
  Secret seed:      0x3c881bc4d45926680c64a7f9315eeda3dd287f8d598f3653d7c107799c5422b3
  Public key (hex): 0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f
  Account ID:       0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f
  SS58 Address:     15Jbynf3EcRqdHV1K14LXYh7PQFTbp5wiXfrc4kbMReR9KxA
```

Polkadot grandpa session key for //Alice (`ed25519` cryptography).
```bash
$ subkey inspect --scheme ed25519 --network polkadot //Alice
Secret Key URI `//Alice` is account:
  Secret seed:      0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a76909115
  Public key (hex): 0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee
  Account ID:       0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee
  SS58 Address:     146SvjUZXoMaemdeiecyxgALeYMm8ZWh1yrGo8RtpoPfe7WL
```

Polkadot address for //Alice (`sr25519` cryptography)
```bash
$ subkey inspect --scheme sr25519 --network polkadot //Alice
Secret Key URI `//Alice` is account:
  Secret seed:      0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a
  Public key (hex): 0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  Account ID:       0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d
  SS58 Address:     15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5
```

Add at least one more entry like this. You can either create new IDs or use other well known accounts. You can also proceed with the `spec.json` files mentioned above that include Charlie and Dave. 

2. The final change you should make is to delete the `forkBlocks` and `badBlocks` fields from the
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
