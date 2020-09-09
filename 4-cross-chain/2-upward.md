# Upward Transfers

Previously we transferred DOTs to a parachain. While they are on the parachain, you can do anything
the parachain allows with them. Ultimately you may want to transfer the DOTs back to the relay
chain. This upward transfer can happen from any account with DOTs on the parachain regardless of
whether it was the account that originally received the funds.

## Sending Tokens Up

To send tokens from Alice's account on a parachain to Ferdie's account on the Relay Chain, you
submit a single transaction on the parachain. Go to the Apps instance that is connected to the
parachain, navigate to the Parachains tab, and click the lonely "Transfer to chain" button.

Fill in the details as you desire and submit the transaction. Take careful note of the toggle switch
in the bottom right. Make sure it is disable so the tokens go to the relay chain, not another
parachain.

![Sending tokens up](../assets/upward-transfer-screenshot.png)

## Confirming Receipt of DOTs

Back on the Relay Chain, check the Accounts tab to ensure the DOTs have arrived safely.

## Monetary Policy

As we mentioned in the previous section, this cross-chain transfer scheme uses a depository and mint
model. The relay chain is ultimately responsible for controlling the Supply of DOTs. The relay chain
cannot, however, control the semantics of the individual parachains. It is entirely possible that a
parachain allows users to mint tokens at will. These tokens should not be able to be transferred
back to the relay chain and dilute the DOT supply.

The invariant that the relay chain enforces is that no more tokens may be transferred out of the
parachain than went into it. And the Relay Chain knows how many tokens went into the parachain
because it is the number of tokens stored in the parachain's depository.

## Play More

Try transferring more tokens out of a parachain than you transferred into it. What happens?
