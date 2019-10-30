# Using Traits

A powerful tool in Rust is the trait system.

A trait tells the Rust compiler about functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic can be any type that has certain behavior.

> **Note:** Traits are similar to a feature often called interfaces in other languages, although with some differences.

In this section we will use Substrate's included balances module and integrate it into our custom runtime module. We will introduce a deposit for when users store a proof on-chain, and we will do it in a few steps:

* 