# Interact with Your Node

Now that you've joined the network, you can interact with your own node.

## With the Apps UI

In the Apps UI, go to the Settings tab, and change the endpoint to `ws://localhost:9944`.

![Apps setting tab](assets/apps-settings.png)

> **NOTE:** You cannot use Firefox to connect to a non-secure WebSocket endpoint
> (`ws://`) from a secure webpage (`https://`). So you may need to use Chrome or
> a Chromium-based browser.


## With the Frontend Template
The frontend template has its websocket endpoint stored in code. It is quite easy to change, but we will not cover that today.

You're welcome to explore the Frontend Template on your won. It's on github at https://github.com/substrate-developer-hub/substrate-front-end-template/ .
