---
title: Getting Started
layout: default.html
---

## Installing DADI Web

## NPM

All our platform microservices are available from [NPM](https://www.npmjs.com/). To install *Web*.

`$ npm install @dadi/web`

## Manual install

If you do not want to use NPM, you can grab the latest [release](https://github.com/dadi/web/releases). Then you can install:

```
cd ./release-download-location/
$ npm install
```

## Using [DADI Generator](https://github.com/dadi/generator)

We have our own tool to handy tool to generate new applications easily.

```
$ npm install -g @dadi/generator
$ dadi-generator web /path/to/your_new_app
$ cd /path/to/your_new_app
$ npm install
$ npm start
```

## Dependencies

You can see our full list of dependencies in the [package.json](https://github.com/dadi/web/blob/master/package.json#L12-L67)

## Tests

If you have installed manually, you can run tests by:

`$ npm run test`

And you're done, now move on to [configuration](/web/configuration)

