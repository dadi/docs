---
title: Introduction
layout: default
---

[![npm (scoped)](https://img.shields.io/npm/v/@dadi/cdn.svg?maxAge=10800&style=flat-square)](https://www.npmjs.com/package/@dadi/cdn)&nbsp;[![Build Status](https://travis-ci.org/dadi/cdn.svg?branch=master)](https://travis-ci.org/dadi/cdn)&nbsp;[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

DADI API is a high performance RESTful API layer designed in support of [API-first development and the principle of COPE](./apiFirst).

You can consider it as the data layer within a platform (including the data model). It is designed to be plugged into a templating layer, a mobile application or to be used with any other data consumer.

Calls to a DADI API can contain your business/domain logic (the part of a platform that encodes the real-world business rules that determine how data is created, displayed, stored and changed). It has full support for searching, filtering, limiting, sorting, offsetting, input validation and data aggregation (through support for MongoDB's aggregation pipeline).

It has built in support for oAuth2, includes full collection-level ACL, can connect to multiple databases out of the box, provides native document versioning at collection level, supports static endpoints, includes automatic indexing, has a caching layer and can be run in a clustered configuration.

DADI API provides a starting point that's further advanced than a framework. It allows you to get a complete data layer up and running in minutes.

It is part of DADI, a suite of components covering the full development stack, built for performance and scale.

## Contents

* Overview (this document)
* [API-first Development](./apiFirst)
* [Installation and Configuration](./setup/)
  * [Requirements](./setup/requirements)
  * [Configuration](./setup/configuration)
  * [Complete guide: Ubuntu](./setup/installGuide.ubuntu)
* The API
	* [REST API Specification](./theapi/restApiSpecification)
	* [Authorisation](./theapi/authorisation)
	* Endpoints
	  * [Collections](./theapi/endpoints/collections)
	  * [Custom Endpoints](./theapi/endpoints/custom)
	  * [Querying](./theapi/endpoints/querying)
	  * [Configuration API](./theapi/endpoints/configApi)
	  * [Status Endpoint](./theapi/endpoints/status)
  * [Hooks](./theapi/hooks)
  * [Validation](./theapi/validation)
  * [HTTP Status Codes](./theapi/httpStatuses)
* [Cache performance](./cachePerformance)
* [Development](./development)
* [Contributing](./contributingGuidelines)
* [License](./license)
* [GPL](./gpl)
