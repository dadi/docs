---
title: Publish
order: 4
---

## Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

* **[Node.js](https://www.nodejs.org/)** (current LTS version)

Installing DADI Publish directly from NPM

All DADI platform microservices are also available from NPM. To add API to an existing project as a dependency:

```console
$ cd my-existing-node-app
$ npm install --save @dadi/publish
```
