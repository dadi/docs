---
title: Authentication
excerpt: Using client credentials to obtain access tokens for accessing your API
order: 9
---

## Introduction

Every request to the API requires a Bearer token which should be passed as a header.

Obtain a token by sending a POST request to the `/token` endpoint and passing your client credentials in the body of the request.

### Example Request using curl

```
curl -X POST -H "Content-Type: application/json" --data "{\"clientId\":\"testClient\",\"secret\":\"superSecret\"}" "http://api.example.com/token"
```

### Example request using Node.JS

```js
const http = require('http')

const options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'POST',
  path: '/token',
  headers: {
    'content-type': 'application/json'
  }
}

const credentials = JSON.stringify({
  clientId: 'your-client-id',
  secret: 'your-secret'
})

const req = http.request(options, res => {
  let chunks = []

  res.on('data', chunk => chunks.push(chunk))

  res.on('end', () => {
    const body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.write(credentials)
req.end()
```

### Response

```js
{
  "accessToken": "4172bbf1-0890-41c7-b0db-477095a288b6",
  "tokenType": "Bearer",
  "expiresIn": 1800
}
```

Once you have the token, each request to the API should include an `Authorization` header containing the token:

### Example Request using curl

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://api.example.com/api/collections"
```

### Example request using Node.JS

```js
const http = require('http')

const options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'GET',
  path: '/api/collections',
  headers: {
    'authorization': 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
    'content-type': 'application/json'
  }
}

const req = http.request(options, res => {
  let chunks = []

  res.on('data', (chunk) chunks.push(chunk))

  res.on('end', () => {
    const body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.end()
```

## Anatomy of a client

Client credentials are stored the database and contain three key components, **clientId**, **secret** and **accessType**.

| Key        | Options        | Example       |
| ---------- |:--------------:| -------------:|
| clientId   |                | "testClient"  |
| secret     |                | "superSecret" |
| accessType | "admin","user" | "admin"       |

## Access privileges

Depending on the **accessType**, a client can be restricted by operation.

| Operation       | User               | Admin              |
| --------------- |:-----------------: | ------------------:|
| GET document    | :white_check_mark: | :white_check_mark: |
| PUT document    | :white_check_mark: | :white_check_mark: |
| POST document   | :white_check_mark: | :white_check_mark: |
| DELETE document | :white_check_mark: | :white_check_mark: |
| PUT config      | :x:                | :white_check_mark: |
| POST config     | :x:                | :white_check_mark: |
| PUT endpoint    | :x:                | :white_check_mark: |
| POST endpoint   | :x:                | :white_check_mark: |
| GET status      | :x:                | :white_check_mark: |

