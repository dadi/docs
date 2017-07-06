---
title: Server status
---

An endpoint is provided at `/api/status` which returns server/application data in JSON format.

The request must be a POST and a valid Bearer token must be supplied in the Authorization header. See [Authorisation](../authorisation) for information regarding obtaining a Bearer token.

## Configuration

```js
"status": {
  "enabled": true,
  "routes": [
    {
      "route": "/1.0/library/book",
      "expectedResponseTime": 10
    }
  ]
}
```

Property       | Description                 | Default  | Example
:--------------|:----------------------------|:---------|:--------
enabled        | If true, the status endpoint is enabled   |     false          |  true      
routes         | An array of routes to test. Each route object must contain properties `route` and `expectedResponseTime` | `[]` |

### Health Check Routes

Property       | Description                 | Example
:--------------|:----------------------------|:--------
route        | The route to check   |  "/1.0/library/book"
expectedResponseTime   | The expected reponse time, in seconds, of the route |  10


## Request

```
POST /api/status HTTP/1.1
Host: api.example.com
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json
```

### Sample request using curl

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://example.com/api/status"
```