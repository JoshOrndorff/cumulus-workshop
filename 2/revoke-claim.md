# Revoke Claim

* Function
	* `revoke_claim()`

* Input
	* `origin`
	* `proof: Vec<u8>`

* Check
	* Message is signed
	* Proof does exist
	* Owner is calling the function

* Logic
	* Remove proof

<!-- tabs:start -->

#### ** Hint: Input **

```rust
/// Allow the owner to revoke their claim
fn revoke_claim(origin, proof: Vec<u8>) {
	// ...
}
```

#### ** Hint: Check and Logic **

> **Note:** You need to import:
> * `system::ensure_signed`
> * `support::ensure`

```rust
/// Allow the owner to revoke their claim
fn revoke_claim(origin, proof: Vec<u8>) {
	// Determine who is calling the function
	let sender = ensure_signed(origin)?;

	// Verify that the specified proof has been claimed
	ensure!(Proofs::<T>::exists(&proof), "This proof has not been stored yet.");

	// Get owner of the claim
	let (owner, _) = Proofs::<T>::get(&proof);

	// Verify that sender of the current call is the claim owner
	ensure!(sender == owner, "You must own this claim to revoke it.");

	// Remove claim from storage
	Proofs::<T>::remove(&proof);
}
```

#### ** Solution **

```rust
use support::{decl_storage, decl_module, ensure};
use rstd::prelude::Vec;
use system::ensure_signed;

pub trait Trait: system::Trait {}

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
		Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber)
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		/// Allow a user to claim ownership of an unclaimed proof
		fn create_claim(origin, proof: Vec<u8>) {
			// Verify that the incoming transaction is signed and store who the
			// caller of this function is.
			let sender = ensure_signed(origin)?;

			// Verify that the specified proof has not been claimed yet or error with the message
			ensure!(!Proofs::<T>::exists(&proof), "This proof has already been claimed.");

			// Call the `system` runtime module to get the current block number
			let current_block = <system::Module<T>>::block_number();

			// Store the proof with the sender and the current block number
			Proofs::<T>::insert(&proof, (sender.clone(), current_block));
		}

		/// Allow the owner to revoke their claim
		fn revoke_claim(origin, proof: Vec<u8>) {
			// Determine who is calling the function
			let sender = ensure_signed(origin)?;

			// Verify that the specified proof has been claimed
			ensure!(Proofs::<T>::exists(&proof), "This proof has not been stored yet.");

			// Get owner of the claim
			let (owner, _) = Proofs::<T>::get(&proof);

			// Verify that sender of the current call is the claim owner
			ensure!(sender == owner, "You must own this claim to revoke it.");

			// Remove claim from storage
			Proofs::<T>::remove(&proof);
		}
	}
}
```

<!-- tabs:end -->