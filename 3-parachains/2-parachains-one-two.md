# Connecting Parachains One and Two
We're now ready to start parachains one and two. One collator for each parachain can volunteer to start the first collator. Follow the same steps as before.

## Submitting the Registration
Only the sudo key holder can complete the registration transaction. There are two options to proceed:

* The workshop leader may share the sudo key, so the participant can register
* The participant can share the genesis state, so the leader can register

## Hard Coded IDs
You may be wondering whether it matters _which_ slot the parachains are registered in. The current state of cumulus is such that the expected parachain ID is hard-coded into the collator. Each collator has a line in `src/main.rs` like the following.

```rust
pub const PARA_ID: ParaId = ParaId::new(0);
```

So currently, the specific slot does matter. This will likely change in the future.
