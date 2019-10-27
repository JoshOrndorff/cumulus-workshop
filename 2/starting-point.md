# Starting Point

Open the `substrate-node-template` in your favorite code editor.

Then open the file `runtime/src/template.rs`

```
substrate-node-template
|
+-- runtime
|   |
|   +-- Cargo.toml
|   |
|   +-- build.rs
|   |
|   +-- src
|       |
|       +-- lib.rs
|       |
|       +-- template.rs  <-- Edit this file
|
+-- scripts
|
+-- src
|
+-- ...
```

<!-- slide:break-40 -->

Replace the content in this file with this starting point:

```rust
use support::{decl_module, decl_storage, decl_event};

pub trait Trait: system::Trait {
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
}

decl_event! {
	pub enum Event<T> where AccountId = <T as system::Trait>::AccountId {
		// Events 
	}
}

decl_storage! {
	trait Store for Module<T: Trait> as TemplateModule {
		// Storage
	}
}

decl_module! {
	pub struct Module<T: Trait> for enum Call where origin: T::Origin {
		// Functions
	}
}
```