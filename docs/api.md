---
title: API
---

## Installation

### Requirements

* **[MongoDB](https://docs.mongodb.com/v3.0/)** (supported versions: 2.6 - 3.0)
* **[Node.js](https://www.nodejs.org/)** (supported versions: 4.7.0, 5.12.0, 6.x.x)

### DADI CLI

__Coming soon__

### NPM

All DADI platform microservices are available from [NPM](https://www.npmjs.com/). To add *API* to your project as a dependency:

```bash
$ cd my-app
$ npm install --save @dadi/api
```

#### Add an entry point

You'll need an entry point for your project. We'll create a file called `index.js` and later we will start the application with `node index.js`. Add the following to the new file:

```js
/**
 *  index.js
 */
var app = require('@dadi/api')

app.start(function() {
  console.log('API Started')
})
```

### Configuration

API starts with some sensible defaults, so it's not necessary to understand all the configuration options available when first running the application. Full configuration documentation can be found at http://docs.dadi.tech/api/getting-started/configuration/.

Configuration is handled using JSON files specific to the application environment. For example in the production environment a file named `config.production.json` will be used. Configuration files must be placed in a `config` folder in your application root, for example `config/config.production.json`. The default start up environment is `development`, using the configuration file at `config/config.development.json`.

The bare minimum required for running the API is a `server` block. With only a `server` block, default values are used for all other properties.

**Sample configuration**

```json
{
  "server": {
    "host": "127.0.0.1",
    "port": 3000
  }
}
```

### Start the server

API can be started from the command line simply by issuing the following command:

```bash
$ node index.js
```

#### Test the connection

With the default configuration, our API server is available at http://localhost:3000. If you've modified the configuration file's `server` block, your API will be available at the address and port you've chosen. Use cURL to check the server is running, if the connection can be made you will receive the following "Unauthorised" message.

```bash
$ curl http://localhost:3000
```

```json
{ "statusCode": 401 }
```


#### Check the response headers

```bash
$ curl -I http://localhost:3000
```
```json
HTTP/1.1 401 Unauthorized
content-type: application/json
content-length: 18
Date: Thu, 20 Apr 2017 23:42:25 GMT
Connection: keep-alive
```

### Authentication

The HTTP 401 response received in the previous step shows that the server is running. To start using the REST endpoints you'll need a user account so you can obtain access tokens for interacting with the API.

User accounts provide an authentication layer for API. Each user account has a *__clientId__* and a *__secret__*. These are used to obtain access tokens for interacting with the API. See the [Authentication](http://docs.dadi.tech/api/concepts/authentication/) section of the API documentation for full details.

#### Creating the first user

The NPM package contains an interactive "Client Record Generator" to help you create user accounts. Run the following command to start the tool:

```bash
$ npm explore @dadi/api -- npm run create-client
```

You will be asked you a series of questions and API will insert the new client record into the database. The default database name is `api`, and the default collection for user accounts is `clientStore`.

If you need to create user accounts in other environments (for example following a deployment to a live server), add the environment variable to the command:

```bash
$ NODE_ENV=production npm explore @dadi/api -- npm run create-client
```

### Run API as a service
To run your API application in the background as a service, install Forever and Forever Service:

```bash
$ npm install forever forever-service -g

$ forever-service install -s index.js -e NODE_ENV=production api --start
```

You can now interact with the `api` service using the following commands:

```bash
$ [sudo] service api start
$ [sudo] service api stop
$ [sudo] service api status
$ [sudo] service api restart
```

> Note: the environment variable `NODE_ENV=production` must be set to the required configuration version matching the configuration files available in the `config` directory.
