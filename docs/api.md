---
title: API
---

## Installation

### Requirements

* **[MongoDB](https://docs.mongodb.com/v3.0/)** (supported versions: 2.6 - 3.2)
* **[Node.js](https://www.nodejs.org/)** (supported versions: 4.8.4, 5.12.0, 6.11.x)

### DADI CLI

__Coming soon__

### NPM

All DADI platform microservices are available from [NPM](https://www.npmjs.com/). To add *API* to your project as a dependency:

```console
$ cd my-app
$ npm install --save @dadi/api
```

#### Add an entry point

You'll need an entry point for your project. We'll create a file called `index.js` and later we will start the application with `node index.js`. Add the following to the new file:

```js
var app = require('@dadi/api')

app.start(function() {
  console.log('API Started')
})
```

## Creating an API application

## Application Anatomy

## Command line tools

## Getting started

### First use

### Connecting to API

### Data connectors

### Auto generate documentation

## Managing users

## Authentication, authorisation and permissions

### Adding client accounts

### Obtaining a token

Every request to the API requires a Bearer token which should be passed as a header.

Obtain a token by sending a POST request to the `/token` endpoint and passing your client credentials in the body of the request:

#### Example Request using curl

```
curl -X POST -H "Content-Type: application/json" --data "{\"clientId\":\"testClient\",\"secret\":\"superSecret\"}" "http://api.example.com/token"
```

#### Example request using Node.JS

```js
var http = require('http')

var options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'POST',
  path: '/token',
  headers: {
    'content-type': 'application/json'
  }
}

var credentials = JSON.stringify({
  clientId: 'your-client-id',
  secret: 'your-secret'
})

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.write(credentials)
req.end()
```

#### Response

```js
{
  "accessToken": "4172bbf1-0890-41c7-b0db-477095a288b6",
  "tokenType": "Bearer",
  "expiresIn": 1800
}
```

Once you have the token, each request to the API should include an `Authorization` header containing the token:

#### Example Request using curl

```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://api.example.com/api/collections"
```

#### Example request using Node.JS

```js
var http = require('http')

var options = {
  hostname: 'api.example.com',
  port: 80,
  method: 'GET',
  path: '/api/collections',
  headers: {
    'authorization': 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
    'content-type': 'application/json'
  }
}

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.end()
```

### Obtaining an admin token

### Restricting access to collections

## Defining collections

### Collection schema

Collections are the storage containers for your data within API. DADI API handles creation and modification of database collections within the database. All that is required in order to create a new database collection and it's associated collection endpoint is a collection specification file.

Collection specifications are simply JSON files stored in your application's `/workspace/collections` folder.

##### API Version

Specific versions of your API are represented by "version" folders within the collections folder.
[MORE]

##### Database

Collection documents may be stored in separate databases, represented by the name of the folder within the "version" folder.

> **Note** This feature is disabled by default. To enable separate databases in your API the configuration setting `database.enableCollectionDatabases` must be `true`. See [Collection-specific Databases](../../setup/configuration#collection-specific-databases) for more information.


##### Collection

Collection specifications exist as JSON files containing any number of field specifications and a configuration block. The naming convention for the collection specifications is `collection.<collection name>.json` where `<collection name>` is used as the name of the collection in MongoDB.

#### Use the Plural Form

We recommend you use the plural form for all collection endpoints to keep consistency across your API. Using the singular form means a GET request for a list of results can easily be confused with a request for a single entity.

For example, a collection named `book (collection.book.json)` will accept GET requests at the following endpoints:

```
http://api.example.com/1.0/library/book
http://api.example.com/1.0/library/book/560a44b33a4d7de29f168ce4
```

Is the first one going to return all books, as intended? It's not obvious. Instead, using the plural form makes it clear what the endpoint's intended behaviour is:

```
http://api.example.com/1.0/library/books
http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4
```


##### Collection Endpoint

With the above folder and file hierarchy a collection's endpoint within the API uses the following format:


`http://api.example.com/{version}/{database}/{collection name}`

In actual use this might look like the following:

`http://api.example.com/1.0/library/books`

##### The JSON File

Collection specification files take the following format:

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


### Fields

### Creating a collection

### Editing a collection

### Data types

## Working with data

### Inserting data

#### Using REST API

#### Using a Model directly

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
:----------------|:-------------------
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

## Adding application logic

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

  var data = {
    results: [
      {
        title: "Book One",
        author: "Benjamin Franklin"
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

  var data = {
    results: [
      {
        title: "Book One",
        author: "Benjamin Franklin"
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

  var data = {
    results: [
      {
        title: "Book One",
        author: "Benjamin Franklin"
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
  return { "route": "/1.0/books/:id([a-fA-F0-9]{24})?" }
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
    "create": [
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

## Data connectors reference

### MongoDB Connector

#### Installing

#### Configuring

#### Using MongoLab

### CouchDB

### JSON File

### Building a connector

## How-to guides



