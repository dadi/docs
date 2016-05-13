# DADI Web

## Sessions

### Overview

DADI Web uses the [express-session](https://github.com/expressjs/session) library to handle sessions. Visit that project's homepage for more detailed information regarding session configuration.

 * [Configuration](#configuration)
 * [Configuration Properties](#configuration-properties)
 * [Using the session](#using-the-session)

#### Configuration

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

#### Configuration Properties

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


#### Using the session

Session data can easily be accessed from an [event](https://github.com/dadi/web/blob/docs/docs/events.md) or custom [middleware](https://github.com/dadi/web/blob/docs/docs/middleware.md).

```js
var Event = function (req, res, data, callback) {

 if (req.session) {
   req.session.someProperty = "some value";
   req.session.save(function (err) {
     // session saved
   })

   data.session_id = req.session.id;
 }

 callback(null, data);
}
```
