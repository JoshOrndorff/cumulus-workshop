# Starting Point

```rust
use support::{decl_storage, decl_module};

pub trait Trait: system::Trait {}

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
			// Declare storage and getter functions here
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		// Declare public functions here
	}
}
```