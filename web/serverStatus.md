# DADI Web

## Server Status

### Overview

An endpoint at `/api/status` which returns server/application data in JSON format.

The request must be a POST and the body must have a `clientId` and `secret` that match those stored in the application's config file.

```
POST /api/status HTTP/1.1
Host: www.example.com
Content-Type: application/json

{"clientId": "testClient","secret": "superSecret"}
```

### Health Check

```js
"status": {
  "routes": [
    {
      "route": "/",
      "expectedResponseTime": 10
    }
  ]
}
```
