# Compilation

This workshop covers the entire process of launching a relay chain, connecting parachains,
transferring assets between chains, and developing your own parachain runtimes. Naturally, there
will be some significant compiling if you intend to build everything yourself. (Compiling the
Polkadot and parachain template nodes can be avoided if you prefer to use the Docker images.)

## Install Substrate Prerequisites

The Substrate Developer Hub describes setting up a local development environment. Follow the
instructions at https://substrate.dev/docs/en/knowledgebase/getting-started/

## Building a Relay Chain Node

Clone the Polkadot repository, and build the node. We are using a
[specific commit](/#versions-of-software) for this workshop. Perform these steps in your typical
workspace directory.

```bash
# Clone the Polkadot Repository
git clone https://github.com/paritytech/polkadot.git

# Switch into the Polkadot directory
cd polkadot

# Checkout the proper commit
git checkout 63667acb

# Build the relay chain Node
cargo build --release

# Print the help page to ensure the node build correctly
./target/release/polkadot --help
```

If the help page prints, you have succeeded in building a Polkadot node.

For the rest of this workshop, when we need to run this binary we will refer to it simply as
`polkadot`. You may move the binary you just built to somewhere more convenient, or leave it where
it is. You will need to type its full path as appropriate.

## Building the Collator Template

The Substrate DevHub team maintains a
[parachain template](https://github.com/substrate-developer-hub/substrate-parachain-template) (very
similar to the [node template](https://github.com/substrate-developer-hub/substrate-node-template))
that we will use to launch our first parachains and make cross-chain asset transfers. Later, we will
use it as a starting point for developing our own parachains. Perform these steps in your typical
workspace directory.

> NOTE: unless you have a _massive amount of RAM_ you will need to wait for the relay chain to
> compile _before_ you compile your chain. Each take ~12 GB minimum of RAM at peak to complete.

```bash
# Clone the Parachain Template
git clone  https://github.com/substrate-developer-hub/substrate-parachain-template

# Switch into the Parachain Template directory
cd substrate-parachain-template

# Checkout the proper commit
git checkout 3baf75b3

# Build the parachain template collator
cargo build --release

# Print the help page to ensure the node built correctly
./target/release/parachain-collator --help
```

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
