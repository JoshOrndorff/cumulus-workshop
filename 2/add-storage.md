# Add Storage Item

We need to create a storage item for our blockchain.

* `Proofs`
	* Storage Map
		* Key: `Vec<u8>`
		* Value: `(T::AccountId, T::BlockNumber)`

> **Note:** To use `Vec<u8>` you need to import `rstd::prelude::Vec;`. 

<!-- tabs:start -->

#### ** Hint #1 **

```
use rstd::prelude::Vec;
```

#### ** Hint #2 **

```rust
/// The storage item for our proofs.
/// It maps a proof to the user who made the claim and when they made it.
Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber);
```

#### ** Solution **

```rust
use support::{decl_storage, decl_module};
use rstd::prelude::Vec;

pub trait Trait: system::Trait {}

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
		/// The storage item for our proofs.
		/// It maps a proof to the user who made the claim and when they made it.
		Proofs: map Vec<u8> => (T::AccountId, T::BlockNumber)
	}
}

decl_module! {
pub struct Module<T: Trait> for enum Call where origin: T::Origin {
	// Declare public functions here
	}
}
```

<!-- tabs:end -->