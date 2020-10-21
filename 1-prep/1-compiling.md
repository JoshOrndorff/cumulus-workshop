# Compilation

This workshop covers the entire process of launching a relay chain, connecting parachains,
transferring assets between chains, and developing your own parachain runtimes. Naturally, there
will be some significant compiling if you intend to build everything yourself. (Compiling the
Polkadot and parachain template nodes can be avoided if you prefer to use the Docker images.)

## Shortening the Workshop

If you intend to use this material for a live workshop you may shorten it by cutting steps off of
the end. If your workshop will not cover writing your own parachains, you may skip all the
compilation by using the provided docker images.

If you prefer to focus primarily on development in your workshop, you may also skip initial relay
chain setup by performing those steps yourself in preparation for the workshop or using the public
rococo testnet. See [Setting Up The Bootnode](../SettingUpTheBootnode.md) for notes on setting up a
cloud-based relay chain.

## Install Substrate Prerequisites

> You may skip this step if you will not develop your own runtimes, and prefer docker to locally
> built binaries.

The Substrate Developer Hub describes setting up a local development environment. Follow the
instructions at https://substrate.dev/docs/en/knowledgebase/getting-started/

> This workshop is known to work on Linux, MacOS, and Windows Subsystem for Linux. It is recommended
> you use one of those platforms. If you must build naively on Windows, try the DevHub's
> [Windows Setup Instructions](https://substrate.dev/docs/en/knowledgebase/getting-started/windows-users).
> Support for executing this workshop on Windows will be made on a best-effort basis, but no
> guarantees are made.

## Building a Relay Chain Node

> You may skip this step if you prefer to use docker to run nodes.

Clone the Polkadot repository, and build the node. We are using a specific commit for this workshop.
Perform these steps in your typical workspace directory.

```bash
# Clone the Polkadot Repository
git clone https://github.com/paritytech/polkadot.git

# Switch into the Polkadot directory
cd polkadot

# Checkout the proper commit
git checkout 93f0029

# Setup proper Rust version for compiling this workshop
rustup uninstall nightly
rustup install nightly-2020-10-06
rustup target add wasm32-unknown-unknown --toolchain nightly-2020-10-06

# Build the Relay Chain Node
cargo +nightly-2020-10-06 build --release

# Print the help page to ensure the node build correctly
./target/release/polkadot --help
```

If the help page prints, you have succeeded in building a Polkadot node.

For the rest of this workshop, when we need to run this binary we will refer to it simply as
`polkadot`. You may move the binary you just built to somewhere more convenient, or leave it where
it is. You will need to type its full path as appropriate.

## Building the Collator Template

> You may skip this step if you prefer to use docker to run nodes.

The Substrate DevHub team maintains a
[parachain template](https://github.com/substrate-developer-hub/substrate-parachain-template) (very
similar to the [node template](https://github.com/substrate-developer-hub/substrate-node-template))
that we will use to launch our first parachains and make cross-chain asset transfers. Later, we will
use it as a starting point for developing our own parachains. Perform these steps in your typical
workspace directory.

```bash
# Clone the Parachain Template
git clone https://github.com/substrate-developer-hub/substrate-parachain-template.git

# Switch into the Parachain Template directory
cd substrate-parachain-template

# Checkout the proper commit
git checkout 9506b93

# Build the parachain template collator
cargo build --release

# Print the help page to ensure the node built correctly
./target/release/parachain-collator --help
```

> Occasionally the build will fail with `error: package collision in the lockfile` In this case
> simply run the build command again and it will succeed. For more information, see
> https://github.com/paritytech/cumulus/issues/174

If the help page prints, you have succeeded in building a Cumulus-based parachain collator.

For the rest of this workshop when we need to run this binary we will refer to it simply as
`parachain-collator`. You may move the binary you just built to somewhere more convenient, or leave
it where it is. You will need to type its path as appropriate.

## Building Your Custom Parachain

> You must setup a local development environment and build the parachain template to complete this
> section of the workshop.

Your custom parachain will be based on the template we compiled above. Building it will look the
same, but you need to write your code before you can build it. We will repeat the build process in
that section of the workshop.

## Using the Docker Images

> You may skip this step if you have built the nodes locally

The two docker images available for this workshop run the exact same binaries that we described
building in the previous section.

- `joshyorndorff/cumulus-workshop-polkadot` is the relay chain node.
- `joshyorndorff/cumulus-workshop-parachain-collator` is the parachain node.

Because these containers will need to communicate with each other, you will need to handle
networking. [Networking in Docker](https://docs.docker.com/network/) is beyond the scope of this
tutorial, and there are many valid options. I'll briefly describe one simple option here that will
help many beginners get up and running fast.

"Host Networking" is the simplest technique and allows commands that look most similar to the ones
given in the workshop. It tells docker to run the nodes without isolating the containers; just like
if you were running local binaries.

```bash
# Instead of running
polkadot --my-args

# You should run
docker run --network host joshyorndorff/cumulus-workshop-polkadot --my-args
```

```bash
# Instead of running
parachain-collator --para-args -- --relay-args

# You should run
docker run --network host joshyorndorff/cumulus-workshop-parachain-collator --para-args -- --relay-args
```

Throughout this workshop when we need to run nodes we will refer to them simply as `polkadot` and
`parachain-collator`. You will need to transform these commands into appropriate docker commands.
