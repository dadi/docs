# DADI Web

## Caching

### Overview

* [Configuration](#configuration)
* [Page Caching](#page-caching)
* [Datasource Caching](#datasource-caching)
* [Cache Invalidation](#cache-invalidation)

### Configuration

```js
"caching": {
  "ttl": 300,
  "directory": {
    "enabled": true,
    "path": "./cache/web/",
    "extension": "html"
  },
  "redis": {
    "enabled": false,
    "host": "localhost",
    "port": 6379
  }
}
```

Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
ttl           | The time, in seconds, after which cached data is considered stale   |        300       |  86400
directory           | Configuration block for caching using a local filesystem directory   |               |
directory.enabled           | If true, cache files will be stored on disk using the settings below. Either directory or redis caching must be enabled for caching to work.   | true              | true
directory.path           | The directory to use for storing cache files, relative to the root of the application   |    "./cache/web"           |  
directory.extension           | The file extension to use for cache files   |    "html"           |  "txt"
redis           | Configuration block for caching using a Redis caching service   |               |
redis.enabled           | If true, cache files will be stored in the Redis cache store using the settings below. Either directory or redis caching must be enabled for caching to work.   | false              | true
redis.host           | The host for the Redis caching service   |    ""           |  "localhost"
redis.port           | The port for the Redis caching service   |    6379           |  6379

### Page Caching

Controls the caching of rendered HTML output. To enable page caching, ensure that the main configuration file has either `directory` or `redis` caching enabled, and the below `cache` setting is set for the page in question.

```js
"settings": {
  "cache": true
}
```

### Datasource Caching

Data received from the API via datasources can be cached by adding a `caching` block to the datasource specification file.

```js
"caching": {
  "enabled": true,
  "ttl": 300,
  "directory": "./cache/web/",
  "extension": "json"
}
```

Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
enabled           | If true, datasource responses will be cached. The main configuration must have either directory or redis caching enabled for datasource caching to work   |    | true
ttl           | The time, in seconds, after which cached data is considered stale   |               |  300      
directory           | (optional) The directory to use for storing datasource cache files, relative to the root of the application   | "./cache/web"  |  
extension           | (optional) The file extension to use for datasource cache files   |    "json"           |  "txt"

**Note:** If `directory` or `extension` are not specified, values from the main configuration file will be used instead.


### Cache Invalidation

DADI Web supports two types of cache invalidation: by specific path or the entire cache.

In both cases the request must be a POST and the body must have the following properties:

* `path`: either "`*`" to invalidate everything, or a path matching a route within the application, for example `/books/young-adult`
* `clientId`: must match the `auth.clientId` in the application's config file
* `secret`: must match the `auth.secret` in the application's config file

#### Specific Path Invalidation

```
POST /api/flush HTTP/1.1
Host: www.example.com
Content-Type: application/json

{"path": "/books", "clientId": "testClient", "secret": "superSecret"}
```

#### Entire Cache Invalidation

```
POST /api/flush HTTP/1.1
Host: www.example.com
Content-Type: application/json

{"path": "*", "clientId": "testClient", "secret": "superSecret"}
```
