# Lateral Transfers

In order to perform these stpes, you must have two different parachains registered. In this writeup we will assume they are registered at IDs 99 and 100. If you have used different IDs modify these instructions accordingly.

## State of XCMP

Lateral Transfers will ultimately be accomplished via true XCMP with messages sent directly from one parachain to another. This is not yet implemented, but we can still make cross chain transfers relying on the Relay chain to deliver messages for us. The end result is the same, but we do not yet expect the same performance we'll get when true XCMP is available. For more details, see https://github.com/paritytech/polkadot/wiki/Cross-Chain-Message-(XCM)-format

## Depository Model

The cross chain transfers use a similar depository model as the upward and downward tranfers. However it does not allow a chain to mint tokens backed by tokens on sibling chains because the sibling chains cannot trust each other. That means in order to transfer tokens from chain 100 to chain 99, there must already be tokens owned by chain 100 in a depository on chain 99.

In my personal opinion this model does not make as much sense here, because there are not real-world circumstances that would lead chain 100 to have tokens on chain 99. This model may be re-visited in the future.

But the main thing we're interested in demonstrating here is that the mechanics work. Let's do the demo.

## Prefunding the Depository

Before we can transfer tokens from Alice's account on Chain 100 to her account on Chain 99, we must ensure that Chain 100 has some tokens in it's dedicated account on chain 99. We will do this by making a regular on transfer into the depository on chain 99. Each parachain has an account that acts as its depository, and you can learn the address of this account by watching the logs when your collator first starts up. The account for parachain 100 is `5Ec4AhP7HwJNrY2CxEcFSy1BuqAY3qxvCQCfoois983TTxDA`

You can learn your own parachain's depository address by looking for a log like this:
```
2020-06-23 08:43:35 Parachain Account: 5Ec4AhP7HwJNrY2CxEcFSy1BuqAY3qxvCQCfoois983TTxDA
```

> Protip, if this log is above the scroll for you, just kill your collator and restart it. It will produce the log message again.

Using a UI connected to Parachain 99 (the recipient) make a regular balance transfer from any account into the depository account.

`Extrinsics` -> `balances` -> `transfer`

dest: `5Ec4AhP7HwJNrY2CxEcFSy1BuqAY3qxvCQCfoois983TTxDA`
value: 1111

## Sending Tokens Sideways

On Parachain 100 (the source) Submit the extrinsic `tokenDealer` -> `transferTokensToParachainChain`.

para_id: 99
dest: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
amount: 123

Notice here that we are presented with a regular account id input for the destination. This should be revised to be an opaque remark field like the downward transfer was because the parachains should not assume that the same notion of account is used on either side.

## Confirming Receipt of Tokens

On parachain 99, look at the accounts tab. You should see the tokens transferred into Alice's account and out of parachain 100's depository.

<!-- I did not observe this to be the case. Should it be? If not tokens are burned on the sending side but not minted anywhere

You can also confirm that on parachain 100 (the source) the tokens have been added to the Parachain 99's (the destination) depository. (The address for parachain 99 is `5Ec4AhP76KFCLR6Q8c8XFnN7pCW7uV2o6gyrBCZJYq1VEhdT`)
-->
