---
title: Server status
---

## Server Status

### Overview

An endpoint is provided at `/api/status` which returns server/application data in JSON format.

The request must be a POST and a valid Bearer token must be supplied in the Authorization header. See [Authorisation](https://github.com/dadi/api/blob/docs/docs/authorisation.md) for information regarding obtaining a Bearer token.

### Configuration

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

#### Health Check Routes

Property       | Description                 | Example
:--------------|:----------------------------|:--------
route        | The route to check   |  "/1.0/library/book"
expectedResponseTime   | The expected reponse time, in seconds, of the route |  10


### Request

```
POST /api/status HTTP/1.1
Host: api.example.com
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json
```

#### Sample request using curl

```
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://api.example.com/api/status"
```

### Response

```
{
  service: {
    site: 'library-v1.2.3',
    package: '@dadi/api',
    versions: {
      current: '1.4.2',
      latest: '1.5.0'
    }
  },
  process: {
    pid: 34979,
    uptime: 3.62,
    uptimeFormatted: '0 days 0 hours 0 minutes 3 seconds',
    versions: {
      http_parser: '2.3',
      node: '0.12.4',
      v8: '3.28.71.19',
      uv: '1.5.0',
      zlib: '1.2.8',
      modules: '14',
      openssl: '1.0.1m'
    }
  },
  memory: {
    rss: '79.848 MB',
    heapTotal: '59.878 MB',
    heapUsed: '27.653 MB'
  },
  system: {
    platform: 'darwin',
    release: '14.5.0',
    hostname: 'hudson',
    memory: {
      free: '48.320 MB',
      total: '8.000 GB'
    },
    load: [ 2.92333984375, 3.08154296875, 3.3330078125 ],
    uptime: 30475,
    uptimeFormatted: '0 days 8 hours 27 minutes 55 seconds'
  },
  routes: [
    {
      route: '/1.0/library/book',
      status: 200,
      expectedResponseTime: 10,
      responseTime: 0.013,
      healthStatus: 'Green'
    }
  ]
}
```
