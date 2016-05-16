---
title: Token wallets
---

## Token wallets

On every call, the library will determine whether a new bearer token is required or if there is one in storage that is still valid. To do this, it needs a method of persisting information about a token and its lifespan — a token wallet.

The library ships with a flat file token wallet, but it can be extended to use any type of storage, such as Redis or MongoDB. A wallet simply needs to implement the methods `read()` and `write()`, to access the last token saved and to store a new one, respectively.

If no token wallet is specified, a new bearer token will be requested on every call, which is highly discouraged and should only be used for development and testing purposes.
