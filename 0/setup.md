# Getting Started

Please complete the instructions on this page before attending the [Parity Substrate](https://www.parity.io/substrate/) workshop. You only need to complete this one page, we will look at the other pages during the workshop.

If you have any problems with the instructions on this page, feel free to send us an email at:

* shawn@parity.io
* joshy@parity.io

## Instructions

1. Install Substrate Dependencies:

	```bash
	curl https://getsubstrate.io -sSf | bash -s -- --fast
	```

	> **Note:** Windows users can follow the instructions found here: https://substrate.dev/docs/en/next/getting-started#getting-started-on-windows

2. Clone Substrate Node Template

	```bash
	git clone https://github.com/substrate-developer-hub/substrate-node-template
	```

3. Build Node

	```bash
	cd substrate-node-template/
	cargo build --release
	```

4. Test Run Your Node

	```bash
	./target/release/node-template --dev
	```

	> **Note:** You can stop your node with `ctrl + c`.

	If everything completed successfully, you should see your local node producing blocks:

	```bash
	$ ./target/release/node-template --dev

	2019-10-25 16:26:43 Running in --dev mode, RPC CORS has been disabled.
	2019-10-25 16:26:43 Substrate Node
	2019-10-25 16:26:43   version 2.0.0-43ee953-x86_64-macos
	2019-10-25 16:26:43   by Anonymous, 2017, 2018
	2019-10-25 16:26:43 Chain specification: Development
	2019-10-25 16:26:43 Node name: annoying-salt-3933
	2019-10-25 16:26:43 Roles: AUTHORITY
	2019-10-25 16:26:43 Initializing Genesis block/state (state: 0x499e…d805, header-hash: 0x91dd…a241)
	2019-10-25 16:26:43 Loading GRANDPA authority set from genesis on what appears to be first startup.
	2019-10-25 16:26:43 Loaded block-time = 6000 seconds from genesis on first-launch
	2019-10-25 16:26:43 Highest known block at #0
	2019-10-25 16:26:43 Using default protocol ID "sup" because none is configured in the chain specs
	2019-10-25 16:26:43 Local node identity is: QmPr6qzL4p3ytqqbLu9yq1jX2FtDvoGxgDq6v3kimbNWrb
	2019-10-25 16:26:48 Starting consensus session on top of parent 0x91dd55574a13be24d0c6dff1f8a4575d679a9592e919207f9472adca277ba241
	2019-10-25 16:26:48 Prepared block for proposing at 1 [hash: 0x889f6b60dde48f83139c7d44458c53acd1ef8ecd7309d640b3e04bc61aa62cfe; parent_hash: 0x91dd…a241; extrinsics: [0x16d2…9757]]
	2019-10-25 16:26:48 Pre-sealed block for proposal at 1. Hash now 0x4eb8dd65c16195f7c60de09634f2d9f29fc4f2fc8515ba2160a2a91e5458054c, previously 0x889f6b60dde48f83139c7d44458c53acd1ef8ecd7309d640b3e04bc61aa62cfe.
	2019-10-25 16:26:48 Imported #1 (0x4eb8…054c)
	2019-10-25 16:26:48 Idle (0 peers), best: #1 (0x4eb8…054c), finalized #0 (0x91dd…a241), ⬇ 0 ⬆ 0
	2019-10-25 16:26:53 Idle (0 peers), best: #1 (0x4eb8…054c), finalized #0 (0x91dd…a241), ⬇ 0 ⬆ 0
	2019-10-25 16:26:54 Starting consensus session on top of parent 0x4eb8dd65c16195f7c60de09634f2d9f29fc4f2fc8515ba2160a2a91e5458054c
	2019-10-25 16:26:54 Prepared block for proposing at 2 [hash: 0x30e59a758b4e757c662e2d2deefd1f4d163e7bb732833aba2cbca4c1933c4363; parent_hash: 0x4eb8…054c; extrinsics: [0xb864…d340]]
	2019-10-25 16:26:54 Pre-sealed block for proposal at 2. Hash now 0x72a3f25e5ea7b468f94b993f45be6d58c998f89b823c2f012da560e76da39b0a, previously 0x30e59a758b4e757c662e2d2deefd1f4d163e7bb732833aba2cbca4c1933c4363.
	2019-10-25 16:26:54 Imported #2 (0x72a3…9b0a)
	```
