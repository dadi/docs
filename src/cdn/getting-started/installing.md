---
title: Getting Started
---

# Installing DADI CDN

## NPM

All our platform microservices are available from [NPM](https://www.npmjs.com/). To install *CDN*.

```
$ npm install @dadi/cdn
```

## Manual install

If you do not want to use NPM, you can grab the latest [release](https://github.com/dadi/cdn/releases). Then you can install:

```
$ cd ./release-download-location/
$ npm install
```

## Using [DADI Generator](https://github.com/dadi/generator)

We have a handy tool to generate new applications easily.

```
$ npm install -g @dadi/generator
$ dadi-generator cdn /path/to/your_new_app
$ cd /path/to/your_new_app
$ npm install
$ npm start
```

## Dependencies

*API* requires [MongoDB](https://www.mongodb.com/). There is a complete guide to installing this and *API* together [here]().

You can see our full list of dependencies in the [package.json](https://github.com/dadi/cdn/blob/master/package.json).

## Tests

If you have installed manually, you can run tests by:

```
$ npm run test
```

## Forever (optional)

As with most Node.js applications, to run the app in the background you will need to install install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service):

```
$ [sudo] npm install forever -g
$ [sudo] npm install -g forever-service
```

Install DADI CDN as a service and ensure it loads on boot:

```
$ [sudo] forever-service install -s main.js -e NODE_ENV=production cdn --start
```

**Note** the environment variable `NODE_ENV=production` must be set to target the required config version.

You can then interact with the service using the following command:

```
$ [sudo] start cdn
$ [sudo] stop cdn
$ [sudo] status cdn
$ [sudo] restart cdn
```

**And you're done, now move on to [configuration](/cdn/getting-started/configuration/).**