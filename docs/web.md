---
title: Web
---

## Installation

### Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

* **[Node.js](https://www.nodejs.org/)** (current LTS version)

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
---------------|----------------------|-----
/books/war-and-peace           |    `war-and-peace` | `{ title: "war-and-peace" }`
/books/sisters-brothers           |    `sisters-brothers` | `{ title: "sisters-brothers" }`

#### Optional Parameters

Parameters can be made optional by adding a question mark `?`.

For example the route `/books/:page?` will match requests in both the following formats:

| URL | Matched? | Named Parameters | Request Parameters `req.params`         
:---------------|:------|:---------------------|------
| /books  | Yes|| `{}`
| /books/2 | Yes | `:page` | `{ page: "2" }`

#### Parameter Format

Specifying a format for a parameter can help Web identify the correct route to use. We can use the same example as above, where the URL has an optional `page` parameter. If we add a regular expression to this parameter indicating that it should only match numbers, any URL that doesn't contain numbers in this segment will not match the route.

**Example**

The route `/books/:page(\\d+)` will only match a URL that has `books` in the first segment and a number in the second segment:

| URL | Matched? | Named Parameters  | Request Parameters `req.params`         
:---------------|:--------|:---------------------|------
| /books/war-and-peace | No ||
| /books/2 | Yes | `:page` | `{ page: "2" }`

> N.B. DADI Web uses the [Path to Regexp](https://github.com/pillarjs/path-to-regexp) library when parsing routes and parameters. More information on parameter usage can be found in the Github repository.


### Multiple Route Pages

The `routes` property makes it easy for you to define "multiple route" pages, where one page specification can respond to requests for multiple routes.

**DADI Web versions >= 1.7.0**

DADI Web 1.7.0 introduced a more explicit way of specifying multiple routes per page . The `route` property has been replaced with `routes` which should be an Array of route objects.

Each route object must contain, at the very least, a `path` property. At startup, Web adds the value of each `path` property to an internal collection of routes for matching incoming requests.

In this example, the same page (and therefore it's template) will be loaded for requests matching any of the formats specified by the `path` properties:

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

### Route Priority

DADI Web sorts your routes into a priority order so that the most likely matches are easier to find.

* In Web, the most important parts of a route are the static segments, or rather the non-dynamic segments, for example `/books`. The more static segments in a route the its priority.
* The second most important parts are the mandatory dynamic segments, for example `/:title`.
* The least important parts are the optional dynamic segments, for example `/:year?`.
* Any route with a `page` parameter gets a slight edge, with 1 point being added to its priority.

| Path | Priority |
|:---|:---------|
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
---
date: 2016-02-17
title: Your title here
---
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
  "original": "---\ndate: 2016-02-17\ntitle: Your title here\n---\nSome *markdown*",
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
### Dealing with form data & Sendgrid

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



