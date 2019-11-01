# Using Traits

A powerful tool in Rust is the trait system.

A trait tells the Rust compiler about functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic can be any type that has certain behavior.

> **Note:** Traits are similar to a feature often called interfaces in other languages, although with some differences.

In this section we will use Substrate's included balances module and integrate it into our custom runtime module. We will introduce a deposit for when users store a proof on-chain:

* Users who submit a proof will have to "reserve" a fee.

* When a user revokes their proof and cleans up the blockchain storage, the fee is returned.

Check out [Rust Traits by Example](https://doc.rust-lang.org/rust-by-example/trait.html) in your own free time.

<!-- slide:break-60 -->

![Rust Crab](./assets/rust-crab.png)
