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

```console
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

## Creating an API application

## Application Anatomy

## Command line tools

## Getting started

### First use

### Connecting to API

### Data connectors

### Auto generate documentation

## Managing users

## Authentication, authorisation & permissions

### Adding client accounts

### Obtaining a token

### Obtaining an admin token

### Restricting access to collections

## Defining collections

### Collection schema

### Fields

### Creating a collection

### Editing a collection

### Data types

## Working with data

### Inserting data

#### Using REST API

#### Using a Model directly

### Updating data

#### Using REST API

#### Using a Model directly

### Retrieving data

#### Using REST API

#### Using a Model directly

#### Filtering

#### Pagination

### Validation

## Adding application logic

### Endpoints

### Hooks

## Data connectors reference

### MongoDB Connector

#### Installing

#### Configuring

#### Using MongoLab

### CouchDB

### JSON File

### Building a connector

## How-to guides



