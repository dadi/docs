---
title: Setup and installation
layout: default
---

`$ [sudo] git clone https://github.com/dadi/api.git`

`$ cd api`

## Installing dependencies

To ensure your system has all the required dependencies, run the following command:

`$ [sudo] npm install`

## Running tests

[Mocha](http://mochajs.org/) is used for unit and acceptance tests. Tests can be run using the following command. _**Note**: for tests to run you will need standalone `mongod` instances running at `localhost:27017` and `localhost:27018`_

**Warning:** Running `npm test` or using `mocha` to test an individual module will cause a pre-test script to run which will check that your configuration has specified a `test` database. If a `test` database is not configured the tests will not run. Ensure you have a configuration file for the test environment at `config/config.test.json`.

_**Please ensure you have configured Serama to use a test database before continuing.**_

```
$ [sudo] npm test
$ [sudo] mocha test/acceptance/app.js
```

## Starting the server

To start the API server, issue the following command. This will start the server using the configuration settings found in the `config.json` file.

`$ [sudo] npm start`

Before you really start using the API you will need to create an API client, enabling you to send authenticated requests to the API. This is described in the next section.

#### Creating an API client

An API client is simply a document in the database representing a consumer of your data. An API client requires two fields, `clientId` and `secret`. Your first API client can be created automatically by running the following script:

`$ node utils/create-client.js`

This will create a new API client in the database and collection specified by the `config.json` file.

```
{ "clientId": "testClient", "secret": "superSecret" }
```

### Running the server in the background

Pro tip: to run the server in the background, install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service)

`[sudo] npm install forever -g`

`[sudo] npm install -g forever-service`

Install the API as a service and ensure it loads on boot:

`[sudo] forever-service install -s main.js api --start`

You can then interact with Serama as a service using the following command:

- Start: `[sudo] start api`
- Stop: `[sudo] stop api`
- Status: `[sudo] status api`
- Restart `[sudo] restart api`

## Additional reading

You can see a complete installation guide for API under Ubuntu [here](https://github.com/dadi/api/blob/api/blob/docs/docs/installGuide.ubuntu.md).
