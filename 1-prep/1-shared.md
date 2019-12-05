# Preparation

Follow along with this guide: https://bit.ly/2rXBh70

![QR Code](../assets/qr.png)

## Overview
You can participate in this workshop in any (or all) of three roles. To participate, complete the shared steps as well as the role-specific steps for each role that you intend to play.

The roles are:

* **Relay Chain Node** -- Gossip relay chain blocks and transaction, sync the relay chain, and track the latest head of each parachain.
* **Parachain Collator** -- Author blocks on one of several provided parachains.
* **Parachain Developer** -- Use Cumulus with your already-coded runtime.

## Shared Preparation Steps

Install Substrate prerequisites

```bash
curl https://getsubstrate.io -sSf | bash -s -- --fast
```

Manual [instructions for Windows](https://substrate.dev/docs/en/getting-started/installing-substrate#windows) are also available. Although Windows is a supported platform for Substrate and Polkadot, it will only be supported on a best-effort basis for this workshop.

Notice the final [notes page](5-notes.md) on this walkthrough. We will use it to coordinate throughout the workshop.
