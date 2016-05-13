# DADI Passport

## Node.js

### Usage examples

Passport will return different things based on the arity of its require call. If there is only one argument, the return value will be a Promise containing a string with a bearer token.

```js
var passport = require('@dadi/passport');

passport({
	issuer: {
        uri: 'http://my-api.dadi.tech',
        port: 80,          // Optional. Defaults to 80
        endpoint: '/token' // Optional. Defaults to '/token'
    },
	credentials: {
		clientId: 'johndoe',
		secret: 'f00b4r'		
	},
	wallet: 'file',
	walletOptions: {
		path: './token.txt'
	}
}).then(function (bearerToken) {
    // Authorised request goes here...
});
```

If a function is passed as a second argument, Passport will interpret it as a module capable of performing a request (such as [request](https://www.npmjs.com/package/request) or [request-promise](https://www.npmjs.com/package/request)) and will inject the bearer token in the authorisation header, returning a Promise containing the patched request agent.

*Using request injection option:*

```js
var request = require('request-promise');
var passport = require('@dadi/passport');

passport({
    issuer: {
        uri: 'http://my-api.dadi.tech',
        port: 80,
        endpoint: '/token'
    },
    credentials: {
        clientId: 'johndoe',
        secret: 'f00b4r'
    },
    wallet: 'file',
    walletOptions: {
        path: './token.txt'
    }
}, request).then(function (request) {
    request('http://my-api.dadi.tech/v1/some/endpoint').then(function (response) {
        // Do something
    });
});
```
