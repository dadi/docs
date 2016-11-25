---
title: cURL
---

## Authentication

Every request to DADI API requires a `bearer` token which should be passed as a header.
Obtain a token by sending a POST request to API's `/token` endpoint, passing your client credentials in the body of the request:

```
curl -X POST
  -H "Content-Type: application/json"
  --data "clientId=your-client-id&secret=your-client-secret"
  "http://api.example.com/token"
```

## Querying a collection

Once you have a token, each request to the API should include an `authorization` header containing the token.

```
curl -X GET
  -H "Content-Type: application/json"
  -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6"
  "http://api.example.com/1.0/example-database/example-collection"
```