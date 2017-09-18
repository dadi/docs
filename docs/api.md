---
title: API
---

## Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

* **[MongoDB](https://docs.mongodb.com/v3.0/)** (supported versions: 2.6 - 3.2)
* **[Node.js](https://www.nodejs.org/)** (current LTS version)

## Creating an API

The easiest way to install API is using DADI CLI. CLI is a command line application that can be used to create and maintain installations of DADI products. Follow the simple instructions below, or see [more detailed documentation for DADI CLI](#cli).

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

## First use


## Configuration

xxxx

### Choosing a Data Store

xxx

## Authentication

DADI API provides a full-featured authentication layer based on the [Client Credentials flow of oAuth 2.0](http://oauthbible.com/#oauth-2-two-legged). By default all requests to collection endpoints in API require a user to have first been authenticated. Read the following to learn what's involved in authenticating against your DADI API.

### Client Store
At the heart of API's authentication mechanism is an internal "client store" collection. The default name for this collection is `clientStore` but this can be modified using the configuration property [`auth.clientCollectionName`](#x).

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
> dhdhdhd .. Viktor how do you generate passwords for clients for WC?
> -- advice

Once you have client records in the database, you can request an access token for to continue communicating with the API. See [Obtaining an Access Token](#obtaining-an-access-token). 

### Adding Clients

If you've installed [DADI CLI](#cli) you can use that to create a new client in the database. See instructions for [Adding Clients with CLI](#x).

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

Each [collection specification](#x) contains a "settings" block which modifies certain aspects of the collection. The [`settings.authenticate`](#x) property can be used in the following ways.

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

See [more information about collection specifications and their configuration](#x).

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
content-type: application/json
content-length: 18
Date: Sun, 17 Sep 2017 17:44:48 GMT
Connection: close
```

#### Invalid or Expired Token

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer, error="invalid_token", error_description="Invalid or expired access token"
content-type: application/json
content-length: 18
Date: Sun, 17 Sep 2017 17:46:28 GMT
Connection: close
```


## Authorisation and permissions

The Client Record allows anyone with those credentials to request an access token and use the API. For further control over access to endpoints in API, it is possible to extend the Client Record and configure collections to only require authentication for certain HTTP methods.

### Access Control

DADI API allows controlling access to endpoints by extending the client record with a `permissions` block.

> There is currently no interface or script available to add permissions to a client record, so this must be done in the database directly.
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

It is also possible to restrict access to versions of your API (see [API Versioning](#api-versioning) for more information). Add an `apiVersion` property to the collection or endpoint permission:

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
> -- warning

### Authorisation Errors

#### Access Not Allowed

If the client record has permissions set and an attempt is made to request an endpoint that hasn't been added to the permissions block, API responds with HTTP 401 Unauthorized. The `WWW-Authenticate` header indicates that there was an issue requesting the specified endpoint.  

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="/1.0/library/books"
content-type: application/json
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

Collections are the storage containers for your data within DADI API. API can handle the creation and modification of database collections/tables within the underlying database.

All that is required in order to create a new database collection and it's associated collection endpoint is a collection specification file. Of course, API can also connect to existing

### Collection specification

Collection specifications are simply JSON files stored in your application's `/workspace/collections` folder.

##### API Version

Specific versions of your API are represented by "version" folders within the collections folder.
[MORE]

##### Database

Collection documents may be stored in separate databases, represented by the name of the folder within the "version" folder.

> **Note** This feature is disabled by default. To enable separate databases in your API the configuration setting `database.enableCollectionDatabases` must be `true`. See [Collection-specific Databases](../../setup/configuration#collection-specific-databases) for more information.

##### Collection

Collection specifications exist as JSON files containing at least one field specification and a configuration block.

The naming convention for collection specifications is `collection.<collection name>.json` where `<collection name>` is used as the name of the collection in the underlying database.

> **Use the plural form**
>
> We recommend you use the plural form for all collection endpoints to keep consistency across your API. Using the singular form means a GET request for a list of results can easily be confused with a request for a single entity.
>
> For example, a collection named `book (collection.book.json)` will accept GET requests at the following endpoints:
>
> ```
http://api.example.com/1.0/library/book
http://api.example.com/1.0/library/book/560a44b33a4d7de29f168ce4
```
>
> Is the first one going to return all books, as intended? It's not obvious. Instead, using the plural form makes it clear what the endpoint's intended behaviour is:
>
> ```
http://api.example.com/1.0/library/books
http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4
```
> -- advice

##### Collection Endpoint

With the above folder and file hierarchy a collection's endpoint within the API uses the following format:


`http://api.example.com/{version}/{database}/{collection name}`

In actual use this might look like the following:

`http://api.example.com/1.0/library/books`

##### The JSON File

Collection specification files are simply JSON files that take the below format. They can be created and edited in any text editor, then added to the API's `collections` directory. API will load new and changed collections the next time it starts.

The JSON file must contain a `fields` property and a `settings` property. `fields` must contain at least one field for the collection specification to be valid. Each field is added as a property of the `fields` object. See [Collection Fields](#collection-fields) (below) for details regarding the format of field objects.

There are a number of properties required for the `settings` object before the collection specification is considered valid - see [Collection Settings](#collection-settings) for details.

**A skeleton collection specification**

```json
{
  "fields": {
    "field1": {

    },
    "field2": {

    }
  },
  "settings": {

  }
}
```


### Collection Fields

Each field is defined in the following way:

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
| type | The type of the field. Possible values `"String"`, `"Number"`, `"Boolean"`, `"Mixed"`, `"Object"`, `"ObjectID"`, `"Reference"`  |  N/A  | `"String"` | Yes
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

#### Field Types

| Type | Description | Example 
|:--|:--|:--
| String | The most basic field type, used for text data | `"The quick brown fox"` 
| Number | Accepts numeric data types including whole integers and floats | `5`, `5.01` 
| Boolean | Accepts only two possible values: `true` or `false` | `true` 
| Mixed | z | z
| Object | Accepts single JSON documents or an array | z
| ObjectID | z | z
| Reference | Used for linking documents in the same collection or a different collection. Solves the problem of storing subdocuments in documents. See [Document Composition (reference fields)](#document-composition) for further information. | the ID of another document: `"560a5baf320039f7d6a78d3b"` 


### Collection Settings

Default values for the collection endpoint are set the following way:

```json
{
  "settings": {
    "cache": true,
    "authenticate": true,
    "count": 40,
    "sort": "title",
    "sortOrder": 1,
    "callback": null,
    "defaultFilters": null,
    "fieldLimiters": null,
    "storeRevisions": false,
    "revisionCollection": null,
    "index": []
  }
}
```

 Property       | Description        |   Example
:--|:--|:--
cache | If true, caching is enabled for this collection. The global config must also have `cache: true` for caching to be enabled | `true`
authenticate | Specifies whether requests to the endpoint for this collection require authentication  | `true`
count | The number of results to return when querying the collection | `40`
sort | The default field to sort results by | `"title"`
sortOrder | The sort direction to sort results by | `1` = ascending, `-1` = descending
callback |  |
defaultFilters | Specifies a default query for the collection. A `filter` parameter passed in a query will extend the default filters.  | `{ "published": true }`
fieldLimiters | Specifies a default list of fields for inclusion/exclusion. Fields can be included or excluded, but not both. See [Returning Data](XXX) for more detail. | `{ "title": 1, "author": 1 }`, `{ "dob": 0, "state": 0 }`
index | Specifies a set of indexes that should be created for the collection. See [Creating Database Indexes](#creating-database-indexes) for more detail.  | `{ "keys": { "username": 1 }, "options": { "unique": true } }`

> It is possible to override some of these values when requesting data from the endpoint, by using querystring parameters. See [Querying a collection](./querying) for detailed documentation.

### Restricting access to collections

### Creating a collection

### Editing a collection

### Data types

## Working with data

### Inserting data

#### Using REST API

#### Using a Model directly

```js
// require the Model component from API
const Model = require('@dadi/api').Model

// get a reference to the "books" collection via the Model
const books = Model('books')

// call a method on the collection, for e.g. find(), insert(), update()
books.find({ title: 'Harry Potter 2' }, { compose: true }, (err, result) => {
  // do something with result
})
```

### Updating data

#### Using REST API

#### Using a Model directly

### Retrieving data

#### Using REST API

#### Using a Model directly

#### Filtering

#### Pagination

### Validation

Documents sent to the API with POST and PUT requests are validated at field level based on rules defined in the collection schema. 

* [Validation Options](#validation-options)
* [Validation Response](#validation-response)
* [Error Messages](#error-messages)

#### Validation Options

* [Type Validation](#type-validation)
* [Mandatory Field Validation](#mandatory-field-validation)
* [Length Validation](#length-validation)
* [Regular Expression Validation](#regular-expression-validation)

##### Type Validation

A field can be validated by type. DADI API will check that the value supplied for the field is the correct type as specified in the schema. Only the following JavaScript primitives are considered for type validation: `String`, `Number`, `Boolean`

```
"fields": {
  "title": {
    "type": "String",
    "message": "must be a string"
  }
}
```

##### Mandatory Field Validation

Fields can be made mandatory by setting their `required` property to `true`. DADI API will check that a value has been supplied for the field when creating new documents. Validation for update requests is more relaxed and mandatory fields aren't validated as they would have already been populated with data when the document was first created.

```
"fields": {
  "title": {
    "type": "String",
    "required": true
  }
}
```

##### Length Validation

A field's length can be controlled by using the `minLength` and `maxLength` properties. Validation will fail if the length of the string is greater or less than the specified length limits.

```
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

##### Regular Expression Validation

A regular expression pattern can be specified for a field, which may help enforcing business rules.

```
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

If a document fails validation an errors collection will be returned with the reasons for validation failure:

```
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

It is possible to supply a custom error message by specifying a `message` property in a field specification.

For example:

```
"title": {
  "type": "String",
  "label": "Title",
  "comments": "The title of the book",
  "example": "The Autobiography of Benjamin Franklin",
  "required": true,
  "message": "must contain a value"
}
```

## Creating Database Indexes

Indexes provide high performance read operations for frequently used queries and are fundamental in ensuring performance under load and at scale.

Database indexes can be automatically created for a collection by specifying the fields to be indexed in the `settings` object.
An index will be created on the collection using the fields specified in the `index.keys` setting. A value of `keys: { fieldName: 1 }` will create an index for field `fieldName` using an ascending order. `keys: { fieldName: -1 }` will create an index for field `fieldName` using a descending order. Specifying multiple fields will create a compound index.

The index will be created in the background to avoid blocking other database operations.

**settings.index**

```json
"settings": {
  "cache": true,
  "index": {
    "enabled": true,
    "keys": {
      "field1": 1,
      "field2": -1
    }
  }
}
```

## Document Revision History

**settings.storeRevisions**

If `settings.storeRevisions` is **true**:

* a `revision collection` will automatically be generated in the database when the first document for the collection is created
* a `revision document` will be stored in the `revision collection` when a new document is created
* a `revision document` will be stored for each subsequent update to an existing document  
* each time a `revision document` is created, the `_id` of the `revision document` is pushed onto a `history` array of the original document

**settings.revisionCollection**

If `settings.revisionCollection` is specified, the collection's `revision collection` will be named according to the specified value, otherwise the collection's `revision collection` will take the form `{collection name}History`.

For example:

`db.books.find()`

Main document stored in the collection, with revisions referenced in the history array:

```json
{
  "_id": ObjectId("548efd7687fd8b50f3dca6e5"),
  "title": "War and Peace",
  "history": [
    ObjectId("548efd7687fd8b50f3dca6e6"),
    ObjectId("548efd7687fd8b50f3dca6e7")
  ]
}
```

`db.booksHistory.find()`

Two revision documents stored in the revision collection, one created at
the same time as the original document was created, the second created after an
update operation to change the value of `title`:

```json
{
  "_id": ObjectId("548efd7687fd8b50f3dca6e6"),
  "title": "Draft"
}

{
  "_id": ObjectId("548efd7687fd8b50f3dca6e7"),
  "title": "War and Peace",
  "history": [
    ObjectId("548efd7687fd8b50f3dca6e6")
  ]
}
```

> **Note:** DADI API does not add or update any date/time fields to indicate the order in which revision documents were created, nor does it perform any sort operations when returning a document's revision history. It is up to the API consumer to include appropriate date/time fields and perform sort operations on the returned revision collection.

## Document Composition

To reduce data duplication through document embedding, DADI API allows the use of "Reference" fields which can best be described as pointers to other documents. The referenced document could be in the same collection, another collection in the same database or a collection in a different database.

**Reference Field Settings**

 Property       | Description        |   Example
:----------------|:-------------------|:-------
database | The name of the database that holds the reference data. Can be omitted if the field references data in the same **database** as the referring document. | `"title"`
collection | The name of the collection that holds the reference data. Can be omitted if the field references data in the same **collection** as the referring document. | `"title"`
fields    | An array of fields to return for each referenced document.   | `["firstName", "lastName"]`

### Example

Consider the following two collections, `books` and `people`. `books` contains a Reference field `author` which is capable of loading documents from the `people` collection. By creating a `book` document and setting the `author` field to the `_id` value of a document from the `people` collection, the application is able to resolve this reference and return the `author` document within a result set for a `books` query.

**Books `(collection.books.json)`**

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
        "collection": "people",
        "fields": ["firstName", "lastName"]
      }
    },
    "booksInSeries": {
      "type": "Reference"
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

**People `(collection.people.json)`**

```json
{
  "fields": {
    "name": {
      "type": "String",
      "required": true
    },
    "occupation":	{
      "type": "String",
      "required": false
    },
    "nationality": {
      "type": "String",
      "required": false
    },
    "education": {
      "type": "String",
      "required": false
    },
    "spouse": {
      "type": "Reference"
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "sort": "name",
    "sortOrder": 1
  }
}
```


### Composed

An additional `composed` property is added to the `book` document when it is returned, indicating which fields have been expanded. The property contains the original `_id` value used for the reference field lookup.  

#### Enabling Composition

> N.B. Composition is disabled by default.

To return a document with resolved Reference fields at the top level, you may send a parameter either in the querystring of your request or provide it as an option to the collection's `find()` method:

```
GET /1.0/library/books?filter={"_id":"560a5baf320039f7d6a78d3b"}&compose=true
```

```js
const books = model('books')

books.find({ title: 'Harry Potter 2' }, { compose: true }, (err, result) => {
  // do something with result
})
```

This setting will allow the first level of Reference fields to be resolved. To allow Reference fields to resolve which are nested further within the document, add a `compose` property to the collection specification's settings block:

```json
{
  "fields": {
  },
  "settings": {
    "compose": true
  }
}
```


**a `book` document**

```json
[
  {
    "_id": "daf35614-918f-11e5-8994-feff819cdc9f",
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "7602d576-9190-11e5-8994-feff819cdc9f",
    "booksInSeries": [
      "daf35998-918f-11e5-8994-feff819cdc9f",
      "daf35b82-918f-11e5-8994-feff819cdc9f",
      "daf35f88-918f-11e5-8994-feff819cdc9f",
      "daf36172-918f-11e5-8994-feff819cdc9f",
      "daf363c0-918f-11e5-8994-feff819cdc9f",
      "daf3658c-918f-11e5-8994-feff819cdc9f"
    ]
  }
]
```

**A `people` document**

```json
[
  {
    "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
    "name": "J. K. Rowling",
    "occupation": "Novelist",
    "nationality": "British",
    "education": "Bachelor of Arts",
    "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
  },
  {
    "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
    "name": "Neil Murray"
  }
]
```


**Query result: The result of a query for the above `book` document**

```json
{
  "_id": "daf35614-918f-11e5-8994-feff819cdc9f",
  "title": "Harry Potter and the Philosopher's Stone",
  "author": {
    "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
    "name": "J. K. Rowling",
    "occupation": "Novelist",
    "nationality": "British",
    "education": "Bachelor of Arts",
    "spouse": {
      "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
      "name": "Neil Murray"
    },
    "composed": {
      "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
    }
  },
  "booksInSeries": [
    {
      "_id": "daf35998-918f-11e5-8994-feff819cdc9f",
      "title": "Harry Potter and the Chamber of Secrets",
      "author": {
        "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
        "name": "J. K. Rowling",
        "occupation": "Novelist",
        "nationality": "British",
        "education": "Bachelor of Arts",
        "spouse": {
          "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
          "name": "Neil Murray"
        },
        "composed": {
          "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
        }
      }
    }
  ],
  "composed": {
    "author": "7602d576-9190-11e5-8994-feff819cdc9f",
    "booksInSeries": [
      "daf35998-918f-11e5-8994-feff819cdc9f"
    ]
  }
}
```


## Collection Statistics

Collection statistics from MongoDB can be retrieved by sending a GET request to a collection's `/stats` endpoint.

An example request:

```http
GET /1.0/library/books/stats HTTP/1.1
Host: api.example.com
Content-Type: application/json
Cache-Control: no-cache
```

An example response:

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

## Available Collections

A document containing information about the available collections can be retrieved by sending a GET request to the API's `/api/collections` endpoint.

**Example request**

```http
GET /api/collections HTTP/1.1
Host: api.example.com
Content-Type: application/json
Cache-Control: no-cache
```

**Example response**

```json
{
  "collections": [
    {
      "version": "1.0",
      "database": "library",
      "name": "books",
      "slug": "books",
      "path": "/1.0/library/books"
    },
    {
      "version": "1.0",
      "database": "library",
      "name": "user",
      "slug": "user",
      "path": "/1.0/library/users"
    },
    {
      "version": "1.0",
      "database": "library",
      "name": "author",
      "slug": "author",
      "path": "/1.0/library/authors"
    }
  ]
}
```

## Adding application logic

While

### Endpoints

DADI API custom endpoints give you the ability to modify, enrich and massage your data before it is returned to the user making the request. Collection endpoints return raw data in response to requests, custom endpoints give you more control over what you return.

#### Endpoint Specification

Endpoint specifications are simply Javascript files stored in your application's `/workspace/endpoints` folder. It is important to understand how the folder hierarchy in the endpoints folder affects the behaviour of your API.


```
my-api/
  workspace/
    collections/                    # MongoDB collection specifications
      1.0/                          # API version label
    endpoints/                      # Custom Javascript endpoints
      1.0/                          # API version label

```

#### Endpoint

Endpoint specifications exist as Javascript files within a `version` folder as mentioned above. The naming convention for the collection specifications is `endpoint.<endpoint name>.js`

#### Endpoint URL

With the above folder and file hierarchy an endpoint's URL uses the following format:

`http://api.example.com/{version}/{endpoint name}`

In actual use this might look like the following:

`http://api.example.com/1.0/booksByAuthor`

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

1. `request` is an instance of Node's [http.IncomingMessage](http://nodejs.org/api/http.html#http_http_incomingmessage)
2. `response` is an instance of Node's [http.ServerResponse](http://nodejs.org/api/http.html#http_class_http_serverresponse)
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

**Example, HTTP 500 response**

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
http://api.example.com/1.0/books/55bb8f688d76f74b1303a137
```

Without this custom route, the same could be achieved by requesting the default route with a querystring parameter.

```
http://api.example.com/1.0/books?id=55bb8f688d76f74b1303a137
```

#### Authentication

Authentication can be bypassed for your custom endpoint by adding the following to your endpoint file:

```js
module.exports.model = {}
module.exports.model.settings = { authenticate : false }
```


#### Endpoint GET request

This will return a "Hello World" example -

```
GET /v1/test-endpoint HTTP/1.1
Host: api.example.com
content-type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

#### Endpoint GET response

```json
{ "message": "Hello World" }
```

### Hooks

Hooks perform operations on data before/after GET, UPDATE and DELETE requests. In essence, a hook is simply a function that intercepts a document/query before it's executed, having the option to modify it before returning it back to the model.

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

#### Anatomy of a hook

- one
* two
+ three

A hook always receives 3 arguments:

1. `obj`: The main object, which the hook is able to modify. It must always return it back. It can be a document (on `create`) or a query (on `update` or `delete`);
2. `type`: The type of hook. Can be `0` (`create`), `1` (`update`) or `2` (`delete`);
3. `data`: Object that passed additional data, such as the `options` object that may be declared with the hook, or other objects depending on the type of hook (e.g. `updatedDocs` will be passed if it's a `update` hook).

A simple hook can be defined as following:

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

In this example we implement a hook that populates a field (`slug`) with a URL-friendly version of another field (`title`). The hook is created in such a way that the properties it reads from and writes to are dynamic, passed through as `from` and `to` inside `options`. The `slugify` hook could then be written as follows:

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

#### Use cases

- Creating variations of a field, such as creating a slug (example above);
- Validating fields with complex conditions, when a regular expression might not be enough;
- Converting different types of data to a unique format, such as Unixon timestamp;
- Triggering an action, notification or external command when a record is modified


#### Before and After Hooks

*Before* hooks are always fired, whereas *after* hooks only fire after and if an operation is successful.

#### Overview

The following data is passed to each type of hook:

- `beforeCreate`:
   - `obj`: Fields sent in the request
   - `data`:
      - `options`: Hook options
- `afterCreate`:
   - `obj`: Document created in the database
   - `data`:
      - `options`: Hook options
- `beforeUpdate`:
   - `obj`: Update query sent in the request
   - `data`:
      - `options`: Hook options
      - `updatedDocs`: Documents affected by the update
- `afterUpdate`:
   - `obj`: Updated documents
   - `data`:
      - `options`: Hook options
- `beforeDelete`:
   - `obj`: Delete query sent in the request
   - `data`:
      - `options`: Hook options
- `afterDelete`:
   - `obj`: Delete query sent in the request
   - `data`:
      - `options`: Hook options

#### Testing

The following hook may be useful to get a better idea of when exactly each hook type is fired and what data it receives, as it logs to the console its internals every time it gets called:

*workspace/hooks/showInfo.js*

```js
module.exports = function (obj, type, data) {
  console.log('')
  console.log('**** HOOK ***')
  console.log('Type:', type)
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
### Configuration
### Cache flush
### All Collections

## Data connectors reference

### MongoDB Connector

The MongoDB connector allows you to use MongoDB as the backend for API.


Help improve the package at https://github.com/dadi/api-mongodb.


#### Installing

```console
$ npm install --save @dadi/api-mongodb
```

#### Configuring

#### Using MongoLab

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


### Connecting to API

### Data connectors

### Auto generate documentation
