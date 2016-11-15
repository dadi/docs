---
title: Working with endpoints
layout: default.html
---

Endpoints in DADI API can be either be mapped directly to collections in MongoDB or custom based on a wider requirements set.

You can read about collections and custom endpoints in detail [here](https://github.com/dadi/api/blob/docs/docs/endpointsCollections.md) and [here](https://github.com/dadi/api/blob/docs/docs/endpointsCustom.md).

_You may want to look at a handy QA testing tool called [Postman](http://www.getpostman.com/)_

## Overview

* Collection Endpoints
* Custom Endpoints
* API Requests


### Collections POST request

```
POST /1.0/library/notices HTTP/1.1
Host: api.example.com
content-type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65

{ "message": "Hello, World!", "timestamp": 1441089951507 }
```

### Collections POST response

```json
{
  "results": [
    {
      "message": "Hello, World!",
      "timestamp": 1441089951507,
      "apiVersion": "1.0",
      "createdAt": 1441089951507,
      "createdBy": "your-client-id",
      "_id": "55e5499f83f997b7d1e63e93"
    }
  ]
}
```
