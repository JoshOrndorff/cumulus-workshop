# Upward Transfers

Previously we transferred DOTs to a parachain. Once they are on the parachain, you can do anything the parachain allows including transferring them to various parachain accounts. Ultimately you may want to transfer the DOTs back to the relay chain. This upward transfer can happen from any account with DOTs on the parachain regardless of whether it was the account that originally received the funds.

## Sending Tokens Up

To send tokens from Alice's account on a Parachain to her own account on the Relay Chain, you submit a single transaction on the Parachain. In the Apps instance connected to the Parachain, submit `Extrinsics` -> `tokenDealer` -> `transferTokensToRelayChain` with the following parameters.

dest: 5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY
amount: 123

There are two main differences from transferring downward:
1. We do not need to specify a destination chain. There is only one relay chain hierarchically above this parachain and that's where the tokens will go.
2. Instead of an opaque remark field, we get a normal address field. This is because we know the account format of the Relay Chain and do not need to be generic over it.

## Confirming Receipt of DOTs

Back on the Relay Chain, check the Accounts tab to ensure the DOTs have arrived safely.

## Monetary Policy

As we mentioned in the previous section, this cross-chain transfer scheme uses a depository and mint model. The relay chain is ultimately responsible for controlling the Supply of DOTs. The relay chain cannot, however, control the semantics of the individual parachains. It is enitrely possible that a parachain allows users to mint tokens at will. These tokens should not be able to be transferred back to the relay chain and dilute the DOT supply.

The invariant that the relay chain enforces is that no more tokens may be trasferred out of the parachain than went into it. And the Relay Chain knows how many tokens went into the parachain because it is the number of tokens stored in the parachain's depository.

## Play More

Try sending tokens from various accounts to various account. Try transferring more tokens out of a parachain than you transferred into it.
