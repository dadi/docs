---
title: Installing DADI API
---

## Create a new API project

```bash
$ mkdir my-api-app
$ cd my-api-app
```

### Initialise the project

Running `npm init` adds a file called `package.json` to your project, allowing you to easily add dependencies to it:

```bash
$ npm init
```

### Install @dadi/api from NPM

All DADI platform microservices are available from [NPM](https://www.npmjs.com/). To add *API* to your project as a dependency:

```bash
$ npm install --save @dadi/api
```

### Add an entry point

You'll need an entry point for your project. We'll create a file called `index.js` and later we will start the application with `node index.js`.

```bash
$ touch index.js
```

Add the following to the new file:

```js
/**
 *  index.js
 */
var app = require('@dadi/api')

app.start(function() {
  console.log('API Started')
})
```

### Create the first user

User accounts are required to provide an authentication layer for API. Each user has a "clientId" and a "secret". These are used to obtain access tokens for interacting with the API. See the [Authentication](concepts/authentication) section for full details.

```bash
$ npm explore @dadi/api -- npm run create-client
```

This will start the Client Record Generator, accessing you a series of questions and finally inserting the client record into the database you have configured.

To ensure the correct database is used for your environment, add an environment variable to the command:

```bash
$ NODE_ENV=production npm explore @dadi/api -- npm run create-client
```

### Start the API server

The moment of truth!

```bash
$ node index.js
```

## Running API in the background

To run API in the background, install [forever](https://github.com/nodejitsu/forever) and [forever-service](https://github.com/zapty/forever-service) globally:

```
$ npm install -g forever forever-service
```

Install your new API as a service and ensure it loads on boot:

```
$ forever-service install -s index.js -e NODE_ENV=production api --start
```

**Note** the environment variable `NODE_ENV` must be set to target the required configuration settings. [Read more about API configuration](/api/getting-started/configuration/).

You can now interact with the service using the following commands:

```
$ [sudo] start api
$ [sudo] stop api
$ [sudo] status api
$ [sudo] restart api
```

**And you're done, now move on to [API configuration](/api/getting-started/configuration/).**
