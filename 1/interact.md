# Interact with Your Node

Now that we have created a network, let's actually do things on it.

You can connect to your local node with a Javascript based UI:

[https://polkadot.js.org/apps/#/explorer?rpc=ws://127.0.0.1:9944](https://polkadot.js.org/apps/#/explorer?rpc=ws://127.0.0.1:9944)

You can see we have explicitly set the UI to use a WebSocket endpoint exposed by
our node:

```
ws://127.0.0.1:9944
```

> **NOTE:** You cannot use Firefox to connect to a non-secure WebSocket endpoint
> (`ws://`) from a secure webpage (`https://`). So you may need to use Chrome or
> a Chromium-based browser.

## Discussion

* Errors with multiple people using the same account.
* Event notifications
