# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch the relay-chain. We've launched a basic two-node network in preparation for this workshop. Before joining the network yourself, check out the [Telemetry Page](https://telemetry.polkadot.io/#list/Cumulus%20Relay). If you're prepared to validate, begin these steps to join the network.

## Download the Chain Spec file
By default your node will try to join the live Polkadot network (TODO Factcheck). To make it join the correct network, save this [WorkshopRelayChainRaw.json](https://raw.githubusercontent.com/JoshOrndorff/cumulus-workshop/master/WorkshopRelayChainRaw.json) chain spec file.

[WorkshopRelayChainRaw.json](https://raw.githubusercontent.com/JoshOrndorff/cumulus-workshop/master/WorkshopRelayChainRaw.json)

## Start Your Node
```bash
./target/release/polkadot \
  --chain=WorkshopRelayChainRaw.json \
  --name MyNode
```

You will need to customize a few of the parameters in the previous command:

* Use the correct path to where you saved the chain spec file
* Choose a name you like for your node

When your node appears to be running, look back at the [Telemetry page](https://telemetry.polkadot.io/#list/Cumulus%20Relay) and see if you can find it.

Optional: Conenct Apps UI
TODO

Optional: Get Staked
TODO
