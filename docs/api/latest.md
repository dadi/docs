---
title: API
published: true
product: api
version: latest
---

## Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

## Creating an API

The easiest way to install API is using DADI CLI. CLI is a command line application that can be used to create and maintain installations of DADI products. Follow the simple instructions below, or see [more detailed documentation for DADI CLI](/cli).

### Install DADI CLI

```console
$ npm install @dadi/cli -g
```

### Create new API installation

There are two ways to create a new API with the CLI: either manually create a new directory for API or let CLI handle that for you. DADI CLI accepts an argument for `project-name` which it uses to create a directory for the installation.

*Manual directory creation*

```console
$ mkdir my-api
$ cd my-api
$ dadi api new
```

*Automatic directory creation*

```console
$ dadi api new my-api
$ cd my-api
```

DADI CLI will install the latest version of API and copy a set of files to your chosen directory so you can launch API almost immediately.

> **Installing DADI API directly from NPM**
>
> All DADI platform microservices are also available from [NPM](https://www.npmjs.com/). To add *API* to an existing project as a dependency:

> ```console
> $ cd my-existing-node-app
> $ npm install --save @dadi/api
> ```
> -- advice


## Application Anatomy

When CLI finishes creating your API, the application directory will contain the basic requirements for launching your API. The following directories and files have been created for you:

```console
my-api/
  config/              # contains environment-specific configuration files
    config.development.json
  server.js            # the entry point for the application
  package.json
  workspace/
    collections/       # collection specification files
    endpoints/         # custom JavaScript endpoints
```

## Configuration

API reads a series of configuration parameters to define its behaviour and to adapt to each environment it runs on. These parameters are defined in JSON files placed inside the `config/` directory, named as `config.{ENVIRONMENT}.json`, where `{ENVIRONMENT}` is the value of the `NODE_ENV` environment variable. In practice, this allows you to have different configuration parameters for when API is running in development, production and any staging, QA or anything in between, as per the requirements of your development workflow.

Some configuration parameters also have corresponding environment variables, which will override whatever value is set in the configuration file.

The following table shows a list of all the available configuration parameters.

| Path | Description | Environment variable | Default | Format
|:--|:--|:--|:--|:--
| `app.name` | The applicaton name | *N/A* | `DADI API Repo Default` | String
| `publicUrl.host` | The host of the URL where the API instance can be publicly accessed at | `URL_HOST` | `` | *
| `publicUrl.port` | The port of the URL where the API instance can be publicly accessed at | `URL_PORT` | `` | *
| `publicUrl.protocol` | The protocol of the URL where the API instance can be publicly accessed at | `URL_PROTOCOL` | `http` | String
| `server.host` | Accept connections on the specified address. If the host is omitted, the server will accept connections on any IPv6 address (::) when IPv6 is available, or any IPv4 address (0.0.0.0) otherwise. | `HOST` | `` | *
| `server.port` | Accept connections on the specified port. A value of zero will assign a random port. | `PORT` | `8081` | Number
| `server.redirectPort` | Port to redirect http connections to https from | `REDIRECT_PORT` | `` | port
| `server.protocol` | The protocol the web application will use | `PROTOCOL` | `http` | String
| `server.sslPassphrase` | The passphrase of the SSL private key | `SSL_PRIVATE_KEY_PASSPHRASE` | `` | String
| `server.sslPrivateKeyPath` | The filename of the SSL private key | `SSL_PRIVATE_KEY_PATH` | `` | String
| `server.sslCertificatePath` | The filename of the SSL certificate | `SSL_CERTIFICATE_PATH` | `` | String
| `server.sslIntermediateCertificatePath` | The filename of an SSL intermediate certificate, if any | `SSL_INTERMEDIATE_CERTIFICATE_PATH` | `` | String
| `server.sslIntermediateCertificatePaths` | The filenames of SSL intermediate certificates, overrides sslIntermediateCertificate (singular) | `SSL_INTERMEDIATE_CERTIFICATE_PATHS` | `` | Array
| `datastore` | The name of the NPM module to use as a data connector for collection data | *N/A* | `@dadi/api-mongodb` | String
| `auth.tokenUrl` | The endpoint for bearer token generation | *N/A* | `/token` | String
| `auth.tokenTtl` | Number of seconds that bearer tokens are valid for | *N/A* | `1800` | Number
| `auth.clientCollection` | Name of the collection where clientId/secret pairs are stored | *N/A* | `clientStore` | String
| `auth.tokenCollection` | Name of the collection where bearer tokens are stored | *N/A* | `tokenStore` | String
| `auth.datastore` | The name of the NPM module to use as a data connector for authentication data | *N/A* | `@dadi/api-mongodb` | String
| `auth.database` | The name of the database to use for authentication | `DB_AUTH_NAME` | `test` | String
| `auth.cleanupInterval` | The interval (in seconds) at which the token store will delete expired tokens from the database | *N/A* | `3600` | Number
| `caching.ttl` | Number of seconds that cached items are valid for | *N/A* | `300` | Number
| `caching.directory.enabled` | If enabled, cache files will be saved to the filesystem | *N/A* | `true` | Boolean
| `caching.directory.path` | The relative path to the cache directory | *N/A* | `./cache/api` | String
| `caching.directory.extension` | The extension to use for cache files | *N/A* | `json` | String
| `caching.directory.autoFlush` | If true, cached files that are older than the specified TTL setting will be automatically deleted | *N/A* | `true` | Boolean
| `caching.directory.autoFlushInterval` | Interval to run the automatic flush mechanism, if enabled in `autoFlush` | *N/A* | `60` | Number
| `caching.redis.enabled` | If enabled, cache files will be saved to the specified Redis server | `REDIS_ENABLED` | `` | Boolean
| `caching.redis.host` | The Redis server host | `REDIS_HOST` | `127.0.0.1` | String
| `caching.redis.port` | The port for the Redis server | `REDIS_PORT` | `6379` | port
| `caching.redis.password` | The password for the Redis server | `REDIS_PASSWORD` | `` | String
| `logging.enabled` | If true, logging is enabled using the following settings. | *N/A* | `true` | Boolean
| `logging.level` | Sets the logging level. | *N/A* | `info` | `debug` or `info` or `warn` or `error` or `trace`
| `logging.path` | The absolute or relative path to the directory for log files. | *N/A* | `./log` | String
| `logging.filename` | The name to use for the log file, without extension. | *N/A* | `api` | String
| `logging.extension` | The extension to use for the log file. | *N/A* | `log` | String
| `logging.accessLog.enabled` | If true, HTTP access logging is enabled. The log file name is similar to the setting used for normal logging, with the addition of \"access\". For example `api.access.log`. | *N/A* | `true` | Boolean
| `logging.accessLog.kinesisStream` | An AWS Kinesis stream to write to log records to. | `KINESIS_STREAM` | `` | String
| `paths.collections` | The relative or absolute path to collection specification files | *N/A* | `workspace/collections` | String
| `paths.endpoints` | The relative or absolute path to custom endpoint files | *N/A* | `workspace/endpoints` | String
| `paths.hooks` | The relative or absolute path to hook specification files | *N/A* | `workspace/hooks` | String
| `feedback` | If true, responses to DELETE requests will include a count of deleted and remaining documents, as opposed to an empty response body | *N/A* | `` | Boolean
| `status.enabled` | If true, status endpoint is enabled. | *N/A* | `` | Boolean
| `status.routes` | An array of routes to test. Each route object must contain properties `route` and `expectedResponseTime`. | *N/A* | `` | Array
| `query.useVersionFilter` | If true, the API version parameter is extracted from the request URL and passed to the database query | *N/A* | `` | Boolean
| `media.defaultBucket` | The name of the default media bucket | *N/A* | `mediaStore` | String
| `media.buckets` | The names of media buckets to be used | *N/A* | `` | Array
| `media.tokenSecret` | The secret key used to sign and verify tokens when uploading media | *N/A* | `catboat-beatific-drizzle` | String
| `media.tokenExpiresIn` | The duration a signed token is valid for. Expressed in seconds or a string describing a time span (https://github.com/zeit/ms). Eg: 60, \"2 days\", \"10h\", \"7d\" | *N/A* | `1h` | *
| `media.storage` | Determines the storage type for uploads | *N/A* | `disk` | `disk` or `s3`
| `media.basePath` | Sets the root directory for uploads | *N/A* | `workspace/media` | String
| `media.pathFormat` | Determines the format for the generation of subdirectories to store uploads | *N/A* | `date` | `none` or `date` or `datetime` or `sha1/4` or `sha1/5` or `sha1/8`
| `media.s3.accessKey` | The AWS access key used to connect to S3 | `AWS_S3_ACCESS_KEY` | `` | String
| `media.s3.secretKey` | The AWS secret key used to connect to S3 | `AWS_S3_SECRET_KEY` | `` | String
| `media.s3.bucketName` | The name of the S3 bucket in which to store uploads | `AWS_S3_BUCKET_NAME` | `` | String
| `media.s3.region` | The AWS region | `AWS_S3_REGION` | `` | String
| `env` | The applicaton environment. | `NODE_ENV` | `development` | String
| `cluster` | If true, API runs in cluster mode, starting a worker for each CPU core | *N/A* | `` | Boolean
| `cors` | If true, responses will include headers for cross-domain resource sharing | *N/A* | `` | Boolean
| `internalFieldsPrefix` | The character to be used for prefixing internal fields | *N/A* | `_` | String
| `databaseConnection.maxRetries` | The maximum number of times to reconnection attempts after a database fails | *N/A* | `10` | Number

## Authentication

DADI API provides a full-featured authentication layer based on the [Client Credentials flow of oAuth 2.0](http://oauthbible.com/#oauth-2-two-legged). By default all requests to collection endpoints in API require a user to have first been authenticated. Read the following to learn what's involved in authenticating against your DADI API.

### Client Store

At the heart of API's authentication mechanism is an internal "client store" collection. The default name for this collection is `clientStore` but this can be modified using the configuration property `auth.clientCollectionName`.

The client store collection holds information about "clients" that are able to connect to the API. Think of a client as your website, mobile application or any application that should be allowed to access your API. The client credentials are used to obtain access tokens for communicating with the API.

Each client record consists of a `clientId`, `secret` and `accessType`.

```json
{
  "clientId": "your-client-key",
  "secret": "your-client-secret",
  "accessType": "user"
}
```

The `accessType` property accepts one of two values: `admin` or `user`. An `admin` client is able to perform configuration and maintenance on the API using internal REST endpoints and the REST collection endpoints. A `user` client is, with no other access controls in place, simply able to read and write data using the REST collection endpoints.

> **Setting strong client secrets**
>
> It's important that you choose a strong secret for each of your client records. Generating a strong password can be handled by a number of online services. We regularly use https://www.random.org/passwords/ and https://strongpasswordgenerator.com/ to generate secrets for our client records.
>
> -- advice

Once you have client records in the database, you can request an access token for to continue communicating with the API. See [Obtaining an Access Token](#obtaining-an-access-token).

### Adding Clients

If you've installed [DADI CLI](/cli) you can use that to create a new client in the database. See instructions for [Adding Clients with CLI](/cli#api-clientsadd).

Alternatively, use the built in NPM script to start the Client Record Generator which will present you with a series of questions about the new client and insert a record into the configured database.

```console
$ npm explore @dadi/api -- npm run create-client
```

> **Creating the client in the correct database**
>
> To ensure the correct database is used for your environment, add an environment variable to the command:
>
> ```console
> $ NODE_ENV=production npm explore @dadi/api -- npm run create-client
> ```
> -- warning

### Collection Authentication

Each [collection specification](#the-json-file) contains an optional "settings" block which modifies certain aspects of the collection. The [`settings.authenticate`](#collection-settings) property can be used in the following ways.

To specify that authentication for the collection is:

* *always* required, use `"authenticate": true`
* *not* required, use `"authenticate": false`
* *required only for certain HTTP methods*, use an array of HTTP methods such as `"authenticate": ["POST"]`

The following configuration for a collection will allow all GET requests to proceed without authentication, while POST, PUT and DELETE requests will require authentication.

```json
"settings": {
  "authenticate": ["POST", "PUT", "DELETE"]
}
```

See [more information about collection specifications and their configuration](#collections).

### Obtaining an Access Token

Unless requesting data from an unauthenticated endpoint, every request to API requires an Authorization header containing an access token.

Obtain an access token by sending a POST request to your API's token endpoint, passing your client credentials in the body of the request. The token endpoint is configurable using the property [`auth.tokenRoute`](#x), with a default value of `/token`.

```http
POST /token HTTP/1.1
Content-Type: application/json
Host: api.somedomain.tech
Connection: close
Content-Length: 65

{
  "clientId": "my-client-key",
  "secret": "my-client-secret"
}
```

With a request like the above, you should expect a response containing an access token, as below:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store
Content-Length: 95

{
  "accessToken": "4172bbf1-0890-41c7-b0db-477095a288b6",
  "tokenType": "Bearer",
  "expiresIn": 3600
}
```

### Using an Access Token

Once you have an access token, each request to the API should include an `Authorization` header containing the token:

```http
GET /1.0/library/books HTTP/1.1
Content-Type: application/json
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Host: api.somedomain.tech
Connection: close
```

### Access Token Expiry

The response returned when requesting an access token contains a property `expiresIn` which is set to the number of seconds the access token is valid for. When this period has elapsed API automatically invalidates the access token and a subsequent request to API using that access token will return an invalid token error (see below).

The consumer application must request a new access token to continue communicating with the API.   

### Authentication Errors

API responds with HTTP 401 Unauthorized errors when either the supplied credentials are incorrect or an invalid token has been provided. The `WWW-Authenticate` header indicates the nature of the error. In the case of an expired access token, a new one should be requested.

#### Invalid Credentials

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer, error="invalid_credentials", error_description="Invalid credentials supplied"
Content-Type: application/json
content-length: 18
Date: Sun, 17 Sep 2017 17:44:48 GMT
Connection: close
```

#### Invalid or Expired Token

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer, error="invalid_token", error_description="Invalid or expired access token"
Content-Type: application/json
content-length: 18
Date: Sun, 17 Sep 2017 17:46:28 GMT
Connection: close
```


## Authorisation and permissions

The Client Record allows anyone with those credentials to request an access token and use the API. For further control over access to endpoints in API, it is possible to extend the Client Record and configure collections to only require authentication for certain HTTP methods.

### Access Control

DADI API allows controlling access to endpoints by extending the client record with a `permissions` block.

> There is currently no interface or script available to add permissions to a client record, so this must be done in the database directly.
>
> -- advice

Add a permissions block containing an array of the collections and/or an array of the endpoints that the client should have access to.

* to give access to a collection, use the collection name for the `path` property
* to give access to an endpoint, use the final part of the endpoint's URL for the `path` property

```json
{
  "clientId": "my-client-key",
  "secret": "my-client-secret",
  "accessType": "user",
  "permissions": {
    "collections": [
      { "path": "test-collection" }
    ],
    "endpoints": [
      { "path": "test-endpoint" }
    ]
  }
}
```

#### API Version Access Control

It is also possible to restrict access to versions of your API (see [API Versioning](#collections-directory) for more information). Add an `apiVersion` property to the collection or endpoint permission:

```json
{
  "clientId": "my-client-key",
  "secret": "my-client-secret",
  "accessType": "user",
  "permissions": {
    "collections": [
      {
        "apiVersion": "1.0",
        "path": "test-collection"
      }
    ]
  }
}
```    

> **Warning!**
>
> Adding permissions to a client record will result in that client being able to access only those collections and endpoints they have been given permissions to.
>
> -- warning

### Authorisation Errors

#### Access Not Allowed

If the client record has permissions set and an attempt is made to request an endpoint that hasn't been added to the permissions block, API responds with HTTP 401 Unauthorized. The `WWW-Authenticate` header indicates that there was an issue requesting the specified endpoint.  

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="/1.0/library/books"
Content-Type: application/json
content-length: 18
Date: Sun, 17 Sep 2017 17:52:00 GMT
Connection: close

{"statusCode":401}
```

API will also log the following error to the console:

```console
ClientId not authorized to access requested collection.
```

## Collections

A *Collection* represents data within your API. Collections can be thought of as the data models for your application and define how API connects to the underlying data store to store and retrieve data.

API can handle the creation of new collections or tables in the configured data store simply by creating collection specification files. To connect collections to existing data, simply name the file using the same name as the existing collection/table.

All that is required to connect to your data is a collection specification file, and once that is created API provides data access over a REST endpoint and programmatically via the API's `Model` module.

### Collections directory

Collection specifications are simply JSON files stored in your application's `collections` directory. The location of this directory is configurable using the configuration property `paths.collections` but defaults to `workspace/collections`. The structure of this directory is as follows:

```console
my-api/
  workspace/
    collections/                    
      1.0/                          # API version
        library/                    # database
          collection.books.json     # collection specification file
```

**API Version**

Specific versions of your API are represented as sub-directories of the collections directory. Versioning of collections and endpoints acts as a formal contract between the API and its consumers.

Imagine a situation where a breaking change needs to be introduced — e.g. adding or removing a collection field, or changing the output format of an endpoint. A good way to handle this would be to introduce the new structure as version 2.0 and retain the old one as version 1.0, warning consumers of its deprecation and potentially giving them a window of time before the functionality is removed.

All requests to collection and custom endpoints must include the version in the URL, mimicking the hierarchy defined in the folder structure.

**Database**

Collection documents may be stored in separate databases in the underlying data store, represented by the name of the "database" directory.

> **Note** This feature is disabled by default. To enable separate databases in your API the configuration setting `database.enableCollectionDatabases` must be `true`. See [Collection-specific Databases](#collection-specific-databases) for more information.

**Collection specification file**

A collection specification file is a JSON file containing at least one field specification and a configuration block.

The naming convention for collection specifications is `collection.<collection name>.json` where `<collection name>` is used as the name of the collection/table in the underlying data store.

> **Use the plural form**
>
> We recommend you use the plural form when naming collections in order to keep consistency across your API. Using the singular form means a GET request for a list of results can easily be confused with a request for a single entity.
>
> For example, a collection named `book (collection.book.json)` will accept GET requests at the following endpoints:
>
> ```
> https://api.somedomain.tech/1.0/library/book
> https://api.somedomain.tech/1.0/library/book/560a44b33a4d7de29f168ce4
> ```
>
> It's not obvious whether or not the first example is going to return all books, as intended. Using the plural form makes it clear what the endpoint's intended behaviour is:
>
> ```
> https://api.somedomain.tech/1.0/library/books
> https://api.somedomain.tech/1.0/library/books/560a44b33a4d7de29f168ce4
```
> -- advice


### The Collection Endpoint

API automatically generates a REST endpoint for each collection specification loaded from the collections directory. The format of the REST endpoint follows this convention `/{version}/{database}/{collection name}` and matches the structure of the collections directory.

```console
my-api/
  workspace/
    collections/                    
      1.0/                          # API version
        library/                    # database
          collection.books.json     # collection specification file
```

With the above directory structure API will generate this REST endpoint: https://api.somedomain.tech/1.0/library/books.


### The JSON File

Collection specification files can be created and edited in any text editor, then added to the API's `collections` directory. API will load all valid collections when it boots.

#### Minimum Requirements

The JSON file must contain a `fields` property and, optionally, a `settings` property.

* `fields`: must contain at least one field specification. See [Collection Fields](#collection-fields) for the format of fields.
* `settings`: API uses sensible defaults for collection configuration, but these can be overridden using properties in the `settings` block. See [Collection Settings](#collection-settings) for details.

**A skeleton collection specification**

```json
{
  "fields": {
    "field1": {
    }
  },
  "settings": {
  }
}
```


### Collection Fields

Each field in a collection is defined using the following format. The only required property is `type` which tells API what data types the field can contain.

**A basic field specification**

```json
"fieldName": {
  "type": "String"
}
```

**A complete field specification**

```json
"fieldName": {
  "type": "String",
  "required": true,
  "label": "Title",
  "comments": "The title of the entry",
  "example": "War and Peace",
  "message": "must not be blank",
  "default": "Untitled"
  "matchType": "exact",
  "validation": {
    "minLength": 4,
    "maxLength": 20,
    "regex": {
      "pattern": "/[A-Za-z0-9]*/"
    }
  }
}
```

| Property  | Description |  Default | Example | Required?
|:--|:--|:--|:--|:--
| fieldName | The name of the field | | `"title"` | Yes
| type | The type of the field. Possible values `"String"`, `"Number"`, `"DateTime"`, `"Boolean"`, `"Mixed"`, `"Object"`, `"Reference"`  |  N/A  | `"String"` | Yes
| label | The label for the field | `""` | `"Title"` | No
| comments | The description of the field | `""` | `"The article title"` | No
| example | An example value for the field | `""` | `"War and Peace"` | No
| validation | Validation rules, including minimum and maximum length and regular expression patterns. | `{}` | | No
| validation.minLength | The minimum length for the field.| unlimited | `4` | No
| validation.maxLength | The maximum length for the field.| unlimited | `20` | No
| validation.regex | A regular expression the field's value must match |  | `{ "pattern": /[A-Z]*/ }` | No
| required | If true, a value must be entered for the field. | `false` | `true` | No
| message | The message to return if field validation fails.| `"is invalid"` | `"must contain uppercase letters only"` | No
| default | An optional value to use as a default if no value is supplied for this field | | `"0"` | No
| matchType | Specify the type of query that is performed when using this field. If "exact" then API will attempt to match the query value exactly, otherwise it will performa a case-insensitive query. | | `"exact"` | No
| format | Used by some fields (e.g. `DateTime`) to specify the expected format for input/output | `null` | `"YYYY-MM-DD"` | No

### Field Types

Every field in a collection must be one of the following types. All documents sent to API are validated against a collection's field type to ensure that data will be stored in the format intended. See the section on [Validation](#validation) for more details.

| Type | Description | Example
|:--|:--|:--
| String | The most basic field type, used for text data. Will also accept arrays of Strings. | `"The quick brown fox"`,  `["The", "quick", "brown", "fox"]`
| Number | Accepts numeric data types including whole integers and floats | `5`, `5.01`
| DateTime | Stores dates/times. Accepts numeric values (Unix timestamp), strings in the ISO 8601 format or in any format supported by [Moment.js](https://momentjs.com/) as long as the pattern is defined in the `format` property of the field schema. Internally, values are *always* stored as Unix timestamps. | `"2018-04-27T13:18:15.608Z"`, `1524835111068`
| Boolean | Accepts only two possible values: `true` or `false` | `true`
| Object | Accepts single JSON documents or an array of documents | `{ "firstName": "Steve" }`
| Mixed | Can accept any of the above types: String, Number, Boolean or Object |
| Reference | Used for linking documents in the same collection or a different collection, solving the problem of storing subdocuments in documents. See [Document Composition (reference fields)](#document-composition) for further information. | the ID of another document as a String: `"560a5baf320039f7d6a78d3b"`


### Collection Settings

Each collection specification can contain a `settings`. API applies sensible defaults to collections, all of which can be overridden using properties in the `settings` block. Collection configuration is controlled in the following way:

```json
{
  "settings": {
    "cache": true,
    "authenticate": true,
    "count": 100,
    "sort": "title",
    "sortOrder": 1,
    "callback": null,
    "storeRevisions": false
    "index": []
  }
}
```

| Property | Description | Default | Example
|:--|:--|:--|:--
| displayName | A friendly name for the collection. Used by the auto-generated documentation plugin.  | n/a | `"Articles"`
| cache | If true, caching is enabled for this collection. The global config must also have `cache: true` for caching to be enabled | `false` | `true`
| authenticate | Specifies whether requests for this collection require authentication, or if there only certain HTTP methods that must be authenticated | `true` | `false`, `["POST"]`
| count | The number of results to return when querying the collection | `50` | `100`
| sort | The field to sort results by | `"_id"`  | `"title"`
| sortOrder | The sort direction to sort results by | `1`  | `1` = ascending, `-1` = descending
| storeRevisions | If true, every change to a document will cause the previous version to be saved to a revision/history collection | `true` | `false`
| revisionCollection | The name of the collection used to hold revision documents | The collection name with "History" appended | `"authorsHistory"`
| callback | Name of a function to use as a JSONP callback | `null` | `setAuthors`
| defaultFilters | Specifies a default query for the collection. A `filter` parameter passed in the querystring will extend these filters.  | `{}` | `{ "published": true }`
| fieldLimiters | Specifies a list of fields for inclusion/exclusion in the response. Fields can be included or excluded, but not both. See [Retrieving data](#retrieving-data) for more detail. | `{}` | `{ "title": 1, "author": 1 }`, `{ "dob": 0, "state": 0 }`
| index | Specifies a set of indexes that should be created for the collection. See [Creating Database Indexes](#creating-database-indexes) for more detail. | `[]`  | `{ "keys": { "username": 1 }, "options": { "unique": true } }`

> **Overriding configuration using querystring parameters**
>
> It is possible to override some of these values when requesting data from the endpoint, by using querystring parameters. See [Querying a collection](#querying) for detailed documentation.
>
> -- advice

### Collection Configuration Endpoints

Every collection in your API has an additional configuration route available. To use it, append `/config` to one of your collection endpoints, for example: https://api.somedomain.tech/1.0/libray/books/config.

If the collection already exists (that is, a collection specification is located at `workspace/collections/1.0/library/collection.books.json`), making a GET request to the collection's configuration endpoint returns the collection schema:

```http
GET /1.0/library/books/config HTTP/1.1
Content-Type: application/json
Authorization: Bearer 37f9786b-3f39-4c87-a8ff-9530efd176c3
Host: api.somedomain.tech
Connection: close
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
content-length: 12639
Date: Mon, 18 Sep 2017 14:05:44 GMT
Connection: close

{
  "fields": {
    "published": {
      "type": "Object",
      "label": "Published State",
      "required": true
    }
  },
  "settings": {
  }
}
```

#### Creating a collection specification

There are two ways to create a collection specification. The first, using a text editor and adding a file to the collections directory on the filesystem, has already been discussed. The second way is to use the API's "collection configuration" endpoints.

If the collection does not already exist, you can create it by making a POST request to the configuration endpoint. API will use the various parts of the endpoint URL to determine version, database and collection name. A new file will be created in the collections directory at `workspace/collections/<version>/<database>/collection.<collection name>.json`). The collection specification must be sent as the body of the POST request.

```http
POST /1.0/library/books/config HTTP/1.1
Content-Type: application/json
Authorization: Bearer 37f9786b-3f39-4c87-a8ff-9530efd176c3
Host: api.somedomain.tech
Connection: close
Content-Length: 140

{
  "fields": {
    "title": {
      "type": "String",
      "label": "The Book Title",
      "required": true
    }
  },
  "settings": {
  }
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
Date: Mon, 18 Sep 2017 15:18:01 GMT
Connection: close
Content-Length: 57

{
  "result": "success",
  "message": "books collection created"
}
```

> **Note**
>
> To create or edit collection specifications using the configuration endpoints, you must use an access token obtained by using credentials for a client with an `accessType` of "admin". See the [Authentication](#authentication) section for more detail.
>
> If your access token was not obtained using a set of "admin" credentials, API responds with HTTP 401 Unauthorized.
>
> ```http
> HTTP/1.1 401 Unauthorized
> WWW-Authenticate: Bearer realm="/1.0/library/books/config"
> Content-Type: application/json
> content-length: 18
> Date: Mon, 18 Sep 2017 14:16:46 GMT
> Connection: close
```
> -- warning


#### Editing a collection specification

Modifying an existing collection specification can be done by making another POST request to the collection's configuration endpoint. The full collection specification must be sent as the body of the POST request.

```http
POST /1.0/library/books/config HTTP/1.1
Content-Type: application/json
Authorization: Bearer c389340b-718f-4eed-8e8e-3400a1c6cd5a
Host: api.somedomain.tech
Connection: close
Content-Length: 254

{
  "fields": {
    "title": {
      "type":"String",
      "label":"The Book's Title",
      "required":true
    }
  },
  "settings":{
    "authenticate": true
  }
}
```

```http
HTTP/1.1 200 OK
content-type: application/json
content-length: 20
Date: Mon, 18 Sep 2017 15:21:32 GMT
Connection: close

{
  "result": "success"
}
```

## The REST API

The primary way of interacting with DADI API is via REST endpoints that are automatically generated for each of the [collections](#collections) added to the application. Each REST endpoint allows you to insert, update, delete and query data stored in the underlying database.

### REST endpoint format

`http(s)://api.somedomain.tech/{version}/{database}/{collection name}`

The REST endpoints follow the above format, where `{version}` is the current version of the API collections (not the installed version of API), `{database}` is the database that holds the specified collection and `{collection name}` is the actual collection to interact with. See [Collections directory](#collections-directory) for more detail.

Example endpoints for each of the supported HTTP verbs:

```
# Insert documents
POST /1.0/my-database/my-collection

# Update documents
PUT /1.0/my-database/my-collection

# Delete documents
DELETE /1.0/my-database/my-collection

# Get documents
GET /1.0/my-database/my-collection
```

### Content-type header

In almost all cases, the `Content-Type` header should be `application/json`. API contains some internal endpoints which allow `text/plain` but for all interaction using the above endpoints you should use `application/json`.

### Authorization header

Unless a collection has authentication disabled, every request using the above REST endpoints will require an Authorization header containing an access token. See [Obtaining an Access Token](#obtaining-an-access-token) for more detail.

## Working with data

### Retrieving data

Sending a request using the `GET` method instructs API to find and retrieve all documents that match a certain criteria.

There are two types of retrieval operation: one where a single document is to be retrieved and its identifier is known; and the other where one or many documents matching a query should be retrieved.

#### Retrieve a single resource by ID

To retrieve a document with a known identifier, add the identifier to the REST endpoint for the collection.

##### Request

**Format:** `GET http://api.somedomain.tech/1.0/library/books/{ID}`

```http
GET /1.0/library/books/560a44b33a4d7de29f168ce4 HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech
```

Retrieves the document with the identifier of `{ID}` from the specified collection (in this example `books`).

#### Retrieve all documents matching a query

Useful for retrieving multiple documents that have a common property or share a pattern. Include the query in the querystring using the `filter` parameter.

##### Request

**Format:** `GET http://api.somedomain.tech/1.0/library/books?filter={QUERY}`

```http
GET /1.0/library/books?filter={"title":{"$regex":"the"}} HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech
```

#### Query options

When querying a collection, the following options can be supplied as URL parameters:

| Property | Description | Default | Example
|:--|:--|:--|:--
| `compose` | Whether to resolve referenced documents (see the possible values of the [`compose` parameter](#enabling-composition)) | The value of `settings.compose` in the collection schema | `compose=true`
| `count` | The maximum number of documents to be retrieved in one page | The value of `settings.count` in the collection schema | `count=30`
| `fields` | The list of fields to include or exclude from the response. Takes an object mapping field names to either `1` or `0`, which will include or exclude the field, respectively. | The value of `settings.compose` in the collection schema | `fields={"first_name":1,"l_name":1}`
| `filter` | A query to filter results by. See [filtering documents](#filtering-documents) for more detail. | The value of `settings.compose` in the collection schema | `fields={"first_name":1,"l_name":1}`
| `includeHistory` | Whether to resolve history documents | `false` | `includeHistory=true`
| `page` | The number of the page of results to retrieve | `1`  | `page=3`
| `sort` | The sort direction to sort results by, mapping field names to either `1` or `0`, which will sort results by that field in ascending or descending order, respectively | The value of `settings.sortOrder` in the collection schema  | `sort={"first_name":1}`

#### Filtering documents

DADI API uses a MongoDB-style format for querying objects, introducing a series of operators that allow powerful queries to be assembled.

| Syntax | Description | Example
|:--|:--|:--
| `{field:value}` | Strict comparison. Matches documents where the value of `field` is exactly `value` | `{"first_name":"John"}`
| `{field:{"$regex": value}}` | Matches documents where the value of `field` matches a regular expression defined as `/value/i` | `{"first_name":{"$regex":John"}}`
| `{field:{"$in":[value1,value2]}}` | Matches documents where the value of `field` is one of `value1` and `value2` | `{"last_name":{"$in":["Doe","Spencer","Appleseed"]}}`
| `{field:{"$containsAny":[value1,value2]}}` | Matches documents where the value of `field` (an array) contains one of `value1` and `value2` | `{"tags":{"$containsAny":["dadi","dadi-api","restful"]}}`
| `{field:{"$gt": value}}` | Matches documents where the value of `field` is greater than `value` | `{"height":{"$gt":175}}`
| `{field:{"$lt": value}}` | Matches documents where the value of `field` is less than `value` | `{"weight":{"$lt":85}}`
| `{field:"$now"}`, `{field:{"$lt":"$now"}}`, etc. | **(DateTime fields only)** Matches documents comparing the value of `field` against the current date | `{"publishDate":{"$lt":"$now"}}`

### Inserting data

Inserting data involves sending a POST request to the endpoint for the collection that will store the data. If the data passes [validation rules](#validation) imposed by the collection, it is inserted into the collection with a set of internal fields added.

#### Request

**Format:** `POST http://api.somedomain.tech/1.0/library/books`

```http
POST /1.0/library/books HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech

{
  "title": "The Old Man and the Sea"
}
```

#### Response

```json
{
  "results": [
    "_id": "5ae1b6464e0b766dd17dbab9"
    "_apiVersion": "1.0",
    "_createdAt": 1511875141,
    "_createdBy": "your-client-id",
    "_version": 1,
    "title": "The Old Man and the Sea"
  ]
}
```

#### Common validation errors

In addition to failures caused by validation rules in collection field specifications, you may also receive an `HTTP 400 Bad Request` error if either required fields are missing or extra fields are sent that don't exist in the collection:

```
HTTP/1.1 400 Bad Request
Content-Type: application/json
content-length: 681
Date: Mon, 18 Sep 2017 18:21:04 GMT
Connection: close

{
  "success": false,
  "errors": [
    {
      "field": "description",
      "message": "can't be blank"
    },
    {
      "field": "extra_field",
      "message": "doesn't exist in the collection schema"
    }
  ]
}
```

#### Batch inserting documents

It is possible to insert multiple documents in a single POST request by sending an array to the endpoint:

```http
POST /1.0/library/books HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech

[
  {
    "title": "The Old Man and the Sea"
  },
  {
    "title": "For Whom the Bell Tolls"
  }
]
```

### Updating data

Updating data with API involves sending a PUT request to the endpoint for the collection that holds the data.

There are two types of update operation: one where a single document is to be updated and its identifier is known; and the other where one or many documents matching a query should be updated.

In both cases, the request body must contain the required update specified as JSON.

If the data passes [validation rules](#validation) imposed by the collection, it is updated using the specified update, and the internal fields `_lastModifiedAt`, `_lastModifiedBy` and `_version` are updated.

#### Update an existing resource

To update a document with a known identifier, add the identifier to the REST endpoint for the collection.

##### Request

**Format:** `PUT http://api.somedomain.tech/1.0/library/books/{ID}`

```http
PUT /1.0/library/books/560a44b33a4d7de29f168ce4 HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech

{
  "update": {
    "title": "For Whom the Bell Tolls (Kindle Edition)"
  }
}
```

Updates the document with the identifier of `{ID}` in the specified collection (in this example `books`). Applies the values from the `update` block specified in the request body.

##### Response

```json
{
  "results": [
    {
      "_apiVersion": "v1",
      "_createdAt": 1524741702962,
      "_createdBy": "testClient",
      "_history": [
        "5ae1b6c24e0b766dd17dbaba"
      ],
      "_id": "5ae1b6464e0b766dd17dbab9",
      "_lastModifiedAt": 1524741826339,
      "_lastModifiedBy": "testClient",
      "_version": 2,
      "title": "For Whom the Bell Tolls (Kindle Edition)"
    }
  ],
  "metadata": {
    "fields": {},
    "page": 1,
    "offset": 0,
    "totalCount": 1,
    "totalPages": 1
  }
}
```

#### Update all documents matching a query

Useful for batch updating documents that have a common property. Include the query in the request body, along with the required update.

##### Request

**Format:** `PUT http://api.somedomain.tech/1.0/library/books`

```http
PUT /1.0/library/books HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech

{
  "query": {
    "title": {
      "$regex": "the"
    }
  },
  "update": {
    "available": false
  }
}
```

Updates all documents that match the results of the `query` in the specified collection (in this example `"books"`). Applies the values from the `update` block specified in the request body.

##### Response

```json
{
  "results": [
    {
      "_apiVersion": "v1",
      "_createdAt": 1524741702962,
      "_createdBy": "testClient",
      "_history": [
        "5ae1b6c24e0b766dd17dbaba"
      ],
      "_id": "5ae1b6464e0b766dd17dbab9",
      "_lastModifiedAt": 1524741826339,
      "_lastModifiedBy": "testClient",
      "_version": 2,
      "title": "For Whom the Bell Tolls (Kindle Edition)",
      "available": false
    },
    {
      "_apiVersion": "v1",
      "_createdAt": 1524741702962,
      "_createdBy": "testClient",
      "_history": [
        "5ae1b6c24e0b766dd17dbaba"
      ],
      "_id": "5ae1b6464e0b766dd17dbab8",
      "_lastModifiedAt": 1524741826339,
      "_lastModifiedBy": "testClient",
      "_version": 1,
      "title": "The Old Man and the Sea",
      "available": false
    }
  ],
  "metadata": {
    "fields": {},
    "page": 1,
    "offset": 0,
    "totalCount": 2,
    "totalPages": 1
  }
}
```

### Deleting data

Sending a request using the `DELETE` method instructs API to perform a delete operation on the documents that match the supplied parameters.

There are two types of delete operation: one where a single document is to be deleted and its identifier is known; and the other where one or many documents matching a query should be deleted.

#### Delete an existing resource

To delete a document with a known identifier, add the identifier to the REST endpoint for the collection.

##### Request

**Format:** `DELETE http://api.somedomain.tech/1.0/library/books/{ID}`

```http
DELETE /1.0/library/books/560a44b33a4d7de29f168ce4 HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech
```

Deletes the document with the identifier of `{ID}` from the specified collection (in this example `books`).

#### Delete all documents matching a query

Useful for batch deleting documents that have a common property. Include the query in the request body.

##### Request

**Format:** `DELETE http://api.somedomain.tech/1.0/library/books`

```http
DELETE /1.0/library/books HTTP/1.1
Authorization: Bearer afd4368e-f312-4b14-bd93-30f35a4b4814
Content-Type: application/json
Host: api.somedomain.tech

{
  "query": {
    "title": "The Old Man and the Sea"
  }
}
```

Deletes all documents that match the results of the `query` from the specified collection (in this example `books`).

#### DELETE Response

The response returned for a DELETE request depends on the configuration setting for `feedback`.

The default setting is `false`, in which case API returns an `HTTP 204 No Content` after a successful delete operation.

If the setting is `true` – that is, the main configuration file contains `"feedback": true` – then a JSON object similar to the following is returned:

```json
{
  "status": "success",
  "message": "Documents deleted successfully",
  "deletedCount": 1,
  "totalCount": 99
}
```

Where `deletedCount` is the number of documents deleted and `totalCount` the number of remaining documents in the collection.

> In versions of API prior to 3.0, only the `status` and `message` fields are returned in the response.
> -- warning

### Using Models directly

When creating [custom Javacript endpoints](#endpoints) or [collection hooks](#hooks) it may be useful to consume or create data, in which case it's possible to interact with the data model directly, as opposed to using the REST API, which would mean issuing an HTTP request.

The `@dadi/api` NPM module exports a factory function, named `Model`, which receives the name of the collection and returns a model instance with the following methods available.

- [count()](#count)
- [create()](#create)
- [createIndex()](#createindex)
- [delete()](#delete)
- [find()](#find)
- [get()](#get)
- [getIndexes()](#getindexes)
- [revisions()](#revisions)
- [stats()](#stats)
- [update()](#update)

> **Note**
>
> API 3.1 introduced a new model API, using Promises instead of callbacks and a few other changes. The [legacy version](/api/3.0.0/#using-models-directly) is still supported, but it is now deprecated and developers are encouraged to update their code.
>
> -- warning

#### count

Searches for documents and returns a count.

***Receives*** *(named parameters):*

- `query` (type: `Object`): Query to match documents against
- `options` (type: `Object`, optional): Options object for narrowing down the result set (e.g. `{page: 3}`)

***Returns:***

`Promise` with:

- `results` (`Object`): Metadata block with document count

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').count({
  query: {
    title: 'Harry Potter'
  }
}).then(results) => {
  console.log(results)
)
```

#### create

Creates documents in the database. Runs any `beforeCreate` and `afterCreate` hooks configured in the collection.

***Receives*** *(named parameters):*

- `compose` (type: `Boolean`, default: `true`): Whether to resolved referenced documents in the output payload
- `documents` (type: `Object` or `Array`): The document (object) or documents (array of objects) to create
- `internals` (type: `Object`, optional): A set of internal properties to add to each document (note: `_id` is generated automatically)
- `callback` (type: `Function`): Callback to process results
- `rawOutput` (type: `Boolean`, optional): By default, results suffer a series of transformations before being sent back to the consumer. The raw output can be obtained by setting this property to `true`
- `req` (type: `Object`, optional): The instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that originated the request

***Returns:***

`Promise` with:

- `{results}` (type: `Object`): Object with a `results` property containing an array of created documents

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').create({
  documents: [
    { title: 'Harry Potter' },
    { title: 'Harry Potter 2' }
  ],
  internals: { _createdBy: 'johnDoe' },
  req
}).then(({results}) => {
  console.log(results)
})
```

#### createIndex

Creates all the indexes defined in the `settings.index` property of the collection schema.

***Receives:***

*N/A*

***Returns:***

`Promise` with:

- `indexes` (type: `Array`): Array of indexes created, with each element being an object with a `collection` and `index` properties, which represent the name of the collection and the name of the field, respectively

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').createIndex().then(indexes => {
  indexes.forEach(({collection, index}) => {
    console.log(`Created index ${index} in collectino ${collection}.`)
  })
})
```

#### delete

Deletes documents from the database. Runs any `beforeDelete` and `afterDelete` hooks configured in the collection.

***Receives*** *(named parameters):*

- `query` (type: `Object`): Query to match documents against
- `req` (type: `Object`, optional): The instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that originated the request

***Returns:***

`Promise` with:

- `{deletedCount, totalCount}` (`Object`): Object indicating the number of documents that were deleted and the number of documents remaining in the collection after the operation

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').delete({
  query: {
    title: 'Harry Potter'
  },
  req
}).then(({deletedCount, totalCount}) => {
  console.log(`Deleted ${deletedCount} documents, ${totalCount} remaining.`)
})
```

#### find

Retrieves documents from the database.

***Receives*** *(named parameters):*

- `query` (type: `Object`): Query to match documents against
- `options` (type: `Object`, optional): Options object for narrowing down the result set (e.g. `{page: 3}`)

***Returns:***

`Promise` with:

- `{metadata, results}` (`Object`): Object representing the documents retrieved (`results`) as well as a metadata block indicating various types of metrics about the result set (`metadata`)

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').find({
  options: {
    limit: 10,
    skip: 5
  }
  query: {
    title: 'Harry Potter'
  }
}).then(({metadata, results}) => {
  console.log(results)
})
```

#### get

Retrieves documents from the database. Unlike [find](#find), it runs any `beforeGet` and `afterGet` hooks configured in the collection.

***Receives*** *(named parameters):*

- `query` (type: `Object`): Query to match documents against
- `options` (type: `Object`, optional): Options object for narrowing down the result set (e.g. `{page: 3}`)
- `req` (type: `Object`, optional): The instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that originated the request

***Returns:***

`Promise` with:

- `{metadata, results}` (`Object`): Object representing the documents retrieved (`results`) as well as a metadata block indicating various types of metrics about the result set (`metadata`)

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').get({
  options: {
    limit: 10,
    skip: 5
  }
  query: {
    title: 'Harry Potter'
  },
  req
}).then(({metadata, results}) => {
  console.log(results)
})
```

#### getIndexes

Retrieves all indexed fields.

***Receives:***

*N/A*

***Returns:***

`Promise` with:

- `indexes` (`Array`): An array of index objects, each with a name property

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').getIndexes().then(indexes => {
  console.log(indexes)
})
```

#### getRevisions

Retrieves revisions for a given document.

***Receives*** *(named parameters):*

- `id` (type: `String`): ID of the document
- `{historyFilters}` (type: `Object`, optional): Object with a `historyFilters` property specifying a set of filters to match revision documents against

***Returns:***

`Promise` with:

- `results` (`Array`): The revision documents

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').getRevisions({
  id: '560a44b33a4d7de29f168ce4'
}).then(results => {
  console.log(results)
})
```

#### getStats

Retrieves statistics about a given collection.

***Receives*** *(named parameters):*

- `options` (type: `Object`, optional): Options object for narrowing down the result set

***Returns:***

`Promise` with:

- `stats` (`Object`): Collection statistics

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').getStats().then(stats => {
  console.log(stats)
})
```

#### update

Updates documents in the database. Runs any `beforeUpdate` and `afterUpdate` hooks configured in the collection.

***Receives*** *(named parameters):*

- `compose` (type: `Boolean`, default: `true`): Whether to resolved referenced documents in the output payload
- `query` (type: `Object`): Query to match documents against
- `update` (type: `Object`): Set of properties and values to update the documents affected by the query
- `internals` (type: `Object`): A set of internal properties to add to each document
- `rawOutput` (type: `Boolean`, default: `false`): By default, results suffer a series of transformations before being sent back to the consumer. The raw output can be obtained by setting this property to `true`
- `req` (type: `Object`, optional): The instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage) that originated the request

***Returns:***

`Promise` with:

- `{results}` (`Object`): Object with a `results` property containing the array of updated documents with their new state

***Example:***

```js
const Model = require('@dadi/api').Model

Model('books').update({
  internals: {
    _lastModifiedBy: 'johnDoe'
  },
  query: {
    title: 'Harry Potter'
  },
  req,
  update: {
    author: 'J K Rowling'
  }
}).then(({results}) => {
  console.log(results)
})
```


### Validation

Documents sent to the API with POST and PUT requests are validated at field level based on rules defined in the collection schema.

Several means of data validation are supported in API, including [type validation](#type-validation), [mandatory field validation](#mandatory-field-validation), [length validation](#length-validation) and [regular expression validation](#regular-expression-validation).

While API can return default error messages when data fails validation, it is possible to customise the error messages for each field individually. See [Error Messages](#error-messages) below for more detail.

#### Type Validation

A field can be validated by type. DADI API will check that the value supplied for the field is the correct type as specified in the schema. Only the following JavaScript primitives are considered for type validation: `String`, `Number`, `Boolean`.

```json
"fields": {
  "title": {
    "type": "String",
    "message": "must be a string"
  }
}
```

#### Mandatory Field Validation

Fields can be made mandatory by setting their `required` property to `true`. DADI API will check that a value has been supplied for the field when creating new documents. Validation for update requests is more relaxed and mandatory fields are not validated as they would have already been populated with data when the document was first created.

```json
"fields": {
  "title": {
    "type": "String",
    "required": true
  }
}
```

#### Length Validation

A field's length can be controlled by using the `minLength` and `maxLength` properties within the `validation` block. Validation will fail if the length of the string is greater or less than the specified length limits.

```json
"fields": {
  "username": {
    "type": "String",
    "validation": {
      "maxLength": 16
    },
    "message": "is too long"
  },
  "password": {
    "type": "String",
    "validation": {
      "minLength": 6
    },
    "message": "is too short"
  }
}
```

#### Regular Expression Validation

A regular expression pattern can be specified for a field, which may help enforcing business rules.

```json
"fields": {
  "productCode": {
    "type": "String",
    "required": true,
    "validation": {
      "regex": {
        "pattern": "^A"
      }
    },
    "message": "must start with 'A'"
  }
}
```

#### Validation Response

If a document fails validation an errors collection will be returned with the reasons for validation failure.

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
content-length: 681
Date: Mon, 18 Sep 2017 18:21:04 GMT
Connection: close

{
  "success": false,
  "errors": [
    {
      "field": "title",
      "message": "must contain uppercase letters only"
    },
    {
      "field": "description",
      "message": "can't be blank"
    },
    {
      "field": "start_date",
      "message": "is invalid"
    },
    {
      "field": "extra_field",
      "message": "doesn't exist in the collection schema"
    }
  ]
}
```

#### Error Messages

A set of default error messages are returned for fields that fail validation. The table below lists the built-in error messages and their associated meaning.

Message       | Description
:--|:--
"is invalid" | The default message returned for a field that fails validation
"must be specified" | A `required` field has not been supplied
"can't be blank" | A `required` field has been supplied but with no value
"should match the pattern `^[A-Z]*$`" | The value does not match the configured regular expression

It is possible to supply a custom error message by specifying a `message` property in a field specification. For example:

```json
"fields": {
  "title": {
    "type": "String",
    "required": true,
    "example": "The Autobiography of Benjamin Franklin",
    "message": "must contain a value"
  }
}
```

## Working with files

DADI API can easily be configured to accept file uploads, allowing you to store file-based content along with your text-based content.

API ships with a default media collection called `mediaStore` and a set of endpoints for generating signed URLs, uploading files and querying the media collection using the same functionality available for standard collections.


### Authentication

Media upload requests must be authenticated with a Bearer token supplied in an `Authorization` header along with the POST request. See the [Authentication](#authentication) section for details on obtaining an access token.

### Configuration

There is a default global configuration for media uploads. To override the global configuration, add a `media` block to the [main configuration file](#configuration):

```json
"media": {
  "storage": "disk",
  "basePath": "workspace/media",
  "pathFormat": "date",
  "tokenSecret": "d1ff1cult-w0nderland",
  "tokenExpiresIn": "1h"
}
```

|Property|Description|Default
|:--|:--|:---
|storage| The storage handler to use. Determines where file uploads are stored. Possible values: `"disk"`, `"s3"`| `"disk"`
|basePath| When `"disk"` storage is used, `basePath` is either an absolute path or a path  relative to the directory where the application is run. When `"s3"` storage is used, `basePath` is a directory relative to the S3 bucket root.  | `"workspace/media"`
|pathFormat| Determines the format for the generation of subdirectories to store uploads. Possible values: `"none"`, `"date"`, `"datetime"`, `"sha1/4"`, `"sha1/5"`, `"sha1/8"` | `"date"`|
|tokenSecret|The secret key used to sign and verify tokens when uploading media|`"catb0at-dr1zzle"`
|tokenExpiresIn|The duration a signed token is valid for. Expressed in seconds or a string describing a time span (https://github.com/zeit/ms). Eg: `60`, `"2 days"`, `"10h"`, `"7d"`|`"1h"`
|defaultBucket|The name of the default media bucket|`mediaStore`
|buckets|The names of media buckets to be used|`["mediaCollectionOne"]`

### Available path formats

The `pathFormat` property determines the directory structure that API will use when storing files. This allows splitting files across many directories rather than storing them all in one directory. While this [isn't a problem when using S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html), when using the local filesystem storing a large number of files in one directory could negatively affect performance.

| Format | Description | Example
|:--|:--|:---
|`"none"`| Doesn't create a directory structure, storing all uploads for a collection in a subdirectory of the `basePath` location |
|`"date"`| Creates a directory structure using parts derived from the current date | `2016/12/19/my-image.jpg`
|`"datetime"`| Creates a directory structure using parts derived from the current date and time | `2016/12/19/13/07/22/my-image.jpg`
|`"sha1/4"`| Splits SHA1 hash of the image's filename into 4 character chunks | `cb56/7524/77ca/e640/5f85/b131/872c/60d2/1b96/7c6a/my-image.jpg` |
|`"sha1/5"`| Splits SHA1 hash of the image's filename into 5 character chunks | `cb567/52477/cae64/05f85/b1318/72c60/d21b9/67c6a/my-image.jpg` |
|`"sha1/8"`| Splits SHA1 hash of the image's filename into 8 character chunks | `cb567524/77cae640/5f85b131/872c60d2/1b967c6a/my-image.jpg` |

### Configuring media collections

To override the name of the default media collection, add a configuration property for `defaultBucket`:

```json 
"media": {
  "defaultBucket": "myDefaultMediaCollection"
}
```

To add additional media collections, add a `buckets` property:

```json 
"media": {
  "buckets": ["myImageCollection", "myFileCollection"]
}
```

> **Media collection endpoints**
>
> When interacting with the default media collection, endpoints begin with `/media`. When interacting with an additional media collection, endpoints begin with `/media/<bucketName>`, for example `/media/myImageCollection`
> -- advice  

### Storage types 

API ships with two file storage handlers, one for storing files on the local filesystem and the other for storing files in an Amazon S3 bucket. If you need access to the files from another application, for example DADI CDN, we recommend using the S3 option.

#### File storage

The file storage handler saves uploaded files to the local filesystem, in the location specified by the `basePath` configuration property. `basePath` can be a path relative to the installation location of API or an absolute path. 

```json
"media": {
  "storage": "disk",
  "basePath": "workspace/media"
}
```

#### Amazon S3

If the S3 storage handler is used, an additional set of configuration properties are required as seen in the `s3` block below:

```json
"media": {
  "storage": "s3",
  "basePath": "uploads",
  "pathFormat": "date",
  "s3": {
    "accessKey": "<your-access-key>",
    "secretKey": "<your-secret-key>",
    "bucketName": "<your-bucket>",
    "region": "eu-west-1"
  }
}
```

> **Security Note**
> 
> We don't recommend storing your AWS credentials in the configuration file. The `accessKey` and `secretKey` properties should instead be set as the environment variables `AWS_S3_ACCESS_KEY` and `AWS_S3_SECRET_KEY`.
> -- warning

### Querying media collections

Media collections can be queried in the same way as regular API collections. Send a GET request to a media endpoint with a `filter` parameter:

```http
GET /media/mediaStore?filter={"width": 150} HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json
Connection: keep-alive

{
  "results": [
    {
      "_createdAt": 1525677293872,
      "_id": "5aeffceda32a4d53f24c8bd5",
      "_version": 1,
      "contentLength": 47237,
      "fileName": "10687215_10154599861380077_4088877300129205613_n.jpg",
      "height": 720,
      "mimetype": "image/jpeg",
      "path": "/media/2018/05/07/10687215_10154599861380077_4088877300129205613_n.jpg",
      "width": 960
    }
  ],
  "metadata": {
    "limit": 40,
    "page": 1,
    "fields": {},
    "offset": 0,
    "totalCount": 1,
    "totalPages": 1
  }
```

To include only certain properties in the returned response, supply a `fields` parameter:

```http
GET /media/mediaStore?filter={"width": 150}&fields={"fileName": 1} HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json
Connection: keep-alive

{
  "results": [
    {
      "_id": "5aeffceda32a4d53f24c8bd5",
      "fileName": "10687215_10154599861380077_4088877300129205613_n.jpg"
    }
  ],
  "metadata": {
    "limit": 40,
    "page": 1,
    "fields": {
      "fileName": 1
    },
    "offset": 0,
    "totalCount": 1,
    "totalPages": 1
  }
```

The file itself can be downloaded by sending a GET request for the value of the `path` property. For example, given the following media document, a GET request can be made to `http://your-api-domain.com/media/2018/05/07/10687215_10154599861380077_4088877300129205613_n.jpg`

```json
{
  "_createdAt": 1525677293872,
  "_id": "5aeffceda32a4d53f24c8bd5",
  "_version": 1,
  "contentLength": 47237,
  "fileName": "10687215_10154599861380077_4088877300129205613_n.jpg",
  "height": 720,
  "mimetype": "image/jpeg",
  "path": "/media/2018/05/07/10687215_10154599861380077_4088877300129205613_n.jpg",
  "width": 960
}
```

### Uploading a file

To upload a file send a `multipart/form-data` POST to the media collection's endpoint. On successful upload the file's metadata is returned as JSON, and includes an identifier that can be used to create a reference to the file from another collection.

#### Uploading a file with cURL

```bash
curl -X POST
  -H "Content-Type: multipart/form-data"
  -H "Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe"
  -F "data=@/Users/userName/images/my-image.jpg" "http://api.somedomain.tech/media"
```

#### Uploading a file with Node.js

```js
const FormData = require('form-data')

let options = {
  host: 'api.somedomain.tech',
  port: 80,
  path: '/media',
  headers: {
    'Authorization': 'Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe',
    'Accept': 'application/json'
  }
}

let uploadResult = ''
let filePath = '/Users/userName/images/my-image.jpg'

let form = new FormData()
form.append('file', fs.createReadStream(filePath))

form.submit(options, (err, response, body) => {
  if (err) return reject(err)

  response.on('data', (chunk) => {
    if (chunk) {
      uploadResult += chunk
    }
  })

  response.on('end', () => {
    console.log(uploadResult)
  })
})
```

#### Response

If successful, expect a response similar to the below examples.

##### Disk storage

```http
HTTP/1.1 201 Created
Content-Type: application/json
content-length: 305
Connection: keep-alive

{
  "results":[
    {
      "fileName": "my-image.jpg",
      "mimetype": "image/jpeg",
      "width": 1920,
      "height": 1080,
      "path": "/Users/userName/api/workspace/media/2016/12/19/my-image.jpg",
      "contentLength": 173685,
      "_createdAt": 1482124829485,
      "_createdBy": "your-client-key",
      "_version": 1,
      "_id": "58576e1d5dd9975624b0d92c"
    }
  ]
}
```

##### Amazon S3 storage

```http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 305
Connection: keep-alive

{
  "results":[
    {
      "fileName": "my-image.jpg",
      "mimetype": "image/jpeg",
      "width": 1920,
      "height": 1080,
      "path": "workspace/media/2016/12/19/my-image.jpg",
      "contentLength": 173685,
      "_createdAt": 1482124902978,
      "_createdBy": "your-client-key",
      "_version": 1,
      "_id": "58576e72bafa53b625aebd4f"
    }
  ]
}
```

#### Filename clashes

If the filename of an file being uploaded is the same as an existing file, the new file will have its name changed by adding the current timestamp:

* Existing filename: `my-image.jpg`
* New filename: `test-1480482847099.jpg`

### Referencing files from another collection

Once a file is uploaded, its identifier can be used to create a reference from another collection. For this example we have a collection called `books` with the following schema:

```json
{
  "fields": {
    "title": {
      "type": "String",
      "required": true
    },
    "content": {
      "type": "String",
      "required": true
    },
    "image": {
      "type": "Reference",
      "settings": {
        "collection": "mediaStore"
      }
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "compose": true,
    "sort": "title",
    "sortOrder": 1
  }
}
```

The `image` field is a Reference field which will lookup the default `mediaStore` collection to resolve the reference. Having uploaded an image file and received its metadata, we can now send a POST to the `books` collection with the image identifier.

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
Content-Type: application/json
Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe

{
  "title": "Harry Potter and the Philosopher's Stone",
  "content": "Harry Potter and the Philosopher's Stone is the first novel in the Harry Potter series and J. K. Rowling's debut novel, first published in 1997 by Bloomsbury.",
  "image": "58576e72bafa53b625aebd4f"
}
```

A subsequent GET request for this book would return a response such as:

```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "content": "Harry Potter and the Philosopher's Stone is the first novel in the Harry Potter series and J. K. Rowling's debut novel, first published in 1997 by Bloomsbury.",
  "image": {
    "fileName":"my-image.jpg",
    "mimetype":"image/jpeg",
    "width":1920,
    "height":1080,
    "path":"workspace/media/2016/12/19/my-image.jpg",
    "contentLength":173685,
    "_createdAt":1482124902978,
    "_createdBy":"your-client-key",
    "_version":1,
    "_id":"58576e72bafa53b625aebd4f"
  }
}
```

### Pre-signed URLs

Pre-signed URLs are useful to allow your users or applications to be able to upload a file without requiring an access token. When you request a pre-signed URL, you must provide an access token (see [Authentication](#x)) and specify an expected filename and MIME type for the file to be uploaded. The pre-signed URLs are valid only for the duration specified in the main configuration file or passed in the request for the signed URL.


#### Configuration

```json
"media": {
  "enabled": true,
  "tokenSecret": "catbus-goat-omelette",
  "tokenExpiresIn": "10h"
}
```

#### Request a signed URL

To obtain a signed URL, send a POST request to the `/media/sign` endpoint. The body of the request should contain the filename and MIME type of the file to be uploaded:

```http
POST /media/sign HTTP/1.1
Host: api.somedomain.tech
Content-Type: application/json
Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe

{
  fileName: 'my-image.jpg',
  mimetype: 'image/jpeg'
}
```

API returns a response with a `url` property that contains the signed URL for uploading the specified file:

```http
HTTP/1.1 200 OK
Content-Type: application/json
content-length: 305
Connection: keep-alive

{
  "url": "/media/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6ImltYWdlLmpwZyIsImlhdCI6MTUyNzU3MzMzMiwiZXhwIjoxNTI3NTc2OTMyfQ.9d9HI3gCOSeuNgkeepISvs2QSvfcpXSSRBeHa6qVsXA"
}
```

##### Override the expiry when requesting a signed URL

The globally-configured token expiry value can be overridden when requesting a signed URL by specifying a new expiry in the request to obtain the signed URL:

```http
POST /media/sign HTTP/1.1

{
  fileName: 'my-image.jpg',
  mimetype: 'image/jpeg',
  expiresIn: '15000' // value in seconds
}
```

#### Upload the file

With the signed URL obtained in the above step, a POST request can be sent to that URL with the file. See [Uploading a file](#uploading-a-file) for information regarding the upload process.

```http
POST /media/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlTmFtZSI6ImltYWdlLmpwZyIsImlhdCI6MTUyNzU3MzMzMiwiZXhwIjoxNTI3NTc2OTMyfQ.9d9HI3gCOSeuNgkeepISvs2QSvfcpXSSRBeHa6qVsXA HTTP/1.1
```

### Error messages

#### Signed URL token expired

If the token for a signed URL has expired, the following response will be returned:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 305
Connection: keep-alive

{
  "statusCode": 400,
  "name": "TokenExpiredError",
  "message": "jwt expired",
  "expiredAt": "2018-05-29T05:59:17.000Z"
}
```

#### Invalid filename

If the filename of the uploaded file doesn't match that sent in the request to obtain the signed URL, API returns a 400 error:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 305
Connection: keep-alive

{
  "statusCode": 400,
  "name": "Unexpected filename",
  "message": "Expected a file named 'my-image.jpg'"
}
```

#### Invalid MIME type

If the MIME type of the uploaded file doesn't match that sent in the request sent to obtain the signed URL, API returns a 400 error:

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 305
Connection: keep-alive
  
{
  "statusCode": 400,
  "name": "Unexpected mimetype",
  "message": "Expected a mimetype of 'image/jpeg'"
}
```

## Creating Database Indexes

Indexes provide high performance read operations for frequently used queries and are fundamental in ensuring performance under load and at scale.

Database indexes can be automatically created for a collection by specifying the fields to be indexed in the `settings` block.
An index will be created on the collection using the fields specified in the `keys` property.

An index block such as `{ "keys": { "fieldName": 1 } }` will create an index for the field `fieldName` using an ascending order.
The order will be reversed if the `1` is replaced with `-1`. Specifying multiple fields will create a compound index.

```json
"settings": {
  "cache": true,
  "index": [
    {
      "keys": {
        "title": 1
      }
    }
  ]
}
```

Multiple indexes can be created for each collection, simply by adding more index blocks to the array for the `index` property.

### Index Options

Each index also accepts an `options` property. The options available for an index depend on the underlying data connector being used, so it's essential that you check the documentation for the data connector to determine what is possible. For example, the MongoDB data connector is capable of creating indexes with any of the options available in the MongoDB driver, such as specifying that an index be a unique index:

```json
"index": [
  {
    "keys": {
      "email": 1
    },
    "options": {
      "unique": true
    }
  }
]
```

## Document Revision History

### **settings.storeRevisions**

If `settings.storeRevisions` is **true**:

* a `revision collection` will automatically be generated in the database when the first document for the collection is created
* a `revision document` will be stored in the `revision collection` when a new document is created
* a `revision document` will be stored for each subsequent update to an existing document  
* each time a `revision document` is created, the `_id` of the `revision document` is pushed onto a `_history` array of the original document

### **settings.revisionCollection**

If `settings.revisionCollection` is specified, the collection's `revision collection` will be named according to the specified value, otherwise the collection's `revision collection` will take the form `{collection name}History`.

For example:

`db.books.find()`

Main document stored in the collection, with revisions referenced in the history array:

```json
{
  "_id": "548efd7687fd8b50f3dca6e5",
  "title": "War and Peace",
  "_history": [
    "548efd7687fd8b50f3dca6e6",
    "548efd7687fd8b50f3dca6e7"
  ]
}
```

`db.booksHistory.find()`

Two revision documents stored in the revision collection — one created at the same time as the original document was created, the second created after an update operation to change the value of `title`:

```json
{
  "_id": "548efd7687fd8b50f3dca6e6",
  "title": "Draft"
}

{
  "_id": "548efd7687fd8b50f3dca6e7",
  "title": "War and Peace",
  "_history": [
    "548efd7687fd8b50f3dca6e6"
  ]
}
```

> **Note:** DADI API does not add or update any date/time fields to indicate the order in which revision documents were created, nor does it perform any sort operations when returning a document's revision history. It is up to the API consumer to include appropriate date/time fields and perform sort operations on the returned revision collection.

## Document Composition

To reduce data duplication caused by embedding sub-documents, DADI API allows the use of *Reference* fields which can best be described as pointers to other documents, which could be in the same collection, another collection in the same database or a collection in a different database.

**Reference Field Settings**

| Property       | Description        |   Example
|:----------------|:-------------------|:-------
| database | The name of the database that holds the reference data. Can be omitted if the field references data in the same database as the referring document. | `"library"`
| collection | The name of the collection that holds the reference data. Can be omitted if the field references data in the same collection as the referring document, or if the field references documents from multiple collections. | `"people"`
| fields  | An array of fields to return for each referenced document.   | `["firstName", "lastName"]`

### A simple example

Consider the following two collections: `books` and `people`. `books` contains a *Reference* field `author` which is capable of loading documents from the `people` collection. By creating a `book` document and setting the `author` field to the `_id` value of a document from the `people` collection, API is able to resolve the reference and return the `author` as a subdocument within the response for a `books` query.

**Books `(collection.books.json)`**

```json
{
  "fields": {
    "title": {
      "type": "String"
    },
    "author": {
      "type": "Reference",
      "settings": {
        "collection": "people"
      }
    }
  }
}
```

**People `(collection.people.json)`**

```json
{
  "fields": {
    "name": {
      "type": "String"
    }
  }
}
```

**Request**

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{ "title": "For Whom The Bell Tolls", "author": "560a5baf320039f7d6a78d4a" }
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a3b68d4c",
      "_composed": {
        "author": "560a5baf320039f7d6a78d4a"
      },
      "author": {
        "_id": "560a5baf320039f7d6a78d4a",
        "name": "Ernest Hemingway"
      }
    }
  ]
}
```

### Enabling composition

> **Note**
>
> By default, referenced documents will **not** be resolved and the raw document IDs will be shown in the response. This is by design, since resolving documents adds additional load to the processing of a request and therefore it's important that developers actively enable it only when necessary.
>
> -- warning

Composition is the feature that allows API to resolve referenced documents before the response is delivered to the consumer. It means transforming document IDs into the actual content of the documents being referenced, and it can take place recursively for any number of levels – e.g. `{"author": "X"}` resolves to a document from the `people` collection, which in its turn may resolve `{"country": "Y"}` to a document from the `countries` collection, and so on.

API will resolve a referenced document for a particular level if the referenced collection has `settings.compose: true` in its schema file *or* if there is a `compose` URL parameter that overrides that behaviour.

The value of `compose` can be:

- `false`: Stops any referenced documents from being resolved
- `true`: Resolves all referenced documents for the current level; behaviour for nested levels depends on the value of `settings.compose` of the respective collections
- a number (e.g. `compose=N`): Resolves all referenced documents for `N` number of levels, including the current one
- `all`: Resolves all referenced documents for all levels

### The `_composed` property

When a document ID is resolved into a referenced document, the raw value of the *Reference* field is added to a `_composed` internal property. This allows consumers to determine that the result of a given field differs from its actual internal representation, which can still be accessed via the `_composed` property, if needed.

### Referencing one or multiple documents

Reference fields can link to one or multiple documents, depending on whether the input data is an ID or an array of IDs. The input format is respected in the composed response.

**Request**

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

[
  { "title": "For Whom The Bell Tolls", "author": "560a5baf320039f7d6a78d4a" },
  { "title": "Nightfall", "author": [ "560a5baf320039f7d6a78d1a", "560a5baf320039f7d6a78d1a" ] }
]
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a3b68d4c",
      "_composed": {
        "author": "560a5baf320039f7d6a78d4a"
      },
      "title": "For Whom The Bell Tolls",
      "author": {
        "_id": "560a5baf320039f7d6a78d4a",
        "name": "Ernest Hemingway"
      }
    },
    {
      "_id": "560a5baf320039f1a3b68d4d",
      "_composed": {
        "author": [
          "560a5baf320039f7d6a78d1a",
          "560a5baf320039f7d6a78d1a" 
        ]
      }
      "title": "Nightfall",
      "author": [
        {
          "_id": "560a5baf320039f7d6a78d1a",
          "name": "Jake Halpern"
        },
        {
          "_id": "560a5baf320039f7d6a78d1b",
          "name": "Peter Kujawinski"
        }
      ]
    }
  ]
}
```

### Multi-collection references

Rather than referencing documents from a collection that is pre-defined in the `settings.collection` property of the field schema, a single field can reference documents from multiple collections. If the input data is an object (or array of objects) with a `_collection` and `_data` properties, then the corresponding values will be used to determine the collection and ID of each referenced document.

**Movies `(collection.movies.json)`**

```json
{
  "fields": {
    "title": {
      "type": "String"
    },
    "crew": {
      "type": "Reference"
    }
  }
}
```

**Directors `(collection.directors.json)`**, **Producers `(collection.producers.json)`** and **Writers `(collection.writers.json)`**:

```json
{
  "fields": {
    "name": {
      "type": "String"
    }
  }
}
```

**Request**

```http
POST /1.0/library/movies HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{
  "title": "Casablanca",
  "crew": [
    {
      "_collection": "writers",
      "_data": "5ac16b70bd0d9b7724b24a41"
    },
    {
      "_collection": "directors",
      "_data": "5ac16b70bd0d9b7724b24a42"
    },
    {
      "_collection": "producers",
      "_data": "5ac16b70bd0d9b7724b24a43"
    }
  ]
}
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a1b68d4c",
      "_composed": {
        "crew": [
          "5ac16b70bd0d9b7724b24a41",
          "5ac16b70bd0d9b7724b24a42",
          "5ac16b70bd0d9b7724b24a43"
        ]
      },
      "_refCrew": {
        "5ac16b70bd0d9b7724b24a41": "writers",
        "5ac16b70bd0d9b7724b24a42": "directors",
        "5ac16b70bd0d9b7724b24a43": "producers"
      },
      "title": "Casablanca",
      "crew": [
        {
          "_id": "5ac16b70bd0d9b7724b24a41",
          "name": "Julius J. Epstein"
        },
        {
          "_id": "5ac16b70bd0d9b7724b24a42",
          "name": "Michael Curtiz"
        },
        {
          "_id": "5ac16b70bd0d9b7724b24a43",
          "name": "Hal B. Wallis"
        }
      ]
    }
}
```

Note the presence of `_refCrew` in the response. This is an internal field that maps document IDs to the names of the collections they belong to, as that information is not possible to extract from the resolved documents.

### Pre-composed documents

Setting the content of a Reference field to one or multiple document IDs is the simplest way of referencing documents, but it creates some complexity for consumer apps that wish to insert multiple levels of referenced documents.

For example, imagine that you want to create a book *and* its author. You would:

1. Create the author document
1. Grab the document ID from step 1 and add it to the `author` property of a new book
1. Create the book document

You can see how this would get increasingly complex if you wanted to insert more levels. To address that, and as an alternative to receiving just document IDs, API is capable of processing a pre-composed set of documents and figure out what to do with the data, including creating and updating documents, as well as populating Reference fields with the right document IDs.

#### Creating documents

When the content of a Reference field is an object *without* an ID, a corresponding document is created in the collection defined by the `settings.collection` property of the field schema. If an array is sent, multiple documents will be created.

**Request**

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

[
  {
    "title": "For Whom The Bell Tolls",
    "author": { "name": "Ernest Hemingway" }
  },
  {
    "title": "Nightfall",
    "author": [
      { "name": "Jake Halpern" },
      { "name": "Peter Kujawinski" }
    ]
  }
]
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a3b68d4c",
      "_composed": {
        "author": "560a5baf320039f7d6a78d4a"
      },
      "title": "For Whom The Bell Tolls",
      "author": {
        "_id": "560a5baf320039f7d6a78d4a",
        "name": "Ernest Hemingway"
      }
    },
    {
      "_id": "560a5baf320039f1a3b68d4d",
      "_composed": {
        "author": [
          "560a5baf320039f7d6a78d1a",
          "560a5baf320039f7d6a78d1b"
        ]
      },
      "title": "Nightfall",
      "author": [
        {
          "_id": "560a5baf320039f7d6a78d1a",
          "name": "Jake Halpern"
        },
        {
          "_id": "560a5baf320039f7d6a78d1b",
          "name": "Peter Kujawinski"
        }
      ]
    }
  ]
}
```

#### Updating documents

When the content of a Reference field is an object *with* an ID, API updates the document referenced by that ID with the new sub-document.

The example below creates a new book and sets an existing document (`560a5baf320039f7d6a78d4a`) as its author, but it also makes an update to the referenced document – in this case, `name` is changed to `"Ernest Miller Hemingway"`.

**Request**

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

[
  {
    "title": "For Whom The Bell Tolls",
    "author": {
      "_id": "560a5baf320039f7d6a78d4a",
      "name": "Ernest Miller Hemingway"
    }
  }
]
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a3b68d4c",
      "_composed": {
        "author": "560a5baf320039f7d6a78d4a"
      },
      "title": "For Whom The Bell Tolls",
      "author": {
        "_id": "560a5baf320039f7d6a78d4a",
        "name": "Ernest Miller Hemingway"
      }
    }
  ]
}
```

#### Multi-collection references

It's possible to insert pre-composed documents that use the multi-collection reference syntax, as long as the pre-composed documents are inside the `_data` property of the outermost object in the Reference field value.

The example below shows how the various scenarios can be mixed and matched: the first element of `crew` is a new document to be created in the `writers` collection (no ID); the second item is a document ID, which will be stored as is in the `directors` collection; the third item references an existing document from the `producers` collection, whose `name` will be updated to a new value.

**Request**

```http
POST /1.0/library/movies HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{
  "title": "Casablanca",
  "crew": [
    {
      "_collection": "writers",
      "_data": {
        "name": "Julius J. Epstein"
      }
    },
    {
      "_collection": "directors",
      "_data": "5ac16b70bd0d9b7724b24a42"
    },
    {
      "_collection": "producers",
      "_data": {
        "_id": "5ac16b70bd0d9b7724b24a43",
        "name": "Hal Brent Wallis"
      }
    }
  ]
}
```

**Response**

```json
{
  "results": [
    {
      "_id": "560a5baf320039f1a1b68d4c",
      "_composed": {
        "crew": [
          "5ac16b70bd0d9b7724b24a41",
          "5ac16b70bd0d9b7724b24a42",
          "5ac16b70bd0d9b7724b24a43"
        ]
      },
      "_refCrew": {
        "5ac16b70bd0d9b7724b24a41": "writers",
        "5ac16b70bd0d9b7724b24a42": "directors",
        "5ac16b70bd0d9b7724b24a43": "producers"
      },
      "title": "Casablanca",
      "crew": [
        {
          "_id": "5ac16b70bd0d9b7724b24a41",
          "name": "Julius J. Epstein"
        },
        {
          "_id": "5ac16b70bd0d9b7724b24a42",
          "name": "Michael Curtiz"
        },
        {
          "_id": "5ac16b70bd0d9b7724b24a43",
          "name": "Hal Brent Wallis"
        }
      ]
    }
}
```

### Limiting fields of referenced documents

When a reference is resolved, the entire referenced document will be included by default, but it's possible to limit the fields that will be included in the composed response. You can do this by specifying a `fields` array within the `settings` block of the *Reference* field's schema.

**Books `(collection.books.json)`**

```json
{
  "fields": {
    "title": {
      "type": "String"
    },
    "author": {
      "type": "Reference",
      "settings": {
        "collection": "people",
        "fields": ["firstName", "lastName"]
      }
    }
  }
}
```

Alternatively, you can specify the fields to be retrieved for each *Reference* field using the `fields` URL parameter with dot-notation. The following request instructs API to get all books, limiting the fields returned to `title` and `author`, with the latter only showing the fields `name` and `occupation` from the referenced collection.

```http
GET /1.0/library/books?fields={"title":1,"author.name":1,"author.occupation":1} HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json
```

## Collection Statistics

Collection statistics can be retrieved by sending a GET request to a collection's `/stats` endpoint:

```http
GET /1.0/library/books/stats HTTP/1.1
Host: api.somedomain.tech
Content-Type: application/json
Cache-Control: no-cache
```

An example response when using the MongoDB data connector:

```json
{
  "count": 2,
  "size": 480,
  "averageObjectSize": 240,
  "storageSize": 8192,
  "indexes": 1,
  "totalIndexSize": 8176,
  "indexSizes": { "_id_": 8176 }
}
```


## Adding application logic

### Endpoints

DADI API custom endpoints give you the ability to modify, enrich and massage your data before it is returned to the user making the request. Collection endpoints return raw data in response to requests, whereas custom endpoints give you more control over what you return.

#### Endpoint Specification

Endpoint specifications are simply JavaScript files stored in your application's `/workspace/endpoints` folder. It is important to understand how the folder hierarchy in the endpoints folder affects the behaviour of your API.


```
my-api/
  workspace/
    collections/                    # MongoDB collection specifications
      1.0/                          # API version label
    endpoints/                      # Custom Javascript endpoints
      1.0/                          # API version label

```

#### Endpoint

Endpoint specifications exist as JavaScript files within a `version` folder as mentioned above. The naming convention for the collection specifications is `endpoint.<endpoint name>.js`

#### Endpoint URL

With the above folder and file hierarchy an endpoint's URL uses the following format:

`https://api.somedomain.tech/{version}/{endpoint name}`

In actual use this might look like the following:

`https://api.somedomain.tech/1.0/booksByAuthor`

#### The Endpoint file

Endpoint specification files should export functions with lowercase names that correspond to the HTTP method that the function is designed to handle.

For example:

```js
module.exports.get = function (req, res, next) {

}

module.exports.post = function (req, res, next) {

}
```

Each function receives the following three arguments:

`(request, response, next)`

1. `request` is an instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
2. `response` is an instance of Node's [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)
3. `next` is a function that can be passed an error or called if this endpoint has nothing to do.  Passing an error, e.g. `next(err)` will result in an HTTP 500 response. Calling `next()` will respond with an HTTP 404.

**Example, HTTP 200 response**

```js
module.exports.get = function (req, res, next) {
  let data = {
    results: [
      {
        title: 'Book One',
        author: 'Benjamin Franklin'
      }
    ]
  }

  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(data))
}
```

**Example, HTTP 404 response**

```js
module.exports.get = function (req, res, next) {
  res.setHeader('content-type', 'application/json')
  res.statusCode = 404
  res.end()
}
```

**Example, HTTP 500 response**

```js
module.exports.get = function (req, res, next) {
  let error = {
    errors: [
      'An error occured while processing your request'
    ]
  }

  res.setHeader('content-type', 'application/json')
  res.statusCode = 500
  res.end(JSON.stringify(error))
}
```

##### Custom Endpoint Routing

It is possible to override the default endpoint route by including a `config` function in the endpoint file. The function should return a `config` object with a `route` property. The value of this property will be used for the endpoint's route.

The following example returns a config object with a route that specifies an optional request parameter, `id`.

```js
module.exports.config = function () {
  return {
    route: '/1.0/books/:id([a-fA-F0-9]{24})?'
  }
}
```

This route will now respond to requests such as

```
https://api.somedomain.tech/1.0/books/55bb8f688d76f74b1303a137
```

Without this custom route, the same could be achieved by requesting the default route with a querystring parameter.

```
https://api.somedomain.tech/1.0/books?id=55bb8f688d76f74b1303a137
```

#### Authentication

Authentication can be bypassed for your custom endpoint by adding the following to your endpoint file:

```js
module.exports.model = {}
module.exports.model.settings = { authenticate : false }
```


### Hooks

Hooks perform operations on data before/after GET, UPDATE and DELETE requests. In essence, a hook is simply a function that intercepts a document/query before it's executed, having the option to modify it before returning it back to the model.

#### Use cases

- Creating variations of a field, such as creating a slug (example above);
- Validating fields with complex conditions, when a regular expression might not be enough;
- Triggering an action, notification or external command when a record is modified.

#### Anatomy of a hook

A hook is stored as an individual file in a `hooks` directory (defaulting to `/workspace/hooks`) and can be used by being attached to `create`, `update` or `delete` operations in the `settings` section of a collection schema specification.

*collections.user.json*:

```
"settings": {
  "hooks": {
    "create": ["myhook1", "myhook2"]
  }
}
```

This means that whenever a new user is created, the document that is about to be inserted will be passed to `myhook1`, its return value will then be passed on to `myhook2` and so on. After all the hooks finish executing, the final document will be returned to the model to be inserted in the database.

The order in which hooks are executed is defined by the order of the items in the array.

The following example defines a very simple hook, which will change the `name` field of a document before returning it.

```js
module.exports = function (doc, type, data) {
  doc.name = 'Modified by the hook'

  return doc
}
```

This particular hook will receive a document, change a property (`name`) and return it back. So if attached to the `create` event, it will make all the created documents have `name` set to `Modified by the hook`.

However, this logic ties the hook to the schema — what happens if we want to modify a property other than `name`? Hooks are supposed to be able to add functionality to a document, and should be approached as interchangeable building blocks rather than pieces of functionality tightly coupled with a schema.

For that reason, developers might have the need to pass extra information to the hook — e.g. inform the hook the name of the properties that should be modified. As such, in addition to the syntax shown above for declaring a hook (an array of strings), an alternative one allows data to be passed through a `options` object.

```json
"settings": {
  "hooks": {
    "beforeCreate": [
      {
        "hook": "slugify",
        "options": {
          "from": "title",
          "to": "slug"
        }
      }
    ]
  }
}
```

In this example we implement a hook that populates a field (`slug`) with a URL-friendly version of another field (`title`). The hook is created in such a way that the properties it reads from and writes to are dynamic, passed through as `from` and `to` from the `options` block. The `slugify` hook can then be written as follows:

```js
// Example hook: Creates a URL-friendly version (slug) of a field
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

module.exports = function (obj, type, data) {
  // We use the options object to know what field to use as the source
  // and what field to populate with the slug
  obj[data.options.to] = slugify(obj[data.options.from])
  return obj
}
```


#### *Before* and *After* Hooks

Different types of hooks are executed at different points in the lifecycle of a request. There are two main types of hooks:

- *Before* hooks: are always executed, fired just before the model processes the request and grabs the documents from the database. These hooks have the power to modify the query parameters, and therefore modify the set of documents that will be retrieved, as well as to abort an operation completely, if they choose to throw an error;
- *After* hooks: are executed only if the operation has been successful (i.e. no errors resulting from either *before* hooks or from the communication with the database). They are fired after the result set has been formed and delivered to the consumer. *Before* hooks cannot affect the result of a request. Typically used to trigger operations that must take place after a set of documents has been successfully created, updated or deleted.

These hook types are then applied to each of the CRUD operations (e.g. `beforeCreate`, `afterCreate`, etc.). If you think of API as an assembly line that processes requests and documents, this is where hooks would sit:

<pre>
         ______________          __________            _____________ 
Request |              |        |          | Response |             |
------> | beforeCreate | -----> | Database | -------> | afterCreate |
        |______________|        |__________|          |_____________|
</pre>

#### Types and signatures

Hooks are expected to export a function that receives three parameters:

1. The document or query being processed (type: `Object`)
1. The name of the hook type (type: `String`, example: `"beforeCreate"`)
1. An object with additional data that varies with each hook type (type: `Object`)

##### beforeCreate

Fires for `POST` requests, before documents are inserted into the database.

*Parameters:*

1. `documents`: An object or array of objects representing the documents about to be created
1. `type`: A string containing `"beforeCreate"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `req`: the instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  - `schema`: the schema of the current collection

*Returns:*

The new set of documents to be inserted. An error can be thrown to abort the operation.

##### afterCreate

Fires for `POST` requests, if and after the documents have been successfully inserted.

*Parameters:*

1. `documents`: An object or array of objects representing the documents created
1. `type`: A string containing `"afterCreate"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `schema`: the schema of the current collection

*Returns:*

N/A

##### beforeDelete

Fires for `DELETE` requests, before data is deleted from the database.

*Parameters:*

1. `query`: A query that will be used to filter documents for deletion
1. `type`: A string containing `"beforeDelete"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `req`: the instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  - `schema`: the schema of the current collection
  - `deletedDocs`: an array containing the documents that are about to be deleted

*Returns:*

The new query to filter documents with. An error can be thrown to abort the operation.

##### afterDelete

Fires for `DELETE` requests, if and after the documents have been successfully deleted.

*Parameters:*

1. `query`: A query that was used to filter documents for deletion
1. `type`: A string containing `"afterDelete"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `schema`: the schema of the current collection
  - `deletedDocs`: an array containing the documents that are about to be deleted

*Returns:*

N/A

##### beforeGet

Fires for `GET` requests, before documents are retrieved from the database.

*Parameters:*

1. `query`: A query that will be used to filter documents
1. `type`: A string containing `"beforeGet"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `req`: the instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  - `schema`: the schema of the current collection

*Returns:*

The new query to filter documents with. An error can be thrown to abort the operation.

##### afterGet

Fires for `GET` requests. Unlike other *after* hooks, *afterGet* happens after the data has been retrieved but before the response is sent to the consumer. As a consequence, *afterGet* hooks have the ability to massage the data before it's delivered.

*Parameters:*

1. `documents`: An object or array of objects representing the documents retrieved
1. `type`: A string containing `"afterGet"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `req`: the instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  - `schema`: the schema of the current collection

*Returns:*

The result set formatted for output. An error can be thrown to abort the operation.

##### beforeUpdate

Fires for `PUT` requests, before documents are updated on the database.

*Parameters:*

1. `update`: An object with the set of fields to be updated and their respective new values
1. `type`: A string containing `"beforeUpdate"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `req`: the instance of Node's [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)
  - `schema`: the schema of the current collection
  - `updatedDocs`: the documents about to be updated

*Returns:*

The new update object. An error can be thrown to abort the operation.

##### afterUpdate

Fires for `PUT` requests, if and after the documents have been successfully updated.

*Parameters:*

1. `documents`: An object or array of objects representing the documents updated
1. `type`: A string containing `"afterUpdate"`
1. `options`: An options object containing:
  - `collection`: name of the current collection
  - `options`: options block from the hook definition in the collection schema
  - `schema`: the schema of the current collection

*Returns:*

N/A

#### Testing

The following hook may be useful to get a better idea of when exactly each hook type is fired and what data it receives, as it logs to the console its internals every time it gets called:

*workspace/hooks/showInfo.js*

```js
module.exports = function (obj, type, data) {
  console.log('')
  console.log('Hook type:', type)
  console.log('Payload:', obj)
  console.log('Additional data:', data)
  console.log('')

  return obj
}
```

And then enable it in a model:

*workspace/collections/vjoin/testdb/collection.users.json*

```js
"hooks": {
  "beforeCreate": ["showInfo"],
  "afterCreate": ["showInfo"],
  "beforeUpdate": ["showInfo"],
  "afterUpdate": ["showInfo"],
  "beforeDelete": ["showInfo"],
  "afterDelete": ["showInfo"]
}
```

## Internal Endpoints

### Hello

The *Hello* endpoint returns a plain text response with the string *Welcome to API* when a `GET` request is made to the `/hello` endpoint. It can be used to verify that DADI API is successfully installed and running. You should expect a 200 status code to be returned when requesting this endpoint.

### Configuration

The `/api/config` endpoint returns a JSON response with API's current configuration. This endpoint requires authentication by passing a Bearer token in the Authorization header. See the [Authentication](#authentication) section for more detail.

```http
GET /api/config HTTP/1.1
Host: api.somedomain.tech
Content-Type: application/json
Cache-Control: no-cache
```

### Cache flush

Cached files can be flushed by sending a `POST` request to API's `/api/flush` endpoint. The request body must contain a path that matches a collection resource. For example, the following will flush all cache files that match the collection path `/1.0/library/books`.

```http
POST /api/flush HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{ "path": "/1.0/library/books" }
```

A successful cache flush returns a JSON response with a 200 status code:

```json
{
  "result": "success",
  "message": "Cache flush successful"
}
```

#### Flush all files

To flush all cache files from the API's caching layer, send `*` as the path in the request body:

```http
POST /api/flush HTTP/1.1
Host: api.somedomain.tech
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{ "path": "*" }
```

### All Collections

The `/api/collections` endpoint returns a JSON response containing information about the available collections that can be queried.

```http
GET /api/collections HTTP/1.1
Host: api.somedomain.tech
Content-Type: application/json
Cache-Control: no-cache
```

```json
{
  "collections": [
    {
      "name": "books",
      "slug": "books",
      "version": "1.0",
      "database": "library",
      "path": "/1.0/library/books"
    },
    {
      "name": "user",
      "slug": "user",
      "version": "1.0",
      "database": "library",
      "path": "/1.0/library/users"
    },
    {
      "name": "author",
      "slug": "author",
      "version": "1.0",
      "database": "library",
      "path": "/1.0/library/authors"
    }
  ]
}
```

## Data connectors reference

### MongoDB Connector

The MongoDB connector allows you to use MongoDB as the backend for API. It was extracted from API core as part of the 3.0.0 release. The connector is available as an NPM package, with full source code available on GitHub. Help improve the package at https://github.com/dadi/api-mongodb.


#### Installing

```console
$ npm install --save @dadi/api-mongodb
```

#### Configuring

As with any of the API data connectors, you need two configuration files. Details regarding the main configuration file can be found [elsewhere in this document](#configuration). Below are the configuration options for your MongoDB configuration file.

These parameters are defined in JSON files placed inside the `config/` directory, named as `mongodb.{ENVIRONMENT}.json`, where `{ENVIRONMENT}` is the value of the `NODE_ENV` environment variable. In practice, this allows you to have different configuration parameters for when API is running in development, production and any staging, QA or anything in between.

Some configuration parameters also have corresponding environment variables, which will override whatever value is set in the configuration file.

The following table shows a list of all the available configuration parameters.

| Path | Description | Environment variable | Default | Format
|:--|:--|:--|:--|:--
| `env` | The applicaton environment | `NODE_ENV` | `development` | `production` or `development` or `test` or `qa`
| `hosts` | An array of MongoDB hosts to connect to. Each host entry must include a `host` and `port` as detailed below. | *N/A* | `` | Array
| `hosts.host` | The host address of the MongoDB instance | *N/A* | `` | *
| `hosts.port` | The port of the MongoDB instance | *N/A* | `` | Number
| `username` | The username used to connect to the database (optional) | `DB_USERNAME` | `` | String
| `password` | The password used to connect to the database (optional) | `DB_PASSWORD` | `` | String
| `authMechanism` | If no authentication mechanism is specified or the mechanism DEFAULT is specified, the driver will attempt to authenticate using the SCRAM-SHA-1 authentication method if it is available on the MongoDB server. If the server does not support SCRAM-SHA-1 the driver will authenticate using MONGODB-CR. | `DB_AUTH_MECHANISM` | `DEFAULT` | String
| `authDatabase` | The database to authenticate against when supplying a username and password | `DB_AUTH_SOURCE` | `admin` | String
| `database` | The name of the database to connect to | `DB_NAME` | `` | String
| `ssl` | If true, initiates the connection with TLS/SSL | *N/A* | `` | Boolean
| `replicaSet` | Specifies the name of the replica set, if the mongod is a member of a replica set. When connecting to a replica set it is important to give a seed list of at least two mongod instances. If you only provide the connection point of a single mongod instance, and omit the replicaSet, the client will create a standalone connection. | *N/A* | `` | String
| `readPreference` | Choose how MongoDB routes read operations to the members of a replica set - see https://docs.mongodb.com/manual/reference/read-preference/ | *N/A* | `secondaryPreferred` | `primary` or `primaryPreferred` or `secondary` or `secondaryPreferred` or `nearest`
| `enableCollectionDatabases` | — | *N/A* | `` | Boolean

```cson
{
  "hosts": [
    {
      "host": "127.0.0.1",
      "port": 27017
    }
  ],
  "username": "",
  "password": "",
  "database": "testdb",
  "ssl": false,
  "replicaSet": "",
  "enableCollectionDatabases": true,
  "databases": {
    "testdb": {
      "hosts": [
        {
          "host": "127.0.0.1",
          "port": 27017
        }
      ]
    }
  }
}
```

#### Using MongoLab

If you're unable to install MongoDB yourself, [MongoLab](https://mlab.com) provides a variety of plans to get you running with a MongoDB backend for API. They have a free Sandbox tier that is ideal to get a prototype online. Create an account at https://mlab.com/signup/, verify your email address, and we'll begin configuring API.

##### Create new deployment

Once your account is created with MongoLab you'll need to create a new "MongoDB Deployment". Follow the prompts to create a Sandbox deployment, then click Submit Order on the final screen to provision the service:

![](/assets/api/mlab/2.png)

![](/assets/api/mlab/6.png)

![](/assets/api/mlab/7.png)

##### View MongoDB details

When the database is ready, click on its name to see the details required for connecting to it.

![](/assets/api/mlab/8.png)

##### Creating a MongoLab database user

MongoLab requires you to create a database user in order to connect:

> A database user is required to connect to this database. To create one now, visit the 'Users' tab and click the 'Add database user' button.

Complete the fields in the New User popup and keep a note of the username and password for the next step.

![](/assets/api/mlab/9.png)


##### Connecting from API

To connect to a MongoDB database you require two configuration files: the first is the main API configuration file (config.development.json) and the second is the configuration file for the MongoDB data connector (mongodb.development.json).

**config.development.json**

The key settings in the main API configuration file are `datastore`, `auth.datastore` and `auth.database`. When using the MongoDB data connector, `datastore` must be set to `"@dadi/api-mongodb"`. If using MongoDB for API's authentication data, `auth.datastore` must also be set to `"@dadi/api-mongodb"`. The `auth` section also specifies the database to use for authentication data; in the example below it is set to the name of the database we created when setting up the MongoLab database.

```json
{
  "app": {
    "name": "MongoLab Test"
  },
  "server": {
    "host": "127.0.0.1",
    "port": 3000
  },
  "publicUrl": {
    "host": "localhost",
    "port": 3000
  },
  "datastore": "@dadi/api-mongodb",
  "auth": {
    "tokenUrl": "/token",
    "tokenTtl": 18000,
    "clientCollection": "clientStore",
    "tokenCollection": "tokenStore",
    "datastore": "@dadi/api-mongodb",
    "database": "dadiapisandbox"
  },
  "paths": {
    "collections": "workspace/collections",
    "endpoints": "workspace/endpoints",
    "hooks": "workspace/hooks"
  }
}
```

**mongodb.development.json**

In addition to the main configuration file, API requires a configuration file specific to the data connector. The configuration file for the MongoDB connector must be located in the `config` directory along with the main configuration file. `mongodb.development.json` contains settings for connecting to a MongoDB database.

The database detail page on MongoLab shows a couple of ways to connect to your MongoLab database. We'll take some parameters from the "mongo shell" option and use them in our configuration file:

> To connect using the mongo shell:
> mongo ds159509.mlab.com:59509/dadiapisandbox -u <dbuser> -p <dbpassword>


```cson
{
  "hosts": [
    {
      "host": "ds159509.mlab.com",
      "port": 59509
    }
  ],
  "username": "dadiapi",  // username for database user created in MongoLab
  "password": "ipaidad",  // password for database user created in MongoLab
  "database": "dadiapisandbox",
  "ssl": false,
  "replicaSet": "",
  "databases": {
    "dadiapisandbox": {
      "authDatabase": "dadiapisandbox",  // the name of the database to use for authenticating, required when specifying a username and password
      "hosts": [
        {
          "host": "ds159509.mlab.com",
          "port": 59509
        }
      ]
    }
  }
}
```

##### Booting API

When you start your API application it will attempt to connect to the MongoLab database using the specified settings. 

```
$ npm start
```

After API finishes booting, you can click on the "Collections" tab in the MongoLab website and see the collections that API has created from your workspace collection schemas.

![](/assets/api/mlab/12.png)


##### Creating an API user

Before interacting with any of the API collections, it's useful to create a client record so you can obtain an access token. See the [Adding clients](#adding-clients) section for more details. After creating a client record you should be able to query the `clientStore` collection on the MongoLab website to see the new document.

![](/assets/api/mlab/11.png)

##### What's next?

With API connected and a client record added to the database, you can begin using the REST API to store and retrieve data. See the sections [Obtaining an Access Token](#obtaining-an-access-token) and [Retrieving data](#retrieving-data) for more detail.

The image below shows a "book" document added to the MongoLab database using the following requests:

```console
$ curl -X POST -H "Content-type: application/json" --data '{"clientId":"api-client", "secret": "client-secret"}' "http://127.0.0.1:3000/token"
```

```console
$ curl -X POST -H "Content-type: application/json" -H "Authorization: Bearer 1e6624a9-324a-4d24-86c3-e4abd0921d9c"  --data '{"name":"Test Book", "authorId": "123456781234567812345678"}' "http://127.0.0.1:3000/vjoin/testdb/books"
```

![](/assets/api/mlab/13.png)

### CouchDB Connector

The CouchDB connector allows you to use CouchDB as the backend for API.

Help improve the package at https://github.com/dadi/api-couchdb.

#### Installing

```console
$ npm install --save @dadi/api-couchdb
```

### FileStore Connector

The FileStore connector allows you to use JSON files as the backend for API, via [LokiJS](http://lokijs.org).

Help improve the package at https://github.com/dadi/api-filestore.

#### Installing

```console
$ npm install --save @dadi/api-filestore
```

### Building a connector

Sample repository at https://github.com/dadi/api-connector-template.

## How-to guides

### Connecting to API with API wrapper

When consuming data from DADI API programmatically from a JavaScript application, you can use [DADI API wrapper](https://github.com/dadi/api-wrapper) as a high-level API to build your requests, allowing you to abstract most of the formalities around building an HTTP request and setting the right headers for the content type and authentication.

In the example below, we can see how you could connect to an instance of DADI API and retrieve all the documents that match a certain query, which you can define using a [set of filters](https://github.com/dadi/api-wrapper#filters) that use a natural, conversational syntax.

```js
const DadiAPI = require('@dadi/api-wrapper')

let api = new DadiAPI({
  uri: 'https://api.somedomain.tech',
  port: 80,
  credentials: {
    clientId: 'johndoe',
    secret: 'f00b4r'
  },
  version: '1.0',
  database: 'my-db'
})

// Example: getting all documents where `name` contains "john" and age is greater than 18
api.in('users')
 .whereFieldContains('name', 'john')
 .whereFieldIsGreaterThan('age', 18)
 .find()
 .then(({metadata, results}) => {
   // Use documents here
   processData(results)
 })
```

For more information about API wrapper, including a comprehensive list of its filters and terminator functions, check the [GitHub repository](https://github.com/dadi/api-wrapper).

### Auto generate documentation

The `@dadi/apidoc` package provides a set of auto-generated documentation for your API installation, reading information from the collection schemas and custom endpoints to describe the available HTTP methods and parameters required to interact with the API.

* [Generating Code Snippets](#generating-code-snippets)
* [Documenting custom endpoints](#documenting-custom-endpoints)
* [Showing useful example values](#showing-useful-example-values)
* [Excluding Collections, Endpoints and Fields](#excluding-collections-endpoints-and-fields)

#### Installation steps

1. Inside your API installation directory, run the following:

```console
$ npm install @dadi/apidoc --save
```

2. The configuration file for API must be modified to enable the documentation middleware. Add an `apidoc` section to the configuration file:

```js
"apidoc": {
  "title": "<Project Name> Content API",
  "description": "This is the _Content API_ for [Example](http://www.example.com).",
  "markdown": false,
  "path": "docs",
  "generateCodeSnippets": false,
  "themeVariables": "default",
  "themeTemplate": "triple",
  "themeStyle": "default",
  "themeCondenseNav": true,
  "themeFullWidth": false
}
```

3. Initialise the middleware from the main API entry point (such as the `main.js` or `index.js` file:

```js
const server = require('@dadi/api')
const config = require('@dadi/api').Config
const log = require('@dadi/api').Log

server.start(function() {
  log.get().info('API Started')
})

// enable the documentation route
require('@dadi/apidoc').init(server, config)
```

#### Browse the documentation

The documentation can be accessed using the route `/api/1.0/docs`, for example `https://api.somedomain.tech/api/1.0/docs`.

#### Generating Code Snippets

If you want to generate code snippets (made possible by the configuration option
  `generateCodeSnippets`) you'll need to ensure sure your system has the following:

1. Ruby, and the Ruby gem `awesome_print`:

```console
$ gem install awesome_print
```

2. The `httpsnippet` package:

```console
$ npm install httpsnippet -g
```

#### Documenting custom endpoints

API collections are automatically documented using values from within the collection specification files. To have your documentation include useful information about custom endpoints, add [JSDoc](http://usejsdoc.org/) comments to the endpoint files:

````js
/**
 * Adds two numbers together.
 *
 * ```js
 * let result = add(1, 2);
 * ```
 *
 * @param {int} `num1` The first number.
 * @param {int} `num2` The second number.
 * @returns {int} The sum of the two numbers.
 * @api public
 */
````

#### Showing useful example values

To show example data in the documentation that isn't simply the default of "Hello World!", you can add properties to fields in the API collection specification file. The following properties can be added to fields:

**`example`**: the `example` property is a static value that will be the same every time you view the documentation:

```json
"platform": {
  "type": "String",
  "required": true,
  "example": "twitter",
  "validation": {
    "regex": {
      "pattern": "twitter|facebook|instagram"
    }
  }
}
```

**`testDataFormat`**: the `testDataFormat` property allows you to specify any type from the [faker](https://github.com/FotoVerite/Faker.js) package, which will insert a random value of the selected type each time the documentation is viewed:

```json
"email": {
  "type": "String",
  "required": true,
  "testDataFormat": "{{internet.email}}"
  "validation": {
    "regex": {
      "pattern": ".+@.+"
    }
  }
}
```

See a list of available options [here](https://github.com/FotoVerite/Faker.js).


#### Excluding collections, endpoints and fields

Often an API contains collections and collection fields that are meant for internal use and including them in the API documentation is undesirable.

To exclude collections and fields from your generated documentation, see the following sections.

##### Excluding collections

Add a `private` property to the collection specification's `settings` section:

```json
{
  "fields": {
    "title": {
      "type": "String",
      "required": true
    },
    "author": {
      "type": "Reference",
      "settings": {
        "collection": "people"
      }
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "sort": "title",
    "sortOrder": 1,
    "private": true
  }
}
```

##### Excluding endpoints

Add a `private` property to the endpoint file's `model.settings` section:

```js
module.exports.get = function (req, res, next) {
  res.setHeader('content-type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify({message: 'Hello World'}))
}

module.exports.model = {
  "settings": {
    "cache": true,
    "authenticate": false,
    "private": true
  }
}
```

##### Excluding fields

Add a `private` property to the field specification:

```json
{
  "fields": {
    "title": {
      "type": "String",
      "required": true
    },
    "internalId": {
      "type": "Number",
      "required": true,
      "private": true
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "sort": "title",
    "sortOrder": 1
  }
}
```

## Errors

### API-0001

#### Missing Index Key

You received an error similar to this:

```json
{
  "code": "API-0001",
  "title": "Missing Index Key",
  "details": "'name' is specified as the primary sort field, but is missing from the index key collection."
}
```

[TODO]

### API-0002

#### Hook Error

You received an error similar to this:

```json
{
  "success": false,
  "errors": [
    {
      "code": "API-0002",
      "title": "Hook Error",
      "details": "The hook 'myHook' failed: 'ReferenceError: title is not defined'"
    }
  ]
}
```

[TODO]

### API-0003

#### Cache Path Missing

To flush the cache, a path that matches a collection resource must be specified in the request body:

```http
POST /api/flush HTTP/1.1
Host: api.example.com
Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6
Content-Type: application/json

{ "path": "/1.0/library/books" }
```

This command will flush all cache files that match the collection path specified.

A successful cache flush returns a HTTP 200 response:

```json
{
  "result": "success",
  "message": "Cache flush successful"
}
```

##### Flush all files

To flush all cache files, send `{ path: "*" }`

### Migrating from version 2.x to 3.x

API 3.0 comes with various performance and flexibility enhancements, some of which introduce breaking changes. This document is an overview of the changes that are required to make your application ready for the upgrade. 

#### Configuring a database and data connector

Whilst API 2.0 requires a MongoDB database to run, version 3.0 is capable of working with virtually any database engine, as long as there is a [data connector module](https://www.npmjs.com/search?q=dadi-api-connector&page=1&ranking=optimal) for it.

When migrating from 2.0, we need to explicitly specify MongoDB as our database engine by adding `@dadi/api-mongodb` as a project dependency:
    
```bash
$ npm install @dadi/api-mongodb --save
```

API requires each data connector to have its own configuration file located in the same directory as API's main configuration files. Just like API, you'll need one for each environment you run the application in.

For example, if you currently have a `config.development.json` and `config.production.json` configuration files, you'll need to place `mongodb.development.json` and `mongodb.production.json` in the same directory.

```bash
api-app/
  config/              # contains environment-specific configuration files
    config.development.json
    config.production.json
    mongodb.development.json
    mongodb.production.json
  package.json
  workspace/
    collections/       
    endpoints/         
```

##### Automatic migration script

We've added a migration script which can backup your existing API 2.0 configuration files and generate new API 3.0-compatible files automatically.

To use it, run the following command from your existing API directory:

```bash
$ curl https://raw.githubusercontent.com/dadi/registry/master/api/migration-scripts/v2-v3.js | node
```

##### Manual configuration

If you're configuring this manually, follow these steps:

1. Remove the contents of the `database` property from each of your API configuration files, and paste it into the corresponding MongoDB configuration file, so that it looks similar to the following:

    ```json
    {
      "hosts": [
        {
          "host": "123.456.78.9",
          "port": 27017
        }
      ],
      "username": "",
      "password": "",
      "testdb": {
        "hosts": [
          {
            "host": "111.222.33.4",
            "port": 27017
          }
        ]
      }
    }
    ```

2. Each block of database overrides should now be namespaced under a `databases` block. Using the above as our example, it should now be similar to the following. Notice how we've moved the `"testdb"` database configuration _inside_ the new `"databases"` block:
      

    ```json
    {
      "hosts": [
        {
          "host": "123.456.78.9",
          "port": 27017
        }
      ],
      "username": "",
      "password": "",
      "databases": {
        "testdb": {
          "hosts": [
            {
              "host": "111.222.33.4",
              "port": 27017
            }
          ]
        }
      }
    }
    ```

3. In the API configuration files, add a new property `"datastore"` where the `"database"` property was. It should have the value `"@dadi/api-mongodb"`:


    ```json
    {
      "server": {
        "host": "127.0.0.1",
        "port": 8000
      },
      "datastore": "@dadi/api-mongodb",
      "caching": {
        
      }
    }
    ```

4. Your API configuration files should have an `"auth"` containing a `"database"` block. Change this to simply the name of the database you want to use for authentication, and add a `"datastore"` property with the value `"@dadi/api-mongodb"`.

    *Before (`config.development.json`)*
    
    ```json
    {
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
          "username": "",
          "password": "",
          "database": "dadiapiauth"
        }
      }
    }
    ```
    *After (`config.development.json`)*
    ```json
    {
      "auth": {
        "tokenUrl": "/token",
        "tokenTtl": 1800,
        "clientCollection": "clientStore",
        "tokenCollection": "tokenStore",
        "datastore": "@dadi/api-mongodb",
        "database": "dadiapiauth"
      },
    }
    ```

5. If your chosen authentication database (e.g. `"dadiapiauth"`) has different hosts to the default you must  ensure an entry exists for it in the `"databases"` block in `mongodb.development.json`:

    *`mongodb.development.json`*
    ```json
    {
      "databases": {
        "dadiapiauth": {
          "hosts": [
            {
              "host": "222.333.44.5",
              "port": 27017
            }
          ]
        }
      }  
    }
    ```

#### What's next?

While the above configuration changes should be enough to get the application started, there are several more changes you should know about. They can be found in detail in the release notes for [API Vesion 3.0](https://github.com/dadi/api/releases/tag/v3.0.0).

