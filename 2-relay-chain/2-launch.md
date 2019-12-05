# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch the relay-chain.

## View Telemetry
We've launched a basic two-node network in preparation for this workshop. Before joining the network yourself, check out the [Telemetry Page](https://telemetry.polkadot.io/#list/Cumulus%20Testnet).

## Download the Chain Specification
By default your node will try to join the live Polkadot network. To make it join the correct network, save this [WorkshopRelayChainRaw.json](../WorkshopRelayChainRaw.json) chain spec file locally. https://raw.githubusercontent.com/JoshOrndorff/cumulus-workshop/master/WorkshopRelayChainRaw.json

## Start Your Node
```bash
./target/release/polkadot \
  --chain=WorkshopRelayChainRaw.json \
  --bootnodes --bootnodes /dns4/relaychain.bootnodes.net/tcp/30333/p2p/QmayQzZgh1t41b3ta5GSm6tKvV7gpWnBYfHrPAYh756vSH \
  --name MyNode
```

You must customize a few parameters in the command:

* Use the correct path to where you saved the chain spec file
* Choose a name you like for your node

When your node appears to be running, look back at the [Telemetry page](https://telemetry.polkadot.io/#list/Cumulus%20Testnet) and see if you can find it.

## Conenct Apps UI
To explore and interact with the network, you can use the Polkadot JS Apps UI.
* [UI for Alice's node](https://polkadot.js.org/apps/#/?rpc=wss://relaychain.bootnodes.net/alice)
* [UI for Bob's node](https://polkadot.js.org/apps/#/?rpc=wss://relaychain.bootnodes.net/bob)
* [UI for local node](https://polkadot.js.org/apps/#/?rpc=ws://127.0.0.1:9944)
  * (only works whe nrunning a local node)
  * (might not work in firefox)

<!--
## Get Staked
TODO In future iterations of the workshop, there should be a faucet or other means of gaining tokens, and participants should get staked to become actual validators on the relay chain, rather than just full nodes
-->
