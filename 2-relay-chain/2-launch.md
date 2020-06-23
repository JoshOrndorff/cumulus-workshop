# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch the relay-chain. This page describes in details how to start all the nodes in the two-validator spec that ships with cumulus as well as the three-validator spec that ships with this repository. If you have generated a custom chain spec these instructions will need to be modified accordingly.

## Start Alice's Node
```bash
polkadot \
  --chain spec.json \
  --base-path /tmp/alice \
  --ws-port 9944 \
  --port 30333 \
  --alice
```

The port and websocket part specified here are the defaults and thus those flags can be omitted. However I've chosen to leave them in the enforce the habit of checking their values. Because Alice is using the defaults, no other nodes on the relay chain or parachains can use these ports.

When the node starts you will see several log messages. Take note of one that looks as follows. This lists Alice's Peer Id. We will need it when connecting other nodes to her.
```
Local node identity is: 12D3KooWLRPJAA6CrXP14FRJztzCh4JmgtRzKWpiBjL3BtseEfyv
```

### Conenct Apps UI
To explore and interact with the network, you can use the Polkadot JS Apps UI. If you've started this node using the command above, you can access the node as https://polkadot.js.org/apps/#/?rpc=ws://localhost:9944

> Some browsers, notably Firefox, will not connect to a local node from an https website. An easy work around is to try another browser, like Chromium. Another option is to [host this interface locally](https://github.com/polkadot-js/apps#development).

## Start Bob's Node

```bash
polkadot \
  --chain spec.json \
  --base-path /tmp/bob \
  --ws-port 9955 \
  --port 30334 \
  --bob \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID>
```

Bob's command is perfectly analogous to Alice's. It differs concretely from Alice's in that Bob has specified his own base path, provided his own valiator keys (`--bob`), and used his own ports. Finally he has added a `--bootnodes` flag. This bootnodes flag is not strictly necessary if you are running the entire network on a single local system, but it is necessary when operating over the network, so I've chosen to leave it in.

## Starting Charlie's Node (Optional)

If you are using the two-node spec that ships with cumulus, you do not need to start Charlie's node. If you are using the three-node spec that ships with this workshop, and plan to register more than one parachain, you do need to start Charlie's node. It is, again, perfectly analogous.

```bash
polkadot \
  --chain spec.json \
  --base-path /tmp/charlie \
  --ws-port 9966 \
  --port 30335 \
  --charlie \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
  --bootnodes /ip4/<Bob IP>/tcp/30334/p2p/<Bob Peer ID>
```

As before it is not necessary to specify the bootnodes if you are running on a local system. Further it is never necessary to specify both bootnodes, although doing so may help the nodes peer faster.
