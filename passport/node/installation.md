---
title: Node.js - Installation
---

## Node.js

### Installation

1. Install with [npm](https://www.npmjs.com/:

	```
	npm install
	```

2. Include with `require`:
	
	```js
	var passport = require('@dadi/passport')({
		uri: 'http://my-api.dadi.tech',
		credentials: {
			clientId: 'johndoe',
			secret: 'f00b4r'		
		},
		wallet: 'file',
		walletOptions: {
			path: './token.txt'
		}
	});

	passport.then(function (bearerToken) {
	    // Authorised request goes here...
	});
	```

For more examples, see [usageExamples.md](Usage examples).