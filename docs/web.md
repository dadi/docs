---
title: Web
---

## Installation

### NPM

All our platform microservices are available from [NPM](https://www.npmjs.com/). To install *Web*.

```console
$ npm install @dadi/web
```

### Manual install

If you do not want to use NPM, you can grab the latest [release](https://github.com/dadi/web/releases). Then you can install:

```console
$ cd ./release-download-location/
$ npm install
```

### Dependencies

You can see our full list of dependencies in the [package.json](https://github.com/dadi/web/blob/master/package.json).

### Tests

If you have installed manually, you can run tests by:

```console
$ npm run test
```

### Forever (optional)

As with most Node.js applications, to run the app in the background you will need to install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service):

``` console
$ [sudo] npm install forever -g
$ [sudo] npm install -g forever-service
```

Install DADI Web as a service and ensure it loads on boot:

```console
$ [sudo] forever-service install -s main.js -e NODE_ENV=production web --start
```

**Note** the environment variable `NODE_ENV=production` must be set to target the required config version.

You can then interact with the service using the following command:

```console
$ [sudo] start web
$ [sudo] stop web
$ [sudo] status web
$ [sudo] restart web
```

**And you're done, now move on to [configuration](/web/getting-started/configuration/).**

## Configuration

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

### Advanced configuration

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
    "dust": {
      "cache": true,
      "debug": false,
      "debugLevel": "INFO",
      "whitespace": false
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
      "sslPassphrase": "<your ssl passphrase here>",
      "sslPrivateKeyPath": "<your ssl private key path here>",
      "sslCertificatePath": "<your ssl certificate path here>"
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
    }
    "debug": true,
    "allowJsonView": true
}
```

### Property Description

Property      | Description                                                                                        | Default value | Example
:------------ | :------------------------------------------------------------------------------------------------- | :------------ | :------
debug         | If true, enables a debug panel on every page containing the loaded data and execution stats        | false         | true
allowJsonView | If true, allows ?json=true in the querystring to return a view of the raw data loaded for the page | false         | true

#### server

Property                        | Description                                                                                     | Default value | Example
:------------------------------ | :---------------------------------------------------------------------------------------------- | :------------ | :-----------------------------------------------------
host                            | The hostname or IP address to use when starting the Web server                                  |               | "www.example.com"
port                            | The port to bind to when starting the Web server                                                |               | 3000
socketTimeoutSec                | The number of seconds to wait before closing an idle socket                                     | 30            | 10
protocol                        | The protocol the web application will use                                                       | http          | https
sslPassphrase                   | The passphrase of the SSL private key                                                           |               | secretPassword
sslPrivateKeyPath               | The filename of the SSL private key                                                             |               | /etc/ssl/key.pem
sslCertificatePath              | The filename of the SSL certificate                                                             |               | /etc/ssl/cert.pem
sslIntermediateCertificatePath  | The filename of an SSL intermediate certificate, if any                                         |               | /etc/ssl/ca.pem
sslIntermediateCertificatePaths | The filenames of SSL intermediate certificates, overrides sslIntermediateCertificate (singular) | []            | [ '/etc/ssl/ca/example.pem', '/etc/ssl/ca/other.pem' ]

#### api

Property | Description                                                  | Default value | Example
:------- | :----------------------------------------------------------- | :------------ | :----------------
host     | The hostname or IP address of the API instance to connect to |               | "api.example.com"
port     | The port of the API instance to connect to                   |               | 3001
enabled  | If false, the web server runs in stand-alone mode            | true          | false

#### auth

Property | Description                                                    | Default value | Example
:------- | :------------------------------------------------------------- | :------------ | :------------
tokenUrl | The endpoint to use when requesting Bearer tokens from the API |               | "/token"
clientId |                                                                |               | "test123"
secret   |                                                                |               | "your-secret"

#### caching

Property            | Description                                                                                                                                                   | Default value | Example
:------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ | :------------------------
ttl                 |                                                                                                                                                               |               | 300
directory           | Configuration block for caching using a local filesystem directory                                                                                            |               |
directory.enabled   | If true, cache files will be stored on disk using the settings below. Either directory or redis caching must be enabled for caching to work.                  | true          | true
directory.path      | The directory to use for storing cache files, relative to the root of the application. Automatically created at startup if it doesn't exist.                  | "./cache/web" |
directory.extension | The file extension to use for cache files                                                                                                                     | "html"        |
redis               | Configuration block for caching using a Redis caching service                                                                                                 |               |
redis.enabled       | If true, cache files will be stored in the Redis cache store using the settings below. Either directory or redis caching must be enabled for caching to work. | false         | true
redis.host          | The host for the Redis caching service                                                                                                                        | ""            | See example config above.
redis.port          | The port for the Redis caching service                                                                                                                        | 6379          | 6379

#### dust

Property   | Description | Default value | Example
:--------- | :---------- | :------------ | :------
cache      |             | true          | true
debug      |             | true          | true
debugLevel |             | "DEBUG"       | "DEBUG"
whitespace |             | true          | false

#### headers

Property           | Description                                                       | Default value                                                                                                                            | Example
:----------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------
useGzipCompression | If true, compresses the reponse using GZip                        | true                                                                                                                                     | true
cacheControl       | A set of custom cache-control headers for different content types | `{ "text/css": "public, max-age=86400", "text/javascript": "public, max-age=86400", "application/javascript": "public, max-age=86400" }` | `"cacheControl": { "text/css": "public, max-age=1000" }`

#### logging

Property           | Description                                                                                                                                                                                                                                                                | Default value | Example
:----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------------
enabled            | If true, logging is enabled using the following settings.                                                                                                                                                                                                                  | true          | true
level              | The level at which log messages will be written to the log file.                                                                                                                                                                                                           | "info"        | "warn"
path               | The absolute or relative path to the directory for log files.                                                                                                                                                                                                              | "./log"       | "/data/app/log"
filename           | The filename to use for the log files. The name you choose will be given a suffix indicating the current application environment.                                                                                                                                          | "dadi-web"    | "your_application_name"
extension          | The extension to use for the log files.                                                                                                                                                                                                                                    | "log"         | "txt"                                                                     

#### logging.accessLog

Property           | Description                                                                                                                                                                                                                                                                       | Default value | Example
:----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :----------------
enabled            | If true, HTTP access logging is enabled. The log file name is similar to the setting used for normal logging, with the addition of 'access'. For example `dadi-web.access.log`.                                                                                                   | true          | true
kinesisStream      | An [AWS Kinesis](https://aws.amazon.com/kinesis/streams/) stream to write to log records to.                                                                                                                                                                                                                                 | ""            | "web_aws_kinesis"

#### aws

Property        | Description | Default value | Example
:-------------- | :---------- | :------------ | :------
accessKeyId     |             | ""            | ""
secretAccessKey |             | ""            | ""
region          |             | ""            | ""

#### rewrites

Property           | Description                                                                                       | Default value | Example
:----------------- | :------------------------------------------------------------------------------------------------ | :------------ | :------------------------------
datasource         | The name of a datasource used to query the database for redirect records matching the current URL | ""            | "redirects"
path               | The path to a file containing rewrite rules                                                       | ""            | "workspace/routes/rewrites.txt"
forceLowerCase     | If true, converts URLs to lowercase before redirecting                                            | false         | true
forceTrailingSlash | If true, adds a trailing slash to URLs before redirecting                                         | false         | true
stripIndexPages    | A set of common index page filenames to remove from URLs.                                         | []            | ['index.php', 'default.aspx']

#### global

The `global` section can be used for any application parameters that should be available for use in page templates, such as asset locations, 3rd party account identifiers, etc

```javascript
"global" : {
  "baseUrl": "http://www.example.com"
}
```

In the above example `baseUrl` would be availabe to a page template and could be used in the following way:

```html
<html>
<body>
  <h1>Welcome to DADI Web</h1>
  <img src="{baseUrl}/images/welcome.png"/>
</body>
</html>
```

#### paths

Paths can be used to configure where any folder of the app assets are located.

## Connecting API

If you are using _Web_ in conjunction with [DADI API](https://dadi.tech/platform/api) you can connect it so you make use of it with datasources.

You can connect to an instance of _API_ that exists locally, or on a remote address easily.

```json
"api": {
  "host": "localhost",
  "port": 1337
},
"auth": {
  "tokenUrl":"/token",
  "clientId":"webClient",
  "secret":"secretSquirrel"
}
```

When you boot _Web_ you should see something similar to this message in the commandline if you have succesfully connected:

```
----------------------------
Your Project
Started 'DADI Web'
----------------------------
Server:      localhost:3000
Version:     X.X.X
Node.JS:     4.6
Environment: development
API:         localhost:1337
```

## Migrating from v2 to v3

### 1. Install Dust.js dependency

Web 3.0 supports multiple template engines. As a consequence, Dust.js is now decoupled from core and needs to be included as a dependency on projects that want to use it.

```
npm install @dadi/web-dustjs --save
```

### 2. Change bootstrap script

The bootstrap script (which you may be calling `index.js`, `main.js` or `server.js`) now needs to inform Web of the engines it has available and which npm modules implement them.

```js
require('@dadi/web')({
  engines: [
    require('@dadi/web-dustjs')
  ]
})
```

### 3. Update config

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

### 4. Move partials directory

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

### 5. Update Dust helpers

If your project is using custom helpers, you might need to change the way they access the Dust engine. You should now access the module directly, rather than reference the one from Web.

```js
// Before
var dust = require('@dadi/web').Dust
require('@dadi/dustjs-helpers')(dust.getEngine())

// After
var dust = require('dustjs-linkedin')
require('@dadi/dustjs-helpers')(dust)
```

## The "Hello World" App

This is a brief outline of the minimum files you might need to an app to say "hello world". The folder structure looks like:

```
your-project/
  web/
    package.json
    main.js
    config/
      config.development.json
    workspace/
      datasources/
        greeting.json
      pages/
        index.json
        index.dust
      partials/
        header.dust
        footer.dust
      public/
        styles.css
    node_modules/ # Location of Web after installing
  api/
  cdn/
```

### package.json

This is where we manage the _Web_ dependency and also tell _Node.js_ how to run our app when we `$ npm start`.

```json
{
  "name": "your-project",
  "version": "0.0.1",
  "author": "Your Name <hello@example.com>"
  "description": "Just me getting started with DADI Web.",
  "main": "main.js",
  "scripts": {
    "start": "NODE_ENV=development node main.js"
  },
  "dependencies": {
    "@dadi/web": "^v1.7.0"
  },
  "engines": {
    "node": ">=4.6.0",
    "npm": ">3.0.0"
  }
}
```

`main.js`

This is where we reference the installation of _Web_ for booting.

```javascript
require('@dadi/web')
```

`/config/config.development.json`

For this example we will use this basic configuration.

```json
{
  "app": {
    "name": "Hello World"
  },
  "server": {
    "host": "127.0.0.1",
    "port": 3000
  },
  "api": {
    "enabled": false
  },
  "paths": {
    "datasources": "workspace/datasources",
    "pages": "workspace/pages",
    "partials": "workspace/partials",
    "public": "workspace/public"
  }
}
```

See [configuration](/web/getting-started/configuration/) for full information.

### workspace

This is the heart of the project lives. We can organise this how we like in time - the `config.json` can be updated to let it know where to find the core files it needs to run. We can also store our front-end assets in here.

#### workspace/datasources/greeting.json

You can read more about datasources later, but for now we are using a static datasource to keep things simple.

```json
{
  "datasource": {
    "key": "greeting",
    "name": "A statically loaded greeting.",
    "source": {
      "type": "static",
      "data": {
        "message": "hello world!"
      }
    }
  }
}
```

#### workspace/pages/index.json

This is how we define a page (or section) of our project. Again, you can read more about advanced configuration options later.

Notice we are referencing the datasource we created by its assigned `key`.

```json
{
  "page": {
    "name": "Homepage"
  },
  "datasources": [
    "greeting"
  ],
  "routes": [
    {
    "path": "/"
    }
  ]
}
```

#### workspace/pages/index.dust

_Web_ uses [Dust.js](http://www.dustjs.com/) as it's templating language.

As a datasource acts as a collection, to get our greeting, we have to select the first result.

```js
{>"partials/header" /}

<h1>All being well we should see "Hello world!" below:</h1>
<p><em>{greeting.results[0].message}</em></p>

{>"partials/footer" /}
```

If you need to check what your datasource is returning, you can use the Dust.js helper `{@contextDump/}`.

### workspace/partials/header.dust

This is a typical Dust.js partial.

```html
<!DOCTYPE html>
<html>
<head>
  <title>DADI Web saying hi!</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
```

#### workspace/partials/footer.dust

Finishing what we started.

```html
</body>
</html>
```

#### workspace/public/styles.css

Giving it all a lick of paint:

```css
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #fff;
}
h1 {
  color: red;
}
```

### Start the app

Now let's start the app.

```console
$ npm install
$ npm start

----------------------------
Hello World
Started 'DADI Web'
----------------------------
Server:      127.0.0.1:3000
Version:     X.X.X
Node.JS:     4.4
Environment: development
API:         Not found
----------------------------
```

Now open up your browser and navigate to [127.0.0.1:3000](http://127.0.0.1:3000).

Hello world!
