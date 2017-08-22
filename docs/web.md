---
title: Web
---

## Installation

### Requirements

* **[Node.js](https://www.nodejs.org/)** (supported versions: 4.8.4, 5.12.0, 6.11.x)

### DADI CLI

__Coming soon__

### NPM

All DADI platform microservices are available from [NPM](https://www.npmjs.com/). To add *Web* to your project as a dependency:

```console
$ npm install --save @dadi/web
```

This will create `config` & `workspace` folders and `server.js` which will serve as the entry point to your app.

## Configration

All the core platform services are configured using enviroment specific configuration.json files, the default being `development`. For more advanced users this can also load based on the `hostname` i.e., it will also look for `config." + req.headers.host + ".json`

A very basic `config.development.json` file looks like this:

```json
{
  "app": {
    "name": "Your Project"
  },
  "server": {
    "host": "localhost",
    "port": 3000
  },
  "api": {
    "enabled": false
  }
}
```

## Advanced configuration

### Example Configuration File

```javascript
{
    "app": {
      "name": "Project Name Here"
    },
    "server": {
      "host": "127.0.0.1",
      "port": 3020,
      "socketTimeoutSec": 30
    },
    "api": {
      "host": "127.0.0.1",
      "port": 3000
    },
    "auth": {
      "tokenUrl":"/token",
      "clientId":"webClient",
      "secret":"secretSquirrel"
    },
    "aws": {
      "accessKeyId": "<your key here>",
      "secretAccessKey": "<your secret here>",
      "region": "eu-west-1"
    },
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
    },
    "engines": {
      "dust": {
        "cache": true,
        "debug": true,
        "debugLevel": "DEBUG",
        "whitespace": true,
        "paths": {
          "helpers": "workspace/utils/helpers"
        }
      }
    },
    "headers": {
      "useGzipCompression": true,
      "cacheControl": {
        "text/css": "public, max-age=86400"
      }
    },
    "logging": {
      "enabled": true,
      "level": "info",
      "path": "./log",
      "filename": "dadi-web",
      "extension": "log"
      "accessLog": {
        "enabled": true,
        "kinesisStream": "dadi_web_test_stream"
      }
    },
    "paths": {
      "datasources": "./workspace/datasources",
      "events": "./workspace/events",
      "media": "./workspace/media",
      "middleware": "./workspace/middleware",
      "pages": "./workspace/pages",
      "partials": "./workspace/partials",
      "public": "./workspace/public",
      "routes": "./workspace/routes",
      "helpers": "./workspace/utils/helpers",
      "filters": "./workspace/utils/filters"
    },
    "rewrites": {
      "datasource": "redirects",
      "path": "workspace/routes/rewrites.txt",
      "forceLowerCase": true,
      "forceTrailingSlash": true,
      "stripIndexPages": ['index.php', 'default.aspx']
    },
    "global" : {
      "baseUrl": "http://www.example.com"
    },
    "debug": true,
    "allowJsonView": true
}
```

### Example SSL Configuration

```javascript
{
    "app": {
      "name": "Project Name Here"
    },
    "server": {
      "host": "127.0.0.1",
      "port": 443,
      "protocol": "https",
      "sslPassphrase": "superSecretPassphrase",
      "sslPrivateKeyPath": "keys/server.key",    
      "sslCertificatePath": "keys/server.crt",
    },
    "api": {
      "host": "127.0.0.1",
      "port": 3000
    },
    "auth": {
      "tokenUrl":"/token",
      "clientId":"webClient",
      "secret":"secretSquirrel"
    },
	  "global" : {
      "baseUrl": "https://www.example.com"
    },
    "debug": true,
    "allowJsonView": true
}
```

You can see all the config options in [`config.js`](https://github.com/dadi/web/blob/master/config.js).

### debug

If set to `true`, _Web_ logs more information about routing, caching etc. Caching is also **disabled**.

### allowJsonView

If set to `true`, allows page data to be viewable by appending the querystring `?json=true` to the end of any URL.

### app

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| name | String | `DADI Web (Repo Default)` | The name of your application, used for the boot message | `My project` |

### server

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| host | String | `0.0.0.0` | The hostname or IP address to use when starting the Web server | `example.com` |
| port | Number | `8080` | The port to bind to when starting the Web server | `80` |
| socketTimeoutSec | Number | `30` | The number of seconds to wait before closing an idle socket | `10` |
| protocol | String | `http` | The protocol the web application will use | `https` |
| sslPassphrase | String | - | The passphrase of the SSL private key | `secretPassword` |
| sslPrivateKeyPath | String | - | The path to the SSL private key                                                             | `/etc/ssl/key.pem` |
| sslCertificatePath | String | - | The filename of the SSL certificate | `/etc/ssl/cert.pem` |
| sslIntermediateCertificatePath | String | - | The filename of an SSL intermediate certificate, if any | `/etc/ssl/ca.pem` |
| sslIntermediateCertificatePaths | Array | - | The filenames of SSL intermediate certificates, overrides `  sslIntermediateCertificatePath` (singular) | `[ '/etc/ssl/ca/example.pem', '/etc/ssl/ca/other.pem' ]` |

### api

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| host | String | `0.0.0.0` | The hostname or IP address of the [DADI API](https://dadi.tech/api) instance to connect to | `api.example.com` |
| protocol | String | `http` | The protocol to use | `https` |
| port | Number | `8080` | The port of the API instance to connect to | `3001`
| enabled | Boolean | `true` | If false, the web server runs in stand-alone mode | `false`

### auth

> This block is used in conjunction with the `api` block above.

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| tokenUrl | String | `/token` | The endpoint to use when requesting Bearer tokens from the DADI API | `anotherapi.example.com/token` |
| protocol | String | `http` | The protocol to use when connecting to the `tokenUrl` | `https`
| clientId | String | `testClient` | Should reflect what you used when you setup your DAI API | `my-user`
| secret | String | `superSecret` | The corresponding password | `my-secret` |

### caching

> N.B. Caching across DADI products is standardised by [DADI Cache](https://www.npmjs.com/package/@dadi/cache).

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| ttl | Number | `300` | The time, in seconds, after which cached data is considered stale | `3600`

#### directory 

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| enabled | Boolean | `true` | If enabled, cache files will be saved to the filesystem | `false` |
| path | String | `./cache/web` | Where to store the cache files | `./tmp` |
| extension | String | `html` | The default file extension for cache files. N.B. _Web_ will override this if compression is enabled | `json` |

#### redis

> You will need to have a [Redis](https://redis.io/) server running to use this. 

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| enabled | Boolean | `true` | If enabled, cache files will be saved to specified Redis server | `false` |
| cluster | Boolean | `false` | | |
| host | String | `127.0.0.1` | | |
| port | Number | `6379` | | |
| password | String | - | | | |

### engines

In version 3.0 and above, _Web_ can handle multiple template engines, the default being a [Dust.js interface](https://www.npmjs.com/package/@dadi/web-dustjs). You can pass configuration options to these adaptors in this block.

Please see Templates later for more information.

### headers

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| useGzipCompression (deprecated, see `useCompression`) | Boolean | | | |
| useCompression | Boolean | `true` | Attempts to compress the response, including assets, using either [Brotli](https://github.com/google/brotli) or [Gzip](https://nodejs.org/api/zlib.html) | `false` |
| cacheControl | Object | `{ 'image/png': 'public, max-age=86400', 'image/jpeg': 'public, max-age=86400', 'text/css': 'public, max-age=86400', 'text/javascript': 'public, max-age=86400', 'application/javascript': 'public, max-age=86400',        'image/x-icon': 'public, max-age=31536000000' }` | A set of custom cache-control headers (in seconds) for different content types | | |

### logging

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| enabled | Boolean | `true` | If true, logging is enabled using the following settings. | `false` |
| level | [`debug`|`info`|`warn`|`error`|`trace`] | `info` |  The level at which log messages will be written to the log file.                                                                                                                                                                                                           | `warn` |
| path | String | `./log` | The absolute or relative path to the directory for log files | `/data/app/log` |
| filename | String | `web` | The filename to use for the log files. The name you choose will be given a suffix indicating the current application environment | `my_application_name` |
| extension | String | `log` | The extension to use for the log files | `txt` |                                                                  

#### accessLog

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| enabled | Boolean | `true` | If true, HTTP access logging is enabled. The log file name is similar to the setting used for normal logging, with the addition of 'access'. For example `dadi-web.access.log` | `false ` |
| kinesisStream | String | - | An [AWS Kinesis](https://aws.amazon.com/kinesis/streams/) stream to write to log records to | `web_aws_kinesis` |

### aws

> For use with the above block `logging.accessLog`.

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| accessKeyId | String | | | 
| secretAccessKey | String | | | 
| region | String | | | 

### rewrites

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| datasource | String | - | The name of a datasource used to query the database for redirect records matching the current URL. [More info](#web/routing-rewrites-and-redirects) | `redirects` |
| path | String | - | The path to a file containing rewrite rules | `workspace/routes/rewrites.txt` |
| forceLowerCase | Boolean | `false` | If true, converts URLs to lowercase before redirecting | `true` |
| forceTrailingSlash | Boolean | `false` | If `true`, adds a trailing slash to URLs before redirecting | `true` |
| stripIndexPages | Array | - | A set of common index page filenames to remove from URLs | `[‘index.php', 'default.aspx']` |

### global

The `global` section can be used for any application parameters that should be available for use in page templates, such as asset locations, 3rd party account identifiers, etc

```javascript
"global" : {
  "baseUrl": "http://www.example.com"
}
```

In the above example `baseUrl` would be available to a page template and could be used in the following way:

```html
<html>
<body>
  <h1>Welcome to DADI Web</h1>
  <img src="{global.baseUrl}/images/welcome.png"/>
</body>
</html>
```

### paths

Paths can be used to configure where any folder of the app assets are located.

For example:

```
"paths": {
  "workspace": "workspace",
  "datasources": "workspace/datasources",
  "pages": "workspace/pages",
  "events": "workspace/events",
  "middleware": "workspace/middleware",
  "media": "workspace/media",
  "public": "workspace/public",
  "routes": "workspace/routes"
}
```

### Environmental variables

Best practice is to avoid keeping sensitive information inside a `config.*.json`. Therefore anywhere a password or secret is used in a config file can be substituted for an [environmental variable](https://nodejs.org/api/process.html#process_process_env).

|Variable|Block to substitute|
|:--|:--|
| AUTH_TOKEN_ID|`auth.clientId`|
| AUTH_TOKEN_SECRET|`auth.secret`|
| AWS_ACCESS_KEY|`aws.accessKeyId`|
| AWS_SECRET_KEY|`aws.secretAccessKey`|
| AWS_REGION|`aws.region`|
| NODE_ENV|`env`|
| REDIS_HOST|`caching.redis.host`|
| REDIS_PORT|`caching.redis.post`|
| REDIS_PASSWORD|`caching.redis.password`|
| SESSION_SECRET|`sessions.secret`|
| PORT|`server.port`|
| PROTOCOL|`server.potocol`|
| SSL_PRIVATE_KEY_PASSPHRASE|`server.sslPassphrase`|
| SSL_PRIVATE_KEY_PATH|`server.sslPrivateKeyPath`|
| SSL_CERTIFICATE_PATH|`server.sslCertificatePath`|
| SSL_INTERMEDIATE_CERTIFICATE_PATH|`server.sslIntermediateCertificatePath`|
| SSL_INTERMEDIATE_CERTIFICATE_PATHS|`server.sslIntermediateCertificatePaths`|
| TWITTER_CONSUMER_KEY|`twitter.consumerKey`|
| TWITTER_CONSUMER_SECRET|`twitter.consumerSecret`|
| TWITTER_ACCESS_TOKEN_KEY|`twitter.accessTokenKey`|
| TWITTER_ACCESS_TOKEN_SECRET|`twitter.accessTokenSecret`|
| WORDPRESS_BEARER_TOKEN|`workspress.bearerToken`|

### twitter

> See [twitter data provider](#web/twitter).

### wordpress

> See [wordpress data provider](#web/wordpress).

## Adding pages

A page on your website consists of two files within your workspace: a JSON specification and a template.

> N.B. The location of this folder is configurable, but defaults to workspace/pages.

### Example specification

Here is an example page specification, with all options specified.

```json
{
  "page": {
    "name": "People",
    "description": "A page for displaying People records."
  },
  "settings": {
    "cache": true,
    "beautify": true,
    "keepWhitespace": true,
    "passFilters": true
  },
  "routes": [
    {
      "path": "/people"
    }
  ],
  "contentType": "text/html",
  "template": "people.dust",
  "datasources": [
    "allPeople"
  ],
  "requiredDatasources": [
    "allPeople"
  ],
  "events": [
    "processPeopleData"
  ],
  "preloadEvents": [
    "geolocate"
  ],
}
```

### page

| Property | Type | Default | Description |
|:--|:--|:--|:--|
| name | String |-| Used by the application for identifying the page internally. |

Any other properties you add are passed to the page data. Useful for maintaining HTML `<meta>` tags, languages etc.

### settings

| Property | Type | Default | Description |
|:--|:--|:--|:--|
| cache | Boolean | Reflects the `caching` settings in the main config file | Used by the application for identifying the page internally. |

Any other properties you add are passed to the page data. Useful for maintaining HTML `<meta>` tags, languages etc.

### routes

For every page added to your application, a route is created by default. A page’s default route is a value matching the page name. For example if the page name is `books` the page will be available in the browser at `/books`.

To make the books page reachable via a different URL, simply add (or modify) the page’s routes property:

```js
"routes": [
  {
    "path": "/reading"
  }
]
```

> For detailed documentation of routing, see [Routing](#web/routing-rewrites-and-redirects).

### Templates

Template files are stored in the same folder as the page specifications and by default share the same filename as the `page.json`. Unless the page specification contains an explicit `template` property, the template name should match the page specification name.

> See [Views](#web/views) for further documentation.

### Datasources

An array containing datasources that should be executed to load data for the page.

> For detailed documentation of datasources, see [Datasources](/web/concepts/datasources)

```js
"datasources": [
  "datasource-one",
  …
]
```

### Required Datasources

Allows specifying an array of datasources that must return data for the page to function. If any of the listed datasources return no `results`, a 404 is returned. The datasources specified must exist in the `datasources` array.

```js
"requiredDatasources": [
  "datasource-one",
  …
]
```

### Events

An array containing events that should be executed after the page's datasources have loaded data.

```js
"events": [
  "event-one",
  …
]
```

> For detailed documentation of events, see [Events](/web/concepts/events)

### Preload Events

An array containing events that should be executed before the rest of the page's datasources and events.

Preload events are loaded from the filesystem in the same way as a page's regular events, and a Javascript file with the same name must exist in the `events` path.

```js
"preloadEvents": [
  "preloadevent-one",
  …
]
```

### Caching

If true the output of the page will be cached using cache settings in the main configuration file.

```js
"settings": {
  "cache": true
}
```

> For detailed documentation of page caching, see [Caching](#web/caching-1).

## Routing, rewrites and redirects


## Views
### Templates
### Engines
### Adding engines
### Error pages


## Adding data
### Datasource files
### Chained datasources
### Filter events
### Preload data
### Routing
### Providers
#### DADI API
#### Remote
#### Markdown
#### Twitter
#### Wordpress
#### RSS

## Adding logic
### Events
### Middleware

## Performance
### Caching
### Compression
### Headers
### App cache

## Serving static assets and content
### Public folder
### Virtual directories

## Debugging
### JSON view

## Security
### CSRF tokens
### SSL
### SSL with a load balancer

## How-to guides
### Sendgrid example

