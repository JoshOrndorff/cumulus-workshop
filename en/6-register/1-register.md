# Rococo

Rococo is Parity's official test network for cumulus-based parachains.

> **IMPORTANT NOTE:** you _must_ use the _same_ commit for cumulus and polkadot `rococo-v1` branch
> to build your parachain against to be compatible!!! You _must_ test locally registering your
> parachain successfully before you attempt to connect to rococo!

** [Polkadot `rococo-v1` branch](https://github.com/paritytech/polkadot/tree/rococo-v1) **
** [Cumulus `rococo-v1` branch](https://github.com/paritytech/cumulus/tree/rococo-v1) **

This network is under _constant development_ - so expect to need to follow progress and update
your parachains in lock step with the rococo changes if you wish to connect to the network.

Do join the [rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io) to ask questions and connect
with the rococo teams.

## Request ROC Tokens

The symbol for the Rococo test network's native currency is ROC. You will need some ROC in order to
register your Rococo parachain. There is a deposit required to register a parachain (currently 1,000
ROC) and you will also need some additional ROC in order pay transaction fees. 

To experiment on Rococo _before_ you need to register, and to encourage your team as supporters in
things like crowdloans on Rococo, do **not** use the main chat, instead, _Please_ use our
[rococo faucet channel](https://matrix.to/#/#rococo-faucet:matrix.org) to request a few ROC tokens.

As you will need more than the faucet practically allows for to register, please join and ask in
the [rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io), one of the Parity team
will get you setup if you let us know (with some proof) that you have a parachain ready to register.

## Launch Rococo Validators

In order to register a parachain with the Rococo test network, we require you to support the central
Rococo relay chain by running **at least one Rococo validator node**.


### Launch the Validator Node

This is identical to the [Launch Relay Chain](en/2-relay-chain/1-launch) guide we have completed 
already, but with the testnet Rococo specified and running as a validator:

```bash
# Also set the flags needed for ports and expose
# them as needed for your setup. `--help` for more.
polkadot \
--chain rococo \
--validator \
--port 30333 \
--ws-port 9945 \
--rpc-port 9933 \
--name <your-node-name> # set a unique validator node name here
# --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \ # *optional* telemetry 
```

You will need to generate session keys for each of your Rococo validator nodes. To generate keys for
a node, use the `author.rotateKeys` RPC call. One way to invoke this RPC method is by using `curl`:

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

This is your _secret key_ - keep it safe! It is also in the keystore, by default: `~/.local/share/polkadot/chains/rococo_v1_5/keystore`

You can also use the [Polkadot JS Apps UI RPC app](https://polkadot.js.org/apps/#/rpc) to invoke the
RPC method, just make sure you are connected to _your_ node, setting the flags for ports and exposing
them as required for your setup.

You need to provide the **ValidatorId** when you submit your request for parachain registration.
In order to generate a ValidatorId, you must call the `SetKeys` extrinsic from the **session** pallet.
In the **keys** field you will provide the keys generated in the previous step.
The **proof** field will be ignored so you can write any text you want.

![session_keys](../../assets/img/session-keys.png)

The **AccountId** (address) that you used to make this call is going to become your **ValidatorId**.
Thus you want to have an account setup and funded already, so
[request some ROC](en/6-register/1-register?id=request-roc-tokens) an account first via the faucet. 

## Register as a Parathread

All Parachains will need to Register as a "parathread" first. To do this, you need:

- A _unique_ `para_id` (one that has not been previously registered,
  [check the listings](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/accounts))
  - This integer _must_ be greater than `1000`, as `0-999` are _reserved_ for systems parachains!
- `initial_head_state`: your parachain's genesis state ([Same process as before](en/3-parachains/1-launch#generate-parachain-genesis-state))
- `validation_function`: the Wasm runtime for your parachain ([Same process as before](en/3-parachains/1-launch#obtain-wasm-runtime-validation-function))

Submit the required fields in the 
[apps UI here](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/parathreads)

![register-parathread.png](../../assets/img/register-parathread.png)

If your extrinsic succeeds, you will see this in the explorer's block data:

![parathread-register-success.png](../../assets/img/parathread-register-success.png)

And that your parathread registration is *onboarding*:

![parathread-onboarding.png](../../assets/img/parathread-onboarding.png)


> After submission of this data, it will take **2 sessions** ([see below](#relevant-values) for length)
> for the candidate to fully onboard to a Parathread.


## Parachain Slot Auction

Paratheads can elect to become parachains, where their PoV inclusion in the relay chain is 
guaranteed for the slot duration they are alloted. Systems parachains will bypass auctions, but 
all normal chains (including yours) will need to win a parachain slot auction to get one!

> Only fully onboarded rococo parathreads are eligible to bid in a rococo parachain slot auction. 

### Relevant Values

> Note that these are example values; all are subject to change.

- Session length: 10 min
- Lease Period Length: 1 Day = 14400 Blocks
- Ending Period: 60 Min = 600 Blocks
- Current Lease Period Index = Current Block Number / 14400

> Note: All transitions of a Para* into different states will take at least 2 sessions (onboarding,
> offboarding, upgrading, downgrading, etc.)

### Bidding

Anyone with a **fully onboarded parachain** registered can make a bid to win a parachain slot for their Para ID.
This can be done independently, assuming this individual account can out-bid all others participating in the
slot auction.
Do so via the [apps UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/auctions):

Pick your Para ID, how much you want to bid, and the slots you want to bid for:

![parachain-bid.png](../../assets/img/parachain-bid.png)

### Crowdloans

If you _cannot_ (or would rather not) win a slot with the ROCs you have in a single account, you 
must gather the support of the Rococo community and start a crowdloan that your supporters can
loan you their ROC to win the auction!

#### Start a Crowdloan

Important notes:

- You can only create a crowdloan for a Para ID that you own / have registered.
- The crowdfund cap is the MAXIMUM amount your crowdloan can collect. You can still win a bid if you
  have less than your maximum, as long as your bid is the best in the auction.
- Ending Block is when you want your crowdloan to end. If you know an auction will start in 3 days,
  and will last for 5 days, you probably want to set your crowdloan to end in 10 days, or a similar
  timescale. This way you will be sure that your crowdloan is active during the entire auction
  process.
- You don't want to set your crowdloan to be too long, or else you will lock up users funds for a
  long time and they may not want to participate.
- The first slot must be the first slot you want to bid for. So if the current auction is for slots
  (3, 4, 5, 6), your first slot can be at least 3.
- Last slot must be with within that range too.
- You can cancel a crowdloan (if you made a mistake), as long as you did not receive a contribution.

![parachain-crowdloan.png](../../assets/img/parachain-crowdloan.png)

If your extrinsic succeeds, you will get:

![crowdloan-success.png](../../assets/img/crowdloan-success.png)

#### Fund a Crowdloan

Any Account with a free ROC ballance and elect to contribute to your crowdloan, including the 
same account that started this crowdloan to begin with from 
[the apps UI](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frococo-rpc.polkadot.io#/parachains/crowdloan):

![crowdloan-contribute.png](../../assets/img/crowdloan-contribute.png)

Spread the word on the [rococo matrix chat room](https://matrix.to/#/#rococo:matrix.parity.io) about
your parachain, and rally support to have others loan you the funds you need to win a slot!