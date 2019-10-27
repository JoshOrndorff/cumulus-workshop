# Create Claim

We will create our first runtime module function.

* Function
	* `create_claim()`

* Input
	* `origin`
	* `proof: Vec<u8>`

* Check
	* Message is signed
	* Proof does not exist

* Logic
	* Get block number from system module
	* Insert proof with owner and block number data

<!-- slide:break-40 -->

<!-- tabs:start -->

#### ** Hide Hints **

Click the other tabs to view hints.

#### ** Hint: Input **

```rust
/// Allow a user to claim ownership of an unclaimed proof
fn create_claim(origin, proof: Vec<u8>) {
	// ...
}
```

#### ** Hint: Check **

> **Note:** You need to import:
> * `system::ensure_signed`
> * `support::ensure`

```rust
// Verify that the incoming transaction is signed and store who the
// caller of this function is.
let sender = ensure_signed(origin)?;

// Verify that the specified proof has not been claimed yet or error with the message
ensure!(!Proofs::<T>::exists(&proof), "This proof has already been claimed.");
```

#### ** Hint: Logic **

```rust
// Call the `system` runtime module to get the current block number
let current_block = <system::Module<T>>::block_number();

// Store the proof with the sender and the current block number
Proofs::<T>::insert(&proof, (sender.clone(), current_block));
```

#### ** Hint: Emit Event **

```rust
// Emit an event that the claim was created
Self::deposit_event(RawEvent::ClaimCreated(sender, proof));
```

#### ** Solution **

```rust
use support::{decl_storage, decl_module, decl_event, ensure};
use rstd::prelude::Vec;
use system::ensure_signed;

pub trait Trait: system::Trait {
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}

decl_event! {
	pub enum Event<T> where AccountId = <T as system::Trait>::AccountId {
		ClaimCreated(AccountId, Vec<u8>),
		ClaimRevoked(AccountId, Vec<u8>),
	}
}

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
		/// The storage item for our proofs.
        /// It maps a proof to the user who made the claim and when they made it.
		Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber)
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		fn deposit_event() = default;

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

			// Emit an event that the claim was created
			Self::deposit_event(RawEvent::ClaimCreated(sender, proof));
		}
	}
}
```

<!-- tabs:end -->
