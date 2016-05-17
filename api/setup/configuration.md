---
title: Configuration
permalink: /api/setup/configuration/
---

## Overview

Configuration files control the behaviour of your API. While DADI API starts with default values for many configuration settings, it is essential that you understand how each setting affects your application.

To most important configuration blocks for starting your API are [server](#server), [database](#database) and [authentication](#auth).

### Configuration Files

Configuration settings are defined in JSON files within a `/config` directory at the root of your application. DADI API has provision for multiple configuration files, one for each environment that your API is expected to run under: `development`, `qa` and `production`.

The naming convention for configuration files follows the format `config.<environment>.json`

For example:

```
config.development.json
config.qa.json
config.production.json
```

### Application Anatomy

```
my-api/
  config/            # contains environment-specific
                     # configuration properties
    config.development.json
    config.qa.json
    config.production.json

  main.js            # the entry point of the app

  package.json

  workspace/
    collections/     # collection schema files
    endpoints/       # custom Javascript endpoints

```

### Loading an environment configuration file

DADI API loads the `development` configuration by default. Loading an enviroment-specific configuration can be done in one of two ways:

#### 1. Environment Variable

Set an environment variable called `NODE_ENV` with the value of the environment you wish to run your application under.  

```
export NODE_ENV=production
```

#### 2. Command Line Argument

Pass an argument to Node when starting your application with the value of the environment you wish to run your application under.  

```
node main.js --node-env=production
```

### Example configuration file

An example file containing all of the available configuration options can be found in `/config/config.development.json.sample`.


## Configuration Options

### app

Application-specific settings, such as `name`.

```
"app": {
  "name": "My API"
}
```

### server

Specifies `host` and `port` to begin accepting connections on. If the `host` is omitted or `null`,
the server will accept connections on any IPv6 address (::) when IPv6 is available,
or any IPv4 address (0.0.0.0) otherwise.

A `port` value of zero will assign a random port.

**NB:** You should be able to set `host` to your IP address as well, but depending on your hosting that may be tricky.
On AWS you would need to use your private IP instead of your public IP, or alternatively use `0.0.0.0` which has already been proven to work without fail.

```
"server": {
  "host": '0.0.0.0',
  "port": 80
}
```

### database

Specifies the MongoDB database(s) to connect to.

```
"database": {
  "hosts": [
      {
        "host": "127.0.0.1",
        "port": 27017
      }
    ],
  "database": "myApi",
  "username": "apiUser",
  "password": "apiPassword",
  "ssl": false,
  "replicaSet": false,
  "enableCollectionDatabases": false
}
```

**database.hosts**: must contain an array of hosts each with `host` and `port`.

 * Hosts may be specified using an IP address or hostname.
 * If only using a single MongoDB instance this array needs only one host.

Multiple hosts are required for a replica set or sharded setup and may look similar to the following example using [MongoLab](https://mongolab.com) databases:


```
"database": {
  "hosts": [
      {
        "host": "ds012345-z1.mongolab.com",
        "port": 12345
      },
      {
        "host": "ds012345-z2.mongolab.com",
        "port": 12345
      },
      {
        "host": "ds012345-z3.mongolab.com",
        "port": 12345
      }
    ],
  "database": "myApi",
  "username": "apiUser",
  "password": "apiPassword",
  "ssl": false,
  "replicaSet": "rs0001"
}
```

This configuration will produce the following MongoDB connection string:

```
mongodb://apiUser:apiPassword@ds012345-z1.mongolab.com:12345,ds012345-z2.mongolab.com:12345,ds012345-z3.mongolab.com:12345/myApi?replSet=rs0001
```

The Node.JS MongoDB driver handles communication with the database servers to determine the primary instance.

### Collection-specific Databases

The `enableCollectionDatabases` setting determines whether the API will store collection data in separate databases as defined by the collection URLs.

```
/1.0/library/books
```

The URL format contains three segments:

 * API version: "1.0"
 * Database: "library"
 * Collection: "books"

If `enableCollectionDatabases: true` the API will store the `books` data in the `library` database, regardless of the `database` setting in the configuration file.

Otherwise, if `enableCollectionDatabases: false` the API will store the `books` data (and all other collection data) in the database specified in the configuration file's `database` setting.


#### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
hosts | An array of database hosts to connect to | Array | [ { host: "127.0.0.1", port: 27017 } ] } | ""
database | The database in which to store collection data  | String | "" | "myApi"
username | The username used to connect to the database  | String | "" | "apiUser"
password | The password used to connect to the database | String | "" | "apiPassword"
ssl |  | Boolean | false | true
replicaSet | If false, the API will not attempt to connect to a replica set. If a string value, the API will use this value in the connection string to connect to a replica set  | Boolean/String | false | "s0001"
enableCollectionDatabases | If true, the API allows splitting collection data into separate databases | Boolean | false | true


### auth

```
"auth": {
  "tokenUrl": "/token",
  "tokenTtl": 1800,
  "clientCollection": "clientStore",
  "tokenCollection": "tokenStore",
  "database": {
    "hosts": [
      {
        "host": "127.0.0.1",
        "port": 27017
      }
    ],
    "database": "myApi",
    "username": "apiUser",
    "password": "apiPassword"
  }
}
```

#### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
tokenUrl | The path that access token POST requests should be sent to | String | "/token" | |
tokenTtl | The time, in seconds, after which an access token is revoked | Number | 1800 | |
clientCollection | The database collection that will contain client records | String | "clientStore" |
tokenCollection | The database collection that will contain access tokens generated for authorised clients | String | "tokenStore" |
**database** | **Specifies the authentication database settings**  |
database.hosts | An array of database hosts to connect to for authorisation | Array | [ { host: "127.0.0.1", port: 27017 } ] } | ""
database.database | The database to use for authorisation | String | "" | "myApi"
database.username | The username used to connect to the authorisation database | String | "" | "apiUser"
database.password | The password used to connect to the authorisation database | String | "" | "apiPassword"


### caching

Enabling caching in your API allows previously requested and cached data to be returned early in the request cycle, decreasing the number of requests sent to the database.

```
"caching": {
  "enabled": true,
  "ttl": 300,
  "directory": "./cache/api/",
  "extension": "json"
}
```

#### Collection Caching Settings

While caching can be enabled in the configuration file, whether or not caching is enabled for a particular collection also depends on the `cache` setting in that collection's schema file. For example:

```
{
  "fields": {
    "field1": {
      "type": "String"
    }
  },
  "settings": {
    "cache": true
  }
}
```


#### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
enabled            | If true, caching is enabled   | Boolean     | true |
ttl            | The time, in seconds, after which cached data is considered stale   | Number     | 300 | 1800
directory            |  The path relative to the root of the application where cache files should be stored   | String     |"./cache/api" | "/tmp/api/cache"
extension            |     | String     |"json" | "txt"


### logging

Logging is enabled by default with the below settings.

 * The specified path will be created at startup if it doesn't exist.
 * The actual log filename will contain a reference to the environment that is loaded. For example, running the application in `development` mode with the default configuration will produce a log file at `./log/api.development.log`

```
"logging": {
  "enabled": true,
  "path": "./log",
  "filename": "api",
  "extension": "log",
  "accessLog": {
    "enabled": true,
    "fileRotationPeriod": "1d",
    "fileRetentionCount": 7,
    "kinesisStream": ""
  }
}
```

#### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
enabled            | If true, logging is enabled   | Boolean     | true |
path            | The path relative to the root of the application where log files should be stored   | String     | "./log" | "/var/log/api"
filename            |     | String     |"api" | "your-application-name"
extension            |     | String     |"log" | "txt"
  -          |    |   |  |
**accessLog**            | **Allows configuration of HTTP request logging**   |   |  |
accessLog.enabled            | If true, HTTP requests are logged to a separate file. The filename used will be a combination of `logging.filename` + access + `logging.extension`. For example, `api.access.log`  | Boolean     | true |
accessLog.fileRotationPeriod            | The period at which to rotate the access log file. This is a string of the format '$number$scope' where '$scope' is one of 'ms' (milliseconds), 'h' (hours), 'd' (days), 'w' (weeks), 'm' (months), 'y' (years).  | String     | "1d" | "1w", "2w". In addition, the following names can be used "hourly", "daily", "weekly", "monthly", "yearly".
accessLog.fileRetentionCount            | The number of rotated log files to keep  | Number     | 7 | 14
accessLog.kinesisStream            | The name of an AWS Kinesis stream to write to log records to | String     | Empty, therefore disabled  | "apiLogStream"

### aws
Amazon Web Service client key

### paths

Specifies the location of collection schema files and custom endpoints, relative to the application route. The default configuration is shown below, these values will be used if no `paths` configuration is provided.

```
"paths": {
  "collections": '/workspace/collections',
  "endpoints": '/workspace/endpoints'
}
```

### query

Controls aspects of the query that is sent to the database/

```
"query": {
  "useVersionFilter": true
}
```

Property           | Description                 | Default value  |  Example
:------------------|:----------------------------|:---------------|:--------------
useVersionFilter   | If true, the apiVersion parameter is extracted from the GET request URL and used in the database query. For example `/1.0/library/books` will pass the following query to the database `{ "apiVersion": "1.0" }`     | false    | true


### feedback

Specifies whether the API should return content when deleting records from a collection.

```
"feedback": false
```

Given a successful DELETE request, the `feedback` setting determines the response to be returned:

 * If false, `204 No Content` HTTP status.
 * If true, `200 OK` and a response body such as the following:

```
{
  status: 'success',
  message: 'Document deleted successfully'
}
```

### apidoc

This configuration section controls the behaviour of the DADI API Documentation module, if installed.

Install the package:

```
npm install dadi-apidoc --save
```

Add a configuration section to your configuration file(s):

```
"apidoc": {
  "title": "API Documentation",
  "description": "This is the Content API for a RESTful API in JSON built on DADI API.",
  "markdown": false,
  "path": "/docs",
  "generateCodeSnippets": true
}
```

#### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
title | The title to display for the API documentation | String | "API Documentation" |
description  | A markdown formatted description of the API documentation | String | "This is the Content API for a RESTful API in JSON built on DADI API." |
markdown | If true, documentation is rendered as raw Markdown | Boolean | false | true
path | The location in which to save an API blueprint file in Markdown format | String | "/docs" |
generateCodeSnippets | If true, code examples are generated from the documentation | Boolean | false | true |
themeVariables | | String | "default" |
themeTemplate | | String | "default" |
themeStyle | | String | "default" |
themeCondenseNav | | Boolean | true |
themeFullWidth | | Boolean | false |
