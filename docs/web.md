---
title: Web
order: 2
published: true
---

## Installation

### Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

* **[Node.js](https://nodejs.org/en/)** (current LTS version)

### DADI CLI

The easiest way to install Web is using DADI CLI. CLI is a command line application that can be used to create and maintain installations of DADI products.

#### Install DADI CLI

```console
$ npm install @dadi/cli -g
```


#### Create new Web installation

There are two ways to create a new Web application with the CLI: either manually create a new directory for Web or let CLI handle that for you. DADI CLI accepts an argument for `project-name` which it uses to create a directory for installation.

*Manual directory creation*

```console
$ mkdir my-web-app
$ cd my-web-app
$ dadi web new
```

*Automatic directory creation*

```console
$ dadi web new my-web-app
$ cd my-web-app
```

### NPM

All DADI platform microservices are available from [NPM](https://www.npmjs.com/). To add *Web* to your existing project as a dependency:

```console
$ cd my-existing-node-app
$ npm install --save @dadi/web
```

This will create `config` & `workspace` folders and `server.js` which will serve as the entry point to your app.

## Configuration

All the core platform services are configured using environment specific configuration.json files, the default being `development`. For more advanced users this can also load based on the `hostname` i.e., it will also look for `config." + req.headers.host + ".json`

The minimal `config.development.json` file looks like this:

```json
{
  "server": {
    "host": "localhost",
    "port": 3000
  },
  "cluster": false
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
      "port": 443,
      "socketTimeoutSec": 30,
      "protocol": "https",
      "sslPassphrase": "superSecretPassphrase",
      "sslPrivateKeyPath": "keys/server.key",    
      "sslCertificatePath": "keys/server.crt"
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
      "useCompression": true,
      "cacheControl": {
        "text/css": "public, max-age=86400"
      }
    },
    "logging": {
      "enabled": true,
      "level": "info",
      "path": "./log",
      "filename": "dadi-web",
      "extension": "log",
      "accessLog": {
        "enabled": true,
        "kinesisStream": "dadi_web_test_stream"
      }
    },
    "paths": {
      "datasources": "./workspace/datasources",
      "events": "./workspace/events",
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
    "globalEvents": [
	    "timestamp"
    ],
    "debug": true,
    "allowJsonView": true
}
```

You can see all the config options in [`config.js`](https://github.com/dadi/web/blob/master/config.js).

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
| tokenUrl | String | `/token` | The endpoint to use when requesting Bearer tokens from DADI API | `anotherapi.example.com/token` |
| protocol | String | `http` | The protocol to use when connecting to the `tokenUrl` | `https`
| clientId | String | `your-client-key` | Should reflect what you used when you setup your DADI API | `my-user`
| secret | String | `your-client-secret` | The corresponding password | `my-secret` |

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

Please see [Views](#web/views) later for more information.

### headers

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| useGzipCompression (deprecated, see `useCompression`) | Boolean | | | |
| useCompression | Boolean | `true` | Attempts to compress the response, including assets, using either [Brotli](https://github.com/google/brotli) or [Gzip](https://nodejs.org/api/zlib.html) | `false` |
| cacheControl | Object | `{ 'image/png': 'public, max-age=86400', 'image/jpeg': 'public, max-age=86400', 'text/css': 'public, max-age=86400', 'text/javascript': 'public, max-age=86400', 'application/javascript': 'public, max-age=86400',        'image/x-icon': 'public, max-age=31536000000' }` | A set of custom cache-control headers (in seconds) for different content types | | |

In addition, a `cacheControl` header can be used for a 301/302 redirect by adding to the configuration block:

```json
"headers": {
  "cacheControl": {
    "301": "no-cache"
  }
}
```

### logging

| Property | Type | Default | Description | Example |
|:--|:--|:--|:--|:--|
| enabled | Boolean | `true` | If true, logging is enabled using the following settings. | `false` |
| level | `debug`,`info`,`warn`,`error`,`trace` | `info` |  The level at which log messages will be written to the log file.                                                                                                                                                                                                           | `warn` |
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
| accessKeyId | String | | | |
| secretAccessKey | String | | | |
| region | String | | | | |

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

### globalEvents

[Events](#web/events-1) to be loaded on every request.

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

### twitter

> See [twitter data provider](#web/twitter).

### wordpress

> See [wordpress data provider](#web/wordpress).

### debug

> See [debugging](#web/debugging)

If set to `true`, _Web_ logs more information about routing, caching etc. Caching is also **disabled**.

### allowJsonView

> See [JSON view](#web/json-view)

If set to `true`, allows page data to be viewable by appending the querystring `?json=true` to the end of any URL.

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

### Content Type

The default content type is `text/html`. This can be overridden by defining the `contentType` in the root of the page config.

```js
"contentType": "application/xhtml+xml"
```

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

Routing allows you to define URL endpoints for your application and control how Web responds to client requests.

### Basic Routing

Adding routes provides URLs for interacting with the application. A route specified as `/contact-us`, for example, will make a URL available to your end users as `http://www.example.com/contact-us`.

### Page Routing

For every page added to your application, a `route` is created by default. A page's default route is a value matching the page name. For example if the page name is `books` the page will be available in the browser at `/books`.

To make the `books` page reachable via a different URL, simply add (or modify) the page's `routes` property:

```json
{
  "routes": [
    {
      "path": "/reading"
    }
  ]
}
```

### Dynamic parameters

Routes may contain dynamic segments or named parameters which are resolved from the request URL and can be utilised by the datasources and events attached to the page.

A route segment with a colon at the beginning indicates a dynamic segment which will match any value. For example, a page with the route `/books/:title` will be loaded for any request matching the format. DADI Web will extract the `:title` parameter and add it to the `req.params` object, making it available for use in the page's attached datasources and events.

The following URLs match the above route, with the segment defined by `:title` extracted, placed into `req.params` and accessible via the property `title`.

URL       | Named Parameter `:title`        | Request Parameters `req.params`         
:--|:--|:--
/books/war-and-peace           |    `war-and-peace` | `{ title: "war-and-peace" }`
/books/sisters-brothers           |    `sisters-brothers` | `{ title: "sisters-brothers" }`

#### Optional Parameters

Parameters can be made optional by adding a question mark `?`.

For example the route `/books/:page?` will match requests in both the following formats:

| URL | Matched? | Named Parameters | Request Parameters `req.params`         
:--|:--|:--|:--
| /books  | Yes|| `{}`
| /books/2 | Yes | `:page` | `{ page: "2" }`

#### Parameter Format

Specifying a format for a parameter can help Web identify the correct route to use. We can use the same example as above, where the URL has an optional `page` parameter. If we add a regular expression to this parameter indicating that it should only match numbers, any URL that doesn't contain numbers in this segment will not match the route.

**Example**

The route `/books/:page(\\d+)` will only match a URL that has `books` in the first segment and a number in the second segment:

| URL | Matched? | Named Parameters  | Request Parameters `req.params`         
:--|:--|:--|:--
| /books/war-and-peace | No ||
| /books/2 | Yes | `:page` | `{ page: "2" }`

> N.B. DADI Web uses the [Path to Regexp](https://github.com/pillarjs/path-to-regexp) library when parsing routes and parameters. More information on parameter usage can be found in the Github repository.


### Multiple Route Pages

The `routes` property makes it easy for you to define "multiple route" pages, where one page specification can handle requests for multiple routes.

**DADI Web versions >= 1.7.0**

DADI Web 1.7.0 introduced a more explicit way of specifying multiple routes per page . The `route` property has been replaced with `routes` which should be an Array of route objects.

Each route object must contain, at the very least, a `path` property. At startup, Web adds the value of each `path` property to an internal collection of routes for matching incoming requests.

```json
{
  "routes": [
    {
      "path": "/movies/:title"
    },
    {
      "path": "/movies/news/:title?/"
    },
    {
      "path": "/movies/news/:page?/"
    }
  ]
}
```
In the above example, the same page (and therefore it's template) will be loaded for requests matching any of the formats specified by the `path` properties:

```
http://web.somedomain.tech/movies/deadpool
http://web.somedomain.tech/movies/news/
http://web.somedomain.tech/movies/news/2
http://web.somedomain.tech/movies/news/deadpool
```


### Route Priority

DADI Web sorts your routes into a priority order so that the most likely matches are easier to find.

* In Web, the most important parts of a route are the static segments, or rather the non-dynamic segments, for example `/books`. The more static segments in a route the higher its priority.
* The second most important parts are the mandatory dynamic segments, for example `/:title`.
* The least important parts are the optional dynamic segments, for example `/:year?`.
* Any route with a `page` parameter gets a slight edge, with 1 point being added to its priority.

| Path | Priority |
|:--|:--|
| `/movies/news/:page(\\d+)?/` |  12
| `/movies/reviews/:page(\\d+)?` |  12
| `/movies/features/:page(\\d+)?/` |  12
| `/movies/news/:title?/` |  11
| `/movies/features/:title?/` |  11
| `/movies/reviews/` |  10
| `/movies/:title/:page(\\d+)?` |  9
| `/movies/:title/:content?` |  8
| `/movies/` |  5

### Route Validation

An application may have more than one route that matches a particular URL, for example two routes that each have one dynamic segment:

```
/:genres
/:categories
```
In this case it is possible to provide DADI Web with some rules for determining the correct routes based on the parameters in the request. Parameter checks currently supported are:

* `preload` - tests the parameter value exists in a set of preloaded data
* `in` - tests the parameter value exists in an array of static values  
* `fetch` - performs a datasource lookup using the parameter value as a filter

### Parameter Validation

#### Preloaded data (`preload`)

To validate parameters against preloaded data, you first need to configure Web to preload some data. Add a block to the [main configuration](configuration.md) file like the example below, using your datasource names in place of "channels":

```json
{
  "data": {
    "preload": [
      "channels"
    ]
  }
}
```

```json
{
  "routes": [
    {
      "path": "/:channel/news/",
      "params": [
        {
          "param": "channel",
          "preload": {
            "source": "channels",
            "field": "key"
          }
        }
      ]
    }
  ]
}
```

#### Static array test (`in`)

```json
{
  "routes": [
    {
      "path": "/movies/:title/:subPage?/",
      "params": [
        {
          "param": "subPage",
          "in": ["review"]
        }
      ]
    }
  ]
}
```

#### Datasource lookup (`fetch`)

```json
{
  "routes": [
    {
      "path": "/movies/:title/:content?/",
      "params": [
        {
          "fetch": "movies"
        }
      ]
    }
  ]
}
```

### Route Constraint Functions

In the case of ambiguous routes it is possible to provide DADI Web with a constraint function to check each matching route against some business logic or existing data.

> Returning `true` from a constraint instructs DADI Web that this is the correct route, the attached datasources and events should be run and the page displayed.

> Returning `false` from a constraint instructs DADI Web to try the next matching route (or return a 404 if there are no further matching routes).

Constraints are added as a route property in the page specification file:

```json
{
  "routes": [
    {
      "path": "/:people",
      "constraint": "nextIfNotPeople"
    }
  ]
}
```

To add constraint functions, create a file in the `routes` folder (by default configured as `app/routes`). The file **MUST** be named `constraints.js`.

In the following example the route has a dynamic parameter `subPage`. The constraint function `nextIfNewsOrFeatures` will check the value of the `subPage` parameter and return `false` if it matches "news" or "features", indicating to DADI Web that the next matching route should be tried (or a 404 returned if there are no further matching routes).

_app/pages/movies.json_

```json
{
  "routes": [
    {
      "path": "/movies/:subPage",
      "constraint": "nextIfNewsOrFeatures"
    }
  ]
}
```

_app/routes/constraints.js_

```js
module.exports.nextIfNewsOrFeatures = function (req, res, callback) {  
  if (req.params.subPage === 'news' || req.params.subPage === 'features') {
    return callback(false)
  }
  else {
    return callback(true)
  }
}
}
```

#### Constraint Datasources

> **Note:** Deprecated in Version 1.7.0

An existing datasource can be used as the route constraint. The specified datasource must exist in `datasources` (by default configured as `app/datasources`). The following examples have some missing properties for brevity.

app/pages/books.json

```json
{
  "route": {
    "paths": ["/:genre"],
    "constraint": "genres"
  }
}
```

app/datasources/genres.json

```json
{
  "datasource": {
    "key": "genres",
    "name": "Genre datasource",
    "source": {
      "endpoint": "1.0/library/genres"
    },
    "count": 1,
    "fields": { "name": 1, "_id": 0 },
    "requestParams": [
      { "param": "genre", "field": "title" }
    ]
  }
}

```

In the above example a request for `http://www.example.com/crime` will call the `genres` datasource, using the `requestParams` to supply a filter to the endpoint. The request parameter `:genre` will be set to `crime` and the resulting datasource endpoint will become:

```
/1.0/library/genres?filter={"title":"crime"}
```

If there is a result for this datasource query, the constraint will return `true`, otherwise `false`.


### Template URL Building

Using `toPath()`:

```js
var app = require('dadi-web');
var page = app.getComponent('people');
var url = page.toPath({ id: '1234' });
```

```
"/person/1234"
```

### Using Request Parameters

See [Datasource Specification](datasource_specification.md) for more information regarding the use of named parameters in datasource queries.


### URL Rewriting and Redirects

#### forceLowerCase

With this property set to true, Web converts incoming URLs to lowercase and sends a 301 Redirect response to the browser with the lowercased version of the URL.

```js
{
  "forceLowerCase": true
}
```

#### forceTrailingSlash

With this property set to true, Web adds a trailing slash to incoming URLs and sends a 301 Redirect response to the browser with the new version of the URL.

```js
{
  "forceTrailingSlash": true
}
```

#### stripIndexPages

This property accepts an array of filenames to remove from URLs. Useful for when you're migrating from another system and search engines may have indexed URLs containing legacy files. For example `http://legacy-web.example.com/index.php`


```js
{
  "stripIndexPages": ["index.php", "default.aspx"]
}
```

#### URL Rewrites File
```
^(.*[^/])$ $1/ [R=301,L]
^/books/(.*)$ /books?authorId=$1 [R=301,L]
```

## Views

### Engines

You can use a variety of template engines with _Web_. We maintain a few such as [Dust](https://www.npmjs.com/package/@dadi/web-dustjs), [Pug](https://www.npmjs.com/package/@dadi/web-pugjs) and [Handlebars](https://www.npmjs.com/package/@dadi/web-handlebars). You can find more on [NPM](https://www.npmjs.com/browse/keyword/dadi-web-engine).

#### Install a new engine

Each package lists it's own install instructions, but they all follow the same pattern:

Install the interface you want:

`npm install @dadi/web-handlebars --save`

Edit your app entry file (by default this is `server.js`):

```js
require('@dadi/web')({
  engines: [
    require('@dadi/web-handlebars')
  ]
})
```

#### Creating your own engine

Full instructions for this are available in our [Web sample engine](https://github.com/dadi/web-sample-engine) repo.

### Error pages

DADI Web has default error pages, but it will look for templates in the `pages` folder which match the error code needing to be expressed e.g., `404.dust`.

## Sessions

DADI Web uses the [express-session](https://github.com/expressjs/session) library to handle sessions. Visit that project's homepage for more detailed information regarding session configuration.

 * [Configuration](#web/session-configuration)
 * [Configuration Properties](#web/session-configuration-properties)
 * [Using the session](#web/using-the-session)

### Session Configuration

**Note:** Sessions are disabled by default. To enable them in your application, add the following to your configuration file:

```js
"sessions": {
  "enabled": true
}
```

A full configuration block for sessions contains the following properties:

```js
"sessions": {
  "enabled": true,
  "name": "dadiweb.sid",
  "secret": "dadiwebsecretsquirrel",
  "resave": false,
  "saveUninitialized": false,
  "store": "",
  "cookie": {
    "maxAge": 60000,
    "secure": false
  }
}
```

### Session Configuration Properties

Property      | Description        |  Default                                  
---------------|--------------------|-------------------------------------------
enabled  | If `true`, sessions are enabled. | false
name | The session cookie name. | "dadiweb.sid"
secret | The secret used to sign the session ID cookie. This can be either a string for a single secret, or an array of multiple secrets. If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests. | "dadiwebsecretsquirrel"
resave | Forces the session to be saved back to the session store, even if the session was never modified during the request. | false
saveUninitialized | Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session. | false
store | The session store instance, defaults to a new MemoryStore instance. | The default is an empty string, which uses a new MemoryStore instance. To use MongoDB as the session store, specify a MongoDB connection string such as `"mongodb://host:port/databaseName"` or `"mongodb://username:password@host:port/databaseName"` if your database requires authentication. To use Redis, specify a Redis server's address and port number: `"redis://127.0.0.1:6379"`.
cookie  | |
cookie.maxAge | Set the cookie’s expiration as an interval of seconds in the future, relative to the time the browser received the cookie. `null` means no 'expires' parameter is set so the cookie becomes a browser-session cookie. When the user closes the browser the cookie (and session) will be removed. | 60000
cookie.secure | HTTPS is necessary for secure cookies. If `secure` is `true` and you access your site over HTTP, the cookie will not be set. | false


### Using the session

Session data can easily be accessed from an [event](#web/events) or custom [middleware](#web/middleware).

```js
const Event = (req, res, data, callback) => {
  if (req.session) {
    req.session.someProperty = "some value"
    req.session.save(function (err) {
      // session saved
    })

    data.session_id = req.session.id
  }

  callback(null, data)
}
```


## Adding data

### Datasources

Web's Datasources are used to connect to both internal and external data providers
to load data for rendering pages.

```
my-web/
  app/
    datasources/      
      books.json      # a datasource specification
    events/           
    pages/            
```

#### Datasource Specification File

```json
{
  "datasource": {
    "key": "books",
    "name": "Books datasource",
    "source": {
      "type": "dadiapi",
      "endpoint": "1.0/library/books"
    },
    "paginate": true,
    "count": 5,
    "sort": { "name": 1 },
    "filter": {},
    "fields": {}
  }
}
```

##### Datasource Configuration

 Property  |     | Description                 | Default value  |  Example
:----------|:-----|:----------------------------|:---------------|:--------------
key       |    | Short identifier of the datasource. This value is used in the page specification files to attach a datasource   |               | `"books"`
name      |     | This is the name of the datasource, commonly used as a description for developers   |               | `"Books"`
paginate    |       |    | true              | true
count       |    | Number of items to return from the endpoint per page. If set to '0' then all results will be returned    | 20              | 5
sort        |   | A JSON object with fields to order the result set by | `{}` // unsorted     | `{ "title": 1 } // sort by title ascending`, `{ "title": -1 } // sort by title descending`
filter      |     | A JSON object containing a MongoDB query  |               | `{ "SaleDate" : { "$ne" : null} }`
filterEvent |          | An event file to execute which will generate the filter to use for this datasource. The event must exist in the configured events path  |               | `"getBookFilter"`
fields   |        | Limits the fields to return in the result set   |               | `{ "title": 1, "author": 1 }`
requestParams       |    | An array of parameters the datasource can accept from the querystring. See [Passing Parameters](#web/passing-parameters) for more.   |               | `[ { "param": "author", "field": "author_id" } ]`
source | | | 
 | type           | (optional) Determines whether the data is from a remote endpoint or local, static data   | `"remote"`              | `"remote"`, `"static"`       
 | protocol           | (optional) The protocol portion of an endpoint URI   | `"http"`              | `"http"`, `"https"`
 | host           | (optional) The host portion of an endpoint URL   | The main config value `api.host`              | `"api.somedomain.tech"`
 | port           | (optional) The port portion of an endpoint URL   | The main config value `api.port`  | `3001`
 | endpoint           | The path to the endpoint which contains the data for this datasource   |               | `"/1.0/news/articles"`       
caching | | | 
 | enabled           | Sets caching enabled or disabled   | `false`              | `true`
 | ttl           |    |               |        
 | directory           | The directory to use for storing cache files, relative to the root of the application   |               | "./cache"
 | extension           | The file extension to use for cache files   |               |  "json"
auth | | | 
 | type           |    |               | `"bearer"`
 | host           |    |               | `"api.somedomain.tech"`       
 | port           |    |               | `3000`
 | tokenUrl           |    |               |     `"/token"`   
 | credentials           |    |               |        `{ "clientId": "your-client-key", "secret": "your-client-secret" }`

#### Passing parameters

`requestParams` is an array of parameters that the datasource can accept from the querystring. Used in conjunction with `route` properties from a page specification, this allows filters to be generated for querying data.

**Page specification**

```json
"routes": [{
  "path": "/books/:title"
}]
```

**Datasource specification**

```json
"source": {
  "endpoint": "1.0/library/books"
},
"requestParams": [
  { "field": "title", "param": "title" }
]
```

field | param
:--|:---
The field to filter on | The request parameter to use as the value for the filter. Must match a named parameter in the page specification's `routes` property

##### For example, given a collection `books` with the fields `_id`, `title`

With the page route `/books/:title` and the above datasource configuration, DADI Web will extract the `:title` parameter from the URL and use it to query the `books` collection using the field `title`.

With a request to http://www.somedomain.tech/books/sisters-brothers, the named parameter `:title` is `sisters-brothers`. A filter query is constructed for the datasource using this value.

The resulting query passed to the underlying datastore is: `{ "title" : "sisters-brothers" }`

See [Routing](#web/routing) for detailed routing documentation.

### Chained datasources

It is often a requirement to query a datasource using data already loaded by another datasource. DADI Web supports this through the use of "chained" datasources. Chained datasources are executed after all non-chained datasources, ensuring the data they rely on has already been fetched.

Add a `chained` property to a datasource to make it reliant on data loaded by another datasource. The following datasource won't be executed until data from the `books` datasource is a available:

```js
{
  "datasource": {
    "key": "books-by-author",
    "source": {
      "type": "dadiapi",
      "endpoint": "1.0/library/authors"
    },  
    "chained": {
      "datasource": "books" // the primary (non-chained) datasource that this datasource relies on
    }
  }
}
```

There are two ways to use query a chained datasource using previously-fetched data. One is _[Filter Generation](#web/filter-generation)_ and the other is _[Filter Replacement](#web/filter-replacement)_.

#### Filter Generation

Filter Generation is used when the chained datasource currently has no filter, and it is relying on the primary datasource to provide its values.

```js
"chained": {
  "datasource": "books",
  "outputParam": {
    "field": "_id", // the filter key to use for this datasource
    "param": "results.0.author_id" // the path to the value this datasource will use in it's filter
  }
}
```

Specifying a `field` and a `param` causes DADI Web to generate a filter for this datasource using values from the primary datasource. For example:

**Results from primary datasource**
```json
{
  "results": [
    {
      "fullName": "Ernest Hemingway",
      "author_id": 1234567890
    }
  ]
}
```

**Generated filter for chained datasource**

```js
{ "_id": 1234567890 }
```

#### Filter Replacement

Filter Replacement allows more advanced filtering and can inject a query into an existing datasource filter.

Using the `query` property, Web extracts the specified value from the primary datasource (using the path from `param`) and injects it into the query where `{param}` has been left as a placeholder.

Next, Web takes the updated value of the `query` property and injects the whole thing into the current datasource's `filter` where it finds a placeholder matching the key of the chained datasource (in the example below, `"{books}"` is the placeholder).

```js
"filter": ["{books}",{"$group":{"_id":{"genre":"$genre"}}}],
"chained": {
  "datasource": "books",
  "outputParam": {
    "param": "results.0.genre_id",
    "type": "Number",
    "query": {"$match":{"genre_id": "{param}"}}
  }
}
```

#### Chained datasource configuration

| Property |  | Description | Example | 
|--|--|--
| datasource | | Should match the `key` property of the primary datasource. |
| outputParam | | |
| | param | The `param` value specifies where to locate the output value in the results returned by the primary datasource. | `"results.0._id"` |
| | field | The `field` value should match the MongoDB field to be queried. | `"id"` |
| | type | The `type` value indicates how the `param` value should be treated (currently only "Number" is supported). | `"Number"` |
| | query | The `query` property allows more advanced filtering, see below for more detail.   | {} |

#### Chained datasource full example

On a page that displays a car make and all it's associated models, we have two datasources querying two collections, __makes__ and __models__.

** Collections **

* __makes__ has the fields `_id` and `name`
* __models__ has the fields `_id`, `makeId` and `name`

** Datasources **

* The primary datasource, `makes` (some properties removed for brevity)

```
{
  "datasource": {
     "key": "makes",
     "source": {
       "endpoint": "1.0/car-data/makes"
     },
     filter: { "name": "Ford" }
   }
}
```

The result of this datasource will be:

```
{
  "results": [
    {
      "_id": "5596048644713e80a10e0290",
      "name": "Ford"
    }
  ]
}
```

To query the models collection based on the above data being returned, add a `chained` property to the models datasource specifying `makes` as the primary datasource:

```
{
  "datasource": {
     "key": "models",
     "source": {
       "endpoint": "1.0/car-data/models"
     },
      "chained": {
        "datasource": "makes",
        "outputParam": {
          "param": "results.0._id",
          "field": "makeId"
        }
      }
   }
}
```
In this scenario the **models** collection will be queried using the value of `_id` from the first document of the `results` array returned by the **makes** datasource.

If your query parameter must be passed to the endpoint as an integer, add a `type` property to the `outputParam` specifying `"Number"`.
```
{
  "datasource": {
     "key": "models",
     "source": {
       "endpoint": "1.0/car-data/models"
     },
     "chained": {
        "datasource": "makes",
        "outputParam": {
          "param": "results.0._id",
          "type": "Number",
          "field": "makeId"
        }
      }
   }
}
```


### Filter events

Filter Events are just like regular Events but are designed to build a filter to be passed
from a datasource to it's underlying source. This could be useful when needing to specify a filter
for a datasource that relies on parameters that can't be determined from the request parameters (that is, `req.params`).

Any filter already specified by the datasource specification will be extended with the result of the Filter Event.

A "filter event" can be attached to a datasource specification using the property `filterEvent`:

**workspace/datasources/books.json**
```json
{
  "datasource": {
    "key": "books",
    "source": {
      "type": "dadiapi",
      "endpoint": "1.0/library/books"
    },
    "count": 10,
    "sort": {},
    "filter": {
      "borrowed": true
    },
    "filterEvent": "injectTodaysDate",
    "fields": [
      "title",
      "author"
    ]
  }
}
```

**workspace/events/injectTodaysDate.js**
```js
const Event = function (req, res, data, callback) {
  const filter = { date: Date.now() }
  callback(filter)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}
```

With the above examples, the datasource instance will be modified as follows. The `filter`
property will be extended to add a `date` property (from the filter event), and a new `filterEventResult`
property is added which contains the result of executing the filter event:

```
filter: { borrowed: true, date: 1507566199527 },
filterEventResult: { date: 1507566199527 }
```

### Preload data
### Routing
### Providers
#### DADI API

Previous to 2.0 the datasource source type for connecting to a [DADI API](https://github.com/dadi/api) was called `remote`. This was changed to `dadiapi` to ensure clarity with the updated and repurposed [Remote provider](#web/remote).

A typical datasource specification file would now contain the following:

```json
"source": {
  "type": "dadiapi",
  "endpoint": "1.0/articles"
}
```

The default is `dadiapi`, so there is no requirement to specify this property when connecting to a DADI API.

#### Remote

Connect to a miscellaneous API via HTTP or HTTPS. See the following file as an example:

```json
{
  "datasource": {
    "key": "instagram",
    "name": "Grab instagram posts for a specific user",
    "source": {
      "type": "remote",
      "protocol": "http",
      "host": "instagram.com",
      "endpoint": "{user}/?__a=1"
    },
    "auth": false,
    "requestParams": [
      {
        "param": "user",
        "field": "user",
        "target": "endpoint"
      }
    ]
  }
}
```

#### Markdown

Serve content from a local folder containing text files. You can specify also specify the extension to grab. Web will process any Markdown formatting (with [Marked](https://github.com/chjj/marked)) it finds automatically as well as any [Jekyll-style front matter](https://jekyllrb.com/docs/frontmatter/) found. Any dates/times found will be processed through JavasScript’s `Date()` function.

```JSON
{
  "datasource": {
    "source": {
      "type": "markdown",
      "path": "./workspace/posts",
      "extension": "md"
    }
  }
}
```

`workspace/posts/somefolder/myslug.md`

```markdown
--
date: 2016-02-17
title: Your title here
--
Some *markdown*
```

When loaded becomes the following data:

```
{
  "attributes": {
    "date": "2016-02-17T00:00:00.000Z",
    "title": "Your title here",
    "_id": "myslug",
    "_ext": ".md",
    "_loc": "workspace/posts/somefolder/myslug.md",
    "_path": [
      "somefolder"
    ]
  },
  "original": "--\ndate: 2016-02-17\ntitle: Your title here\n--\nSome *markdown*",
  "contentText": "Some *markdown*",
  "contentHtml": "<p>Some <em>markdown</em></p>\n"
}
```

NB. `_path` will exclude the datasource `source.path`.

#### Twitter
#### Wordpress
#### RSS

## Adding logic

### Events

Events are server side JavaScript functions that can add additional functionality to a page. Events can serve as a useful way to implement logic to a logic-less template.

```
my-web/
  workspace/
    datasources/      
    events/           
      addAuthorInformation.js      # an Event file
    pages/            
```

#### Global Events

In the main configuration file:

```js
globalEvents: [
  "eventName"
]
```

#### Preload Events

In a page specification file:

```js
"preloadEvents": [
  "preloadevent-one"
]
```

#### Filter Events

In a datasource specification file:

```js
"filterEvent": "filterevent-one"
```

Use case:
A developer would like count how many people clicked on a 'plus' button.

To achieve this he has to create a new event and attach it to the page where he has the 'plus' button.

The developer then implements a code in the event which will look for specific event (i.e. POST buttonpressed) and inside this he will increase a counter stored in a text file.

The developer then returns the updated counter number from the event which is made accessible within the Dust template.

Events are added to pages in the page specification.

```json
{
  "page": {
    "name": "Book Reviews",
    "description": "A collection of book reviews.",
    "language": "en"
  },
  "settings": {
    "cache": true
  },
  "route": "/reviews",
  "template": "book-reviews.dust",
  "datasources": [
    "books"
  ],
  "events": [
    "addAuthorInformation"
  ]
}
```

#### Sample event file

```js
/**
 * <Event Description>
 *
 * @param {IncomingMessage} req -
 * @param {ServerResponse} res -
 * @param {object} data - contains the data already loaded by the page's datasources and any previous events that have fired
 * @param {function} callback - call back to the controller with two arguments, `err` and the result of the event processing
 */
const Event = (req, res, data, callback) => {
  let result = {}

  if (data.books && data.books.results) {
    result = {
      title: data.books.results[0].title
    }
  }
  else {
    result = {
      title: "Not found"
    }
  }

  // return a null error and the result
  callback(null, result)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
```

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

When the [config option](#web/allowjsonview) is set to `true` you can append `?json=true` to any DADI Web URL and you will see the JSON data which helps construct that page.

This will look similar to the following:

```JSON
{
  "query": {

  },
  "params": {

  },
  "pathname": "/",
  "host": "127.0.0.1:3001",
  "page": {
    "name": "index",
    "description": "An introduction to DADI Web."
  },
  "title": "index",
  "global": {
    "site": "Your site name",
    "description": "An exciting beginning.",
    "timestamp": 1503406193245
  },
  "debug": true,
  "json": true,
  "checkValue": "a0af3ffe22e0961aeaddddc6fff2eb25",
  "posts": {
    "results": [
      ...
    ]
  }
}
```

From here you can see how to construct you templates to output specific variable or loop over particular objects. It is also useful for seeing the output of any Events you have which may output values into the page.

## Security

### CSRF tokens

Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated. CSRF attacks specifically target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request. [More about CSRF](https://github.com/pillarjs/understanding-csrf).

CSRF protection allows developers to use a per-request CSRF token which will be injected into the view model, and ensures that all POST requests supply a correct CSRF token. Without a correct token, with CSRF enabled, users will be greeted with a 403.

To enable CSRF, set the `security.csrf` config option in your `config/config.{env}.json` file:

```
"security": {
  "csrf": true
}
```

Once enabled, the variable `csrfToken` will be injected into the viewModel. You will need to add this to any forms which perform a `POST` using the field name `_csrf`, like so:

```
<form action="/" method="post">
  <input type="text" name="test_input_safe">
  <input type="hidden" name="_csrf" value="{csrfToken}">
  <input type="submit" value="Submit form">
</form>
```

If the CSRF token provided is incorrect, or one isn't provided, then a `403 forbidden` error will occur.

A working example can be found here: [dadi-web-csrf-test](https://github.com/adamkdean/dadi-web-csrf-test).

### SSL
### SSL with a load balancer

## How-to guides

### Migrating from version 2.x to 3.x

**1. Install Dust.js dependency**

Web 3.0 supports multiple template engines. As a consequence, Dust.js is now decoupled from core and needs to be included as a dependency on projects that want to use it.

```
npm install @dadi/web-dustjs --save
```

**2. Change bootstrap script**

The bootstrap script (which you may be calling `index.js`, `main.js` or `server.js`) now needs to inform Web of the engines it has available and which npm modules implement them.

```js
require('@dadi/web')({
  engines: [
    require('@dadi/web-dustjs')
  ]
})
```

**3. Update config**

The `dust` config block has been moved inside a generic `engines` block.

*Before:*

```
"dust": {
  "cache": true,
  "debug": true,
  "debugLevel": "DEBUG",
  "whitespace": true,
  "paths": {
    "helpers": "workspace/utils/helpers"
  }
}
```

*After:*

```
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
}
```

**4. Move partials directory**

Before Web 3.0, Dust templates were separated between the `pages` and `partials` directories, with the former being used for templates that generate a page (i.e. have a route) and the latter being used for partials/includes.

In Web 3.0, all templates live under the same directory (`pages`). The distinction between a page and a partial is made purely by whether or not the template has an accompanying JSON schema file.

Also, pages and partials can now be located in sub-directories, nested as deeply as possible.

To migrate an existing project, all you need to do is move the `partials` directory inside `pages` and everything will work as expected.

*Before:*

```
workspace
|_ pages
|_ partials
```

*After:*
```
workspace
|_ pages
  |_ partials
```

```
mv workspace/partials workspace/pages
```

**5. Update Dust helpers**

If your project is using custom helpers, you might need to change the way they access the Dust engine. You should now access the module directly, rather than reference the one from Web.

```js
// Before
var dust = require('@dadi/web').Dust
require('@dadi/dustjs-helpers')(dust.getEngine())

// After
var dust = require('dustjs-linkedin')
require('@dadi/dustjs-helpers')(dust)
```

### Dealing with form data and Sendgrid

This is an example of an event which uses [SendGrid](https://sendgrid.com/) to send a message from an HTML form.

**`workspace/pages/contact.dust`**

```dust.js
{?mailResult}<p>{mailResult}</p>{/mailResult}

<form action="/contact/" method="post">
  <p>
    <label class="hdr" for="name">Name</label>
    <input autofocus id="name" name="name" placeholder="Your full name" class="normal" type="text">
  </p>
  <p>
    <label class="hdr" for="email">Email</label>
    <input id="email" name="email" required placeholder="Your email address" class="normal" type="email">
  </p>
  <p>
    <label class="hdr" for="phone">Phone</label>
    <input id="phone" name="phone" placeholder="Contact telephone number" class="normal" type="text">
  </p>
  <p>
    <label class="hdr" for="message">Message</label>
    <textarea style="min-height:166px" rows="5" id="message" name="message" required placeholder="What do you want to talk about?" class="normal" type="email"></textarea>
  </p>
  <p>
    <button type="submit">Send message</button>
  </p>
</form>
```

**`workspace/events/contact.js`**

You need a Sendgrid.com API key for this script to work DADI Web should be started with an ENV variable for the SendGrid API key. The IP address of the box it is hosted on also needs to be whitelisted within SendGrid's dashboard.

Optionally you could hardcode your API key, but be careful not to commit the code to a publically acessible GitHub repo.

```JAVASCRIPT
var sg = require('sendgrid')(process.env['SENDGRID_API'])

var Event = function (req, res, data, callback) {

  // On form post
  switch (req.method.toLowerCase()) {
    case 'post':

      // Validate out inputs
      if (req.body.email && isEmail(req.body.email) && req.body.message) {

        var message = "Name: "+req.body.name+"\n\nEmail: "+req.body.email+"\n\nPhone: "+req.body.phone+"\n\nMessage:\n\n"+req.body.message

        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: {
            personalizations: [{
              to: [{
                email: 'hello@dadi.tech',
              }],
              subject: '[dadi.tech] Contact form message',
            }],
            from: {
              email: 'hello@dadi.tech',
            },
            content: [{
              type: 'text/plain',
              value: message,
            }],
          }
        })

        sg.API(request, function(error, response) {
          if (error) {
            data.mailResult = 'There was a problem sending the email.'
          } else {
            data.mailResult = 'Thank you for your message, you will hear back from us soon.'
          }

          callback()
        })

      } else {
        data.mailResult = 'All fields are required.'
        callback()
      }

    break
  default:
      return callback()
  }

}

// Taken from: http://stackoverflow.com/a/46181/306059
function isEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(email)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
};
```

## Errors

### WEB-0004

Datasource not found