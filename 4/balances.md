# Balances Module

The [Balances module](https://substrate.dev/rustdocs/master/srml_balances/index.html) comes in the Substrate Runtime Module Library.

It implements the `Currency` and `ReservableCurrency` trait.

## Directly Add Balances

```rust
/// The module's configuration trait.
pub trait Trait: system::Trait + new_module::Trait {
	//---------------------------^^^^^^^^^^^^^^^^^
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}
```

### Access Functions

```rust
// Call a functions exposed by the module from the `Module` struct
<new_module::Module<T>>::my_function();
```

> **Note:** We need to import the traits which implement the functions we need!

<!-- slide:break-40 -->

<!-- tabs:start -->

#### ** Hide Hints **

Click the other tabs to view hints.

![Money Icon](./assets/balances.png ':size=300')

#### ** Add Balances Module **

```rust
/// The module's configuration trait.
pub trait Trait: system::Trait + balances::Trait {
	//--add-this-----------------^^^^^^^^^^^^^^^^^
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}
```

#### ** Add Reservable Currency Trait **

```rust
use support::traits::ReservableCurrency;
```

#### ** Call Reserve **

```rust
/// Allow a user to claim ownership of an unclaimed proof
fn create_claim(origin, proof: Vec<u8>) {
	let sender = ensure_signed(origin)?;
	ensure!(!Proofs::<T>::exists(&proof), "This proof has already been claimed.");

	// Try to reserve the deposit from the user
	<balances::Module<T>>::reserve(&sender, 1000.into())?; // Add this line

	let current_block = <system::Module<T>>::block_number();
	Proofs::<T>::insert(&proof, (sender.clone(), current_block));
	Self::deposit_event(RawEvent::ClaimCreated(sender, proof));
}
```

> **Note:** This function returns a `Result`!

#### ** Call Unreserve **

```rust
fn revoke_claim(origin, proof: Vec<u8>) {
	let sender = ensure_signed(origin)?;
	ensure!(Proofs::<T>::exists(&proof), "This proof has not been stored yet.");
	let (owner, _) = Proofs::<T>::get(&proof);
	ensure!(sender == owner, "You must own this claim to revoke it.");

	// Unreserve the deposit from the user
	<balances::Module<T>>::unreserve(&sender, 1000.into()); // Add this line

	Proofs::<T>::remove(&proof);
	Self::deposit_event(RawEvent::ClaimRevoked(sender, proof));
}
```

#### ** Final Code **

```rust
use support::{decl_module, decl_storage, decl_event, ensure};
use rstd::vec::Vec;
use system::ensure_signed;
use support::traits::{ReservableCurrency};

/// The module's configuration trait.
pub trait Trait: system::Trait + balances::Trait {
	/// The overarching event type.
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}

// This module's events.
decl_event! {
	pub enum Event<T> where AccountId = <T as system::Trait>::AccountId {
		/// Event emitted when a proof has been claimed.
		ClaimCreated(AccountId, Vec<u8>),
		/// Event emitted when a claim is revoked by the owner.
		ClaimRevoked(AccountId, Vec<u8>),
	}
}

// This module's storage items.
decl_storage! {
	trait Store for Module<T: Trait> as PoeStorage {
		/// The storage item for our proofs.
		/// It maps a proof to the user who made the claim and when they made it.
		Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber);
	}
}

// The module's dispatchable functions.
decl_module! {
	/// The module declaration.
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		// A default function for depositing events
		fn deposit_event() = default;

		/// Allow a user to claim ownership of an unclaimed proof
		fn create_claim(origin, proof: Vec<u8>) {
			// Verify that the incoming transaction is signed and store who the
			// caller of this function is.
			let sender = ensure_signed(origin)?;

			// Verify that the specified proof has not been claimed yet or error with the message
			ensure!(!Proofs::<T>::exists(&proof), "This proof has already been claimed.");

			// Try to reserve the deposit from the user
			<balances::Module<T>>::reserve(&sender, 1000.into())?;

			// Call the `system` runtime module to get the current block number
			let current_block = <system::Module<T>>::block_number();

			// Store the proof with the sender and the current block number
			Proofs::<T>::insert(&proof, (sender.clone(), current_block));

			// Emit an event that the claim was created
			Self::deposit_event(RawEvent::ClaimCreated(sender, proof));
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

			// Unreserve the deposit from the user
			<balances::Module<T>>::unreserve(&sender, 1000.into());

			// Remove claim from storage
			Proofs::<T>::remove(&proof);

			// Emit an event that the claim was erased
			Self::deposit_event(RawEvent::ClaimRevoked(sender, proof));
		}
	}
}
```

<!-- tabs:end -->
