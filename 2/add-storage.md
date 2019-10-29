# Add Storage Item

We need to create a storage item for our blockchain.

* `Proofs`
	* Storage Map
		* Key: `Vec<u8>`
		* Value: `(T::AccountId, T::BlockNumber)`

<!-- slide:break-40 -->

<!-- tabs:start -->

#### ** Hide Hints **

Click the other tabs to view hints.

![Runtime Storage](./assets/storage.png ':size=300')

#### ** Hint: Storage Item **

```rust
/// The storage item for our proofs.
/// It maps a proof to the user who made the claim and when they made it.
Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber);
```

#### ** Solution **

```rust
use support::{decl_storage, decl_module, decl_event};
use rstd::prelude::Vec;

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
	}
}
```

<!-- tabs:end -->
