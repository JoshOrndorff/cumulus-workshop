# Collator Template
The [Collator template](https://github.com/paritytech/cumulus/tree/joshy-workshop/collator-template) is a working collator node with a simple runtime. The runtime includes a template pallet, which developers can edit to add their own logic.

Substrate developers are familiar with the [Substrate Node Template](https://github.com/substrate-developer-hub/substrate-node-template) will find this workflow familiar. Many of the [Substrate devhub tutorials](https://substrate.dev/tutorials/) can be used with few modifications on the Colaltor template.

## Using the Template
Copy the `collator template` directory to your new project location
```bash
cp -r cumulus/collator-template my-parachain
```

Change the name of the project in the `Cargo.toml` file. If you don't it will be `parachain-two-collator`.

Edit the runtime in the `runtime` directory as you would in any Substrate node. There are lots of docs in at https://substrate.dev and examples in the https://substrate.dev/recipes .

You will not need consensus-related modules like grandpa or babe when using Cumulus.
