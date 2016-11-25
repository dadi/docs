---
title: Node.js
---

## Authentication

Every request to DADI API requires a `bearer` token which should be passed as a header.
Obtain a token by sending a POST request to API's `/token` endpoint, passing your client credentials in the body of the request:

```js
var http = require('http')

var options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'POST',
  path: '/token',
  headers: {
    'Content-Type': 'application/json'
  }
}

var credentials = JSON.stringify({
  clientId: 'your-client-id',
  secret: 'your-client-secret'
})

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.write(credentials)
req.end()
```

## Querying a collection

Once you have a token, each request to the API should include an `authorization` header containing the token.

```js
var http = require('http')

var options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'GET',
  path: '/1.0/example-database/example-collection',
  headers: {
    'Authorization': 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
    'Content-Type': 'application/json'
  }
}

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.end()
```
