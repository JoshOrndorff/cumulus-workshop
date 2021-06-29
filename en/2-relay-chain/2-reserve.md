# Reserve a ParaID

To connect to any relay chain, you _must_ first reserve a `ParaId` for your parathread that will 
become a parachain. To do this, you _must_ have currency available on an account on that network
in sufficient amount to reserve an ID. This is 20 "units" on the testnets, check for the amount
on your relay chain. The relay chain is responsible for allotting all ParaIDs (they can no longer
be user selected) and will be simply the increment starting at `2000` for all chains connecting
that are not "systems parachains" that use a different method to obtain a `ParaId`.

The easiest way to reserve your `ParaId` this is via the
[Polkadot Apps UI](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/parachains/parathreads)
under the Parachains -> Parathreads tab and use the **`+ ParaID` button**.

![ParaID Reservation Screenshot](../../assets/img/paraid-reserve.png)

> You will need to connect to a _relay chain node_ to submit this extrinsic!
> In testnets, your ParaId will be 2000 for your first parathread registration.

In this example flow, we will use the **`Charlie` development account** where we have funds available
in the default chain specs for all local and development networks. You can use any account with funds.
Note that in non-sudo initiated actions to register (like crowdloans) _this account_ is the one that
must be the origin for using this ParaID.

Once you submit this extrinsic successfully, you can now launch your parachain or parathread using
the ID reserved for you!