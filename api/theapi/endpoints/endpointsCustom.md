---
title: Custom endpoints
layout: default
---

# Custom Endpoints

## Overview

 * [Endpoint specification](#endpoint-specification)

### Endpoint Specification

DADI API custom endpoints give you the ability to modify, enrich, massage your data before it is returned to the user making the request. Collection endpoints return raw data in response to requests, custom endpoints give you more control over what you return.

Endpoint specifications are simply Javascript files stored in your application's `/workspace/endpoints` folder. It is important to understand how the folder hierarchy in the endpoints folder affects the behaviour of your API.


```
my-api/
  workspace/
    collections/                    # MongoDB collection specifications
      1.0/                          # API version label
    endpoints/                      # Custom Javascript endpoints
      1.0/                          # API version label

```

#### API Version

[TODO]

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
  };

  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;
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
  };

  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;
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
  };

  res.setHeader('content-type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(data))
}
```

#### Custom Endpoint Routing

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

### Authentication

Authentication can be bypassed for your custom endpoint by adding the following to your endpoint file:

```js
module.exports.model = {}
module.exports.model.settings = { authenticate : false }
```


### Endpoint GET request

This will return a "Hello World" example -

```
GET /v1/test-endpoint HTTP/1.1
Host: api.example.com
content-type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

### Endpoint GET response

```
{ message: 'Hello World' }
```
