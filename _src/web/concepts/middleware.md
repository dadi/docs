---
title: Middleware
excerpt: Add functionality to the request-response cycle
order: 2
---

Middleware functions are functions that can be added to your Web application and
executed in sequence for each request. Each function has access to the request object (`req`),
the response object (`res`), and the next middleware function in the stack (by convention, a variable named `next`).

Middleware functions can:

* execute any code
* modify the request and response objects
* end the request-response cycle (by calling `res.end()`)
* call the next middleware function in the stack (by calling `next()`)

> Note: if the currently executing middleware function does not end the request-response cycle,
it _must_ call `next()` to pass control to the next middleware function. Failure to do so
will cause the request to hang.

Middleware functions are stored as JavaScript files in your application's `middleware` folder. The location of this folder is [configurable](/web/getting-started/configuration/), but defaults to `workspace/middleware`.

```bash
your-project/
  config/
  workspace/
    datasources/      # datasource specifications
    events/           # event files
    middleware/       # middleware files
      log.js          # middleware file
    pages/            # page specifications
```

A DADI Web application can use the following types of middleware:

* Application-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

## Application-level middleware

A single middleware file may contain multiple functions, or they can be split across multiple files.

You bind application-level middleware functions to the instance of the `app` object by using the `app.use()` function, optionally specifying a route that determines the requests it applies to. A middleware function with no route will be executed on every request.

### Route-less middleware functions

The following example shows a middleware function with no route. The function is executed every time the application receives a request:

```js
var Middleware = function (app) {
  // output the time for each request
  app.use((req, res, next) => {
    console.log('Request received at:', Date.now())
    next()
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
```

### Route-specific middleware functions

The following example shows a middleware function mounted at the `/users` route. The function is only executed for requests to the `/users` route.

```js
var Middleware = function (app) {
  // output the time for each request
  app.use('/users', (req, res, next) => {
    console.log('Request received at:', Date.now())
    next()
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
```

### HTTP method restriction

To restrict a middleware function to only certain HTTP methods, you can test the current request's method and call `next()` if it doesn't match:

```js
app.use('/users', (req, res, next) => {
  if (req.method !== 'GET') {
    return next()
  }

  console.log('GET request received at:', Date.now())
  next()
})
```

## Error-handling middleware

Error-handling middleware functions must accept four arguments. Without the additional argument the function will be interpreted as regular middleware and won't handle errors.

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.end(500, 'Server error!')
})
```

## Built-in middleware

DADI Web already includes some built-in middleware functions, which, in some cases, can be turned on or off using the main configuration file. See details in the [configuration section](/web/getting-started/configuration/).

### Built-in middleware
| Type | Description
|: --- | :---
| Body parser | parses the body of an incoming request and makes the data available as the property `req.body`
| Caching | determines if the current request can be handled by a previously cached response
| GZip Compression | compresses the response before sending
| Request logging | logs every request to a file
| Sessions | handles sessions
| Static files | serves static assets from the public folder, such as JavaScript, CSS, HTML files, images, etc
| Virtual directories | serves content from configured directories not handled by the existing page/route specifications

> Note: the body parser middleware can handle JSON, raw, plain text and URL-encoded request bodies. It does not handle multipart bodies due to their complex and typically large nature. For multipart bodies, try one of the following modules: [busboy](https://www.npmjs.org/package/busboy), [multiparty](https://www.npmjs.org/package/multiparty), [formidable](https://www.npmjs.org/package/formidable) or [multer](https://www.npmjs.org/package/multer)

## Third-party middleware

You can add third-party middleware to your DADI Web application to add new functionality that DADI Web doesn't include.

Simply install the Node.js module for the required functionality and load it in an application-level middleware function.

The following example shows how to use the module [online](https://www.npmjs.com/package/online) to track online user activity using Redis:

```bash
$ npm install online --save
```

```js
var Online = require('online')
var redis = require('redis')
var redisClient = redis.createClient()

// use the redis client
var online = Online(redisClient)

var Middleware = function (app) {
  // executes for every request
  app.use((req, res, next) => {
    // add a call to track current user's activity,
    // assuming a `user` object
    online.add(user.id, (err) => {
      if (err) {
        return next(err) // call an error-handling middleware function
      }

      next() // calls the next middleware function (defined below)
    })
  })

  // executes for every request
  app.use((req, res, next) => {
    // get users active in the last 10 minutes
    online.last(10, (err, ids) => {
      if (err) {
        return next(err) // call an error-handling middleware function
      }

      console.log('Users online:', ids)

      // call next middleware function
      next()
    })
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
```

## Middleware template

```js
/**
 * workspace/middleware/example.js
 */
var Middleware = function (app) {
  // execute for every request
  app.use((req, res, next) => {
    console.log(req.url)
    console.log(req.params)
    next()
  })

  // route-mounted, execute for requests to /channel
  app.use('/channel', (req, res, next) => {
    console.log('Channel params:', JSON.stringify(req.params))
    next()
  })

  // error handler
  app.use((err, req, res, next) => {
    console.log('Error:', err)
    next()
  })
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
```