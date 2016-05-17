---
title: Authentication Middleware
permalink: /api/middleware/auth/
---

## Overview

This is exposed as middleware that issues and validates bearer tokens. It is an implementation of the oAuth2 Client Credentials flow.


### Obtaining a token

To obtain a token the client must authenticate itself by issuing a POST request with valid credentials to the API's token endpoint, as specified in the configuration file. The default endpoint is `/token`.

### Example Request using curl
```
curl -X POST -H "Content-Type: application/json" --data "clientId=testClient&secret=superSecret" "http://api.example.com/token"
```

#### Example Request Headers

    POST /token HTTP/1.1
    Host: api.example.com
    content-type: application/json
    Cache-Control: no-cache
    
    { "clientId": "testClient", "secret": "superSecret" }
    
#### Example Response

```
{
  "accessToken": "4172bbf1-0890-41c7-b0db-477095a288b6",
  "tokenType": "Bearer",
  "expiresIn": 1800
}
```


### Authorization Header

All requests, aside from requesting a token, require that a token be present.

Bearer tokens should be sent as an Authorization header:

```
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
```

#### Example Request using curl
```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://api.example.com/api/collections"
```

### Configuration

The storage location for client credentials and tokens is specified in the configuration file setting `auth.database`. 

[TODO] A script that creates a client - `testClient / superSecret` - for QA testing can be found in `utils/create-client.js`.

### Token Expiry

Token expiration is specified in seconds in the configuration file setting `auth.tokenTtl`.

The removal of expired tokens within MongoDB is handled via a TTL index on the `tokenStore` collection using the [expireAfterSeconds](http://docs.mongodb.org/manual/tutorial/expire-data/) property.

## Collection / Endpoint Authorisation

The client record can be extended with a `permissions` object containing an array of collections and/or endpoints to which that client has access. Access to any collections/endpoints not in the permissions list will result in a `401 Unauthorized` response.

Client records may also be restricted to an API version.

```
{
  clientId: 'clientX',
  secret: 'secret',
  accessType: 'user',
  permissions: { 
    collections: [ { apiVersion: "1.0", path: "test-collection" } ],
    endpoints: [ { apiVersion: "1.0", path: "test-endpoint" } ]
  }
}
```

## Collection Configuration Authorisation

Creating or updating a collection schema requires client credentials with `accessType: "admin"`.

```
{
  clientId: 'clientX',
  secret: 'secret',
  accessType: 'admin'
}
```

See [Endpoints](https://github.com/dadi/api/blob/docs/docs/endpoints.md) for more information regarding endpoint configuration requests.
