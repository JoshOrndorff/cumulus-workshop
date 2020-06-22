# Preparation

This workshop covers the entire process of launching a relay chain, connecting parachains, transferring assets between chains, and developing your own parachain runtimes. Naturally, there will be some significant compiling if you intend to build everything yourself.

## Shortening the Workshop

If you intend to use this material for a live workshop you may shorten it by cutting steps off of the end. If your workshop will not cover writing your own parachains, you may skip all the compilation by using the provided binaries and docker images.

If you prefer to focus primarily on development in your workshop, you may also skip initial steps by performing those steps yourself in preparation for the workshop and making the network available to your participants. See [Setting Up The Bootnode](SettingUpTheBootnode.md) for notes on setting up a cloud-based relay chain.

## Install a Rust Toolchain

Install Substrate prerequisites

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

> This workshop is known to work on Linux, MacOS, and Windows Subsystem for Linux. It is recommended you use one of those platforms. If you must build naively on Windows, try the DevHub's [Windows Setup Instructions](https://substrate.dev/docs/en/knowledgebase/getting-started/windows-users). Support for executing this workshop on Windows will be made on a best-effort basis, but no guarantees are made.

## Building a Relay Chain Node

Clone the Polkadot repository, and build the node. We are using a specific commit for this workshop. Perform these steps in your typical workspace directory.

```bash
# Clone the Repository
git clone https://github.com/paritytech/polkadot.git

# Switch into the Polkadot directory
cd polkadot

# Checkout the proper commit
git checkout 91f3e68

# Build the Relay Chain Node
cargo build --release

# Print the help page to ensure the node build correctly
./target/release/polkadot --help
```

If the help page prints, you have succeeded in building a Polkadot node. You may move the binary you just built to somewhere more convenient, or leave it where it is. For the rest of this workshop when we need to run this binary we will refer to it simply as `polkadot`. You will need to include the path as appropriate.

## Building the Test Parachain Collator

The Cumulus repository ships with an example collator. We will use this collator to learn to register parachains and the do cross-chain asset transfers. Perform these steps in your typical workspace directory.

```bash
# Building the Collator
git clone https://github.com/paritytech/cumulus.git

# Switch into the Cumulus directory
cd cumulus

# Checkout the proper commit
git checkout 05a83e8

# Build the test parachain collator
cargo build --release -p cumulus-test-parachain-collator

# Print the help page to ensure the node build correctly
./target/release/cumulus-test-parachain-collator --help
```

If the help page prints, you have succeeded in building a Cumulus Collator. You may move the binary you just built to somewhere more convenient, or leave it where it is. For the rest of this workshop when we need to run this binary we will refer to it simply as `test-collator`. You will need to include the path as appropriate.

## Building your Custom Collator

Building your custom collator will look similar to these two builds. You need to write your code before you can build it. This material will be covered in the section on writing your own parachains.
