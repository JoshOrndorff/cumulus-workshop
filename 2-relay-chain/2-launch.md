# Starting the Relay Chain

Before we can attach any cumulus-based parachains, we need to launch the relay-chain. This page
describes in details how to start both nodes in the two-validator `rococo-local.json` spec that
ships with this workshop as well as general instructions for starting additional nodes.

## Start Alice's Node

```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9944 \
  --port 30333 \
  --alice
```

The port and websocket port specified here are the defaults and thus those flags can be omitted.
However I've chosen to leave them in to enforce the habit of checking their values. Because Alice is
using the defaults, no other nodes on the relay chain or parachains can use these ports.

When the node starts you will see several log messages. Take note of one that looks as follows. This
lists Alice's Peer Id. We will need it when connecting other nodes to her.

```
Local node identity is: 12D3KooWLRPJAA6CrXP14FRJztzCh4JmgtRzKWpiBjL3BtseEfyv
```

### Connect Apps UI

To explore and interact with the network, you can use the Polkadot JS Apps UI. If you've started
this node using the command above, you can access the node as
https://polkadot.js.org/apps/#/?rpc=ws://localhost:9944

> Some browsers, notably Firefox, will not connect to a local node from an https website. An easy
> work around is to try another browser, like Chromium. Another option is to
> [host this interface locally](https://github.com/polkadot-js/apps#development).

> At time of writing, this demo works with the hosted version of Apps linked above. If something has
> changed in the meantime, try to
> [host the interface locally](https://github.com/polkadot-js/apps#development) using commit
> `28c3fb1`.

## Start Bob's Node

```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9955 \
  --port 30334 \
  --bob \
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID>
```

Bob's command is perfectly analogous to Alice's. It differs concretely from Alice's in that Bob has
specified his own base path, provided his own valiator keys (`--bob`), and used his own ports.
Finally he has added a `--bootnodes` flag. This bootnodes flag is not strictly necessary if you are
running the entire network on a single local system, but it is necessary when operating over the
network, so I've chosen to leave it in.

## Starting Additional Nodes (Optional)

> If you are using the `rococo-local.json` spec, you do not need to start additional nodes.

If you're using the `rococo-3.json` or `rococo-4.json` specs that ship with this workshop you will
need to start one or two more nodes. Again, this command is entirely analogous. You just need to
make sure that nodes on the same physical system do not have conflicting ports or base directories.

```bash
polkadot \
  --chain spec.json \
  --tmp \
  --ws-port 9966 \           # Any unused port
  --port 30335 \             # Any unused port
  --charlie \                # The appropriate key for your validator
  --bootnodes /ip4/<Alice IP>/tcp/30333/p2p/<Alice Peer ID> \
  --bootnodes /ip4/<Bob IP>/tcp/30334/p2p/<Bob Peer ID>
```

As before it is not necessary to specify the bootnodes if you are running on a local system. Further
it is never necessary to specify both bootnodes, although doing so may help the nodes peer faster.

If your custom chainspec has includes self-generated keys, see the
[Substrate private network tutorial](https://substrate.dev/docs/en/tutorials/start-a-private-network/customchain#add-keys-to-keystore)
for details on inserting these keys.
