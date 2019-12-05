# Adding More Collators
A parachain _can_ work with only a single collator as we've shown already. But that configuration is not very decentralized. The adversary would only need to take down a single node to stall the parachain.

## This is Experimental
Cumulus has come a long way over the past several months, but there are a few rough edges. Multiple collators is one of them. We will try this exercise to learn the principles, and practice the steps. Understand that this may break our chain. That's okay.

## Start the Collators
The command to run another parachain-zero collator is as follows. This command is nearly identical for other parachains; just be sure to run the correct collator binary.
```bash
./target/release/parachain-zero-collator
```

## Troubleshooting
Just in case you do run into trouble

### Collation failure: timeout
A common error message when running subsequent collators is `collation failure: timeout`. In practice this means that your collator does not have the same state as the current head tracked on the relay chain. Probably your collator hasn't peered properly with the other collator and thus hasn't synced the parachain blocks.

### Purging your chain
If you've hit issues and want to start again, you should purge your chain. I've found it best to remove the entire base-path directory and start fresh. `rm -r collator-zero`. Remember to use the actual base path you assigned to your collator.
