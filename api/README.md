---
title: API
permalink: /api/
public: true
---

| Github   | [https://github.com/dadi/api](https://github.com/dadi/api) |
| NPM      | [npm install @dadi/api](https://www.npmjs.com/package/@dadi/api) |

## Overview

DADI API is built on Node.JS and MongoDB. It is a high performance RESTful API layer designed in support of [API-first development and the principle of COPE](./apiFirst.md).

You can consider it as the data layer within a platform (including the data model). It is designed to be plugged into a templating layer, a mobile application or to be used with any other data consumer.

Calls to a DADI API can contain your business/domain logic (the part of a platform that encodes the real-world business rules that determine how data is created, displayed, stored and changed). It has full support for searching, filtering, limiting, sorting, offsetting, input validation and data aggregation (through support for MongoDB's aggregation pipeline).

It has built in support for oAuth2, includes full collection-level ACL, can connect to multiple databases out of the box, provides native document versioning at collection level, supports static endpoints, includes automatic indexing, has a caching layer and can be run in a clustered configuration.

DADI API provides a starting point that's further advanced than a framework. It allows you to get a complete data layer up and running in minutes.

It is part of DADI, a suite of components covering the full development stack, built for performance and scale.

## Core contributors

* Carl Buelow
* James Lambie
* Arthur Mingard
* Joe Wagner
* Viktor Fero
* Dave Allen
* Niklas Iversen
* Joseph Denne