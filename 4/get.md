# Configurable Constants

Rather than hard-code the fee of our module, we can also allow that to be a configurable trait.

## Get Trait

We define a simple trait called `Get` for querying a single fixed value from a type.

```rust
use support::traits::Get;
```

## Balance Type

Up till now, we have been using `into()` to hide the type being used for balances.

Remember that `Currency` defines a balance type, and we will need to use it here!

```rust
// BalanceOf becomes an alias to `Currency::Balance`
// using the wonderful verbosity of Rust.
type BalanceOf<T> =
	<<T as Trait>::Currency as Currency<<T as system::Trait>::AccountId>>::Balance;
```

For this we need:

```rust
use support::traits::Currency;
```

<!-- slide:break -->

## Fee Type

```rust
pub trait Trait: system::Trait {
	type Event: From<Event<Self>> + Into<<Self as system::Trait>::Event>;
	type Currency: ReservableCurrency<Self::AccountId>;
	/// A static, configurable value for PoE deposit fee.
	type Fee: Get<BalanceOf<Self>>;
}
```

**runtime/src/lib.rs**

```rust
parameter_types! {
	pub const Fee: Balance = 1000;
}

impl template::Trait for Runtime {
	type Event = Event;
	type Currency = Balances;
	type Fee = Fee;
}
```

## Use Getter

```rust
T::Currency::reserve(&sender, T::Fee::get())?;
//--snip--
T::Currency::unreserve(&sender, T::Fee::get());
```
