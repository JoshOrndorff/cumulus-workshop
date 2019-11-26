# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch the relay-chain. We've launched a basic two-node network in preparation for this workshop. Before joining the network yourself, check out the [Telemetry Page](). If you're [prepared]() to validate, begin these steps to join the network.


## Download the Chain Spec file
By default your node will try to join the live Polkadot network (TODO Factcheck). To make it join the correct network, download the [WorkshopRelayChainRaw.json](WorkshopRelayChainRaw.json) chain spec file.
```bash
TODO should we put a curl command here?
pro: more likely to download the file into the pwd
con: do most OSes come with curl?
```

[WorkshopRelayChain.json]()

## Start Your Node
```bash
./target/release/polkadot \
  --chain=WorkshopRelayChainRaw.json \
  --name
```

You will need to customize a few of the parameters in the previous command:

* Use the correct path to where you saved

Check back to telemetry

Optional: Conenct Apps UI

Optional: Get Staked
