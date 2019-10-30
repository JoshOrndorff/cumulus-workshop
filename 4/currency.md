# Currency Trait

The [`Currency` trait](https://substrate.dev/rustdocs/master/srml_support/traits/trait.Currency.html) defines the interface for a simple blockchain cryptocurrency:

## Types

* **Balance**, PositiveImbalance, NegativeImbalance

## Functions

* total_balance

* total_issuance

* free_balance

* transfer

* withdraw

* etc...

## Use

```rust
use support::traits::Currency;
```

<!-- slide:break -->

# Reservable Currency Trait

The [`ReservableCurrency` trait](https://substrate.dev/rustdocs/master/srml_support/traits/trait.ReservableCurrency.html) adds to `Currency` additional APis which allow for reserving funds from a user.

## Additional Functions

* reserved_balance

* reserve

* unreserve

* etc...

## Use

```rust
use support::traits::ReservableCurrency;
```
