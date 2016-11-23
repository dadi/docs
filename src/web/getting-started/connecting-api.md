---
title: Connecting to DADI API
---

If you are using _Web_ in conjunction with [DADI API](https://beta.dadi.tech/platform/api) you can connect it so you make use of it with datasources.

You can connect to an instance of _API_ that exists locally, or on a remote address easily.

```json
"api": {
  "host": "localhost",
  "port": 1337
},
"auth": {
  "tokenUrl":"/token",
  "clientId":"webClient",
  "secret":"secretSquirrel"
}
```

When you boot _Web_ you should see something similar to this message in the commandline if you have succesfully connected:

```
----------------------------
Your Project
Started 'DADI Web'
----------------------------
Server:      localhost:3000
Version:     1.7.0
Node.JS:     4.6
Environment: development
API:         localhost:1337
```