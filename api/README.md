# DADI API

## Overview

DADI API is built on Node.JS and MongoDB. It is a high performance RESTful API layer designed in support of [API-first development and the principle of COPE](https://github.com/dadi/api/blob/docs/docs/apiFirst.md).

You can consider it as the data layer within a platform (including the data model). It is designed to be plugged into a templating layer, a mobile application or to be used with any other data consumer.

Calls to a DADI API can contain your business/domain logic (the part of a platform that encodes the real-world business rules that determine how data is created, displayed, stored and changed). It has full support for searching, filtering, limiting, sorting, offsetting, input validation and data aggregation (through support for MongoDB's aggregation pipeline).

It has built in support for oAuth2, includes full collection-level ACL, can connect to multiple databases out of the box, provides native document versioning at collection level, supports static endpoints, includes automatic indexing, has a caching layer and can be run in a clustered configuration.

DADI API provides a starting point that's further advanced than a framework. It allows you to get a complete data layer up and running in minutes.

It is part of DADI, a suite of components covering the full development stack, built for performance and scale.

## Contents

* Overview (this document)
* [Requirements](https://github.com/dadi/api/blob/docs/docs/requirements.md)
* Setup, installation and use
	* [Setup and installation](https://github.com/dadi/api/blob/docs/docs/setupAndInstallation.md)
	* [Configuration](https://github.com/dadi/api/blob/docs/docs/configuration.md)
	* [Complete guide: Ubuntu](https://github.com/dadi/api/blob/docs/docs/installGuide.ubuntu.md)
* The API
	* [REST API Specification](https://github.com/dadi/api/blob/docs/docs/restApiSpecification.md)
	* [Authorisation](https://github.com/dadi/api/blob/docs/docs/authorisation.md)
	* Endpoints
	  * [Collections](https://github.com/dadi/api/blob/docs/docs/endpointsCollections.md)
	  * [Custom Endpoints](https://github.com/dadi/api/blob/docs/docs/endpointsCustom.md)
	  * [Querying](https://github.com/dadi/api/blob/docs/docs/querying.md)
	  * [Configuration API](https://github.com/dadi/api/blob/docs/docs/configApi.md)
	  * [Status Endpoint](https://github.com/dadi/api/blob/docs/docs/status.md)
	* [Validation](https://github.com/dadi/api/blob/docs/docs/validation.md)
	* [HTTP Status Codes](https://github.com/dadi/api/blob/docs/docs/httpStatuses.md)
* Middleware
	* [Authorisation middleware](https://github.com/dadi/api/blob/docs/docs/authMiddleware.md)
	* [Connection module](https://github.com/dadi/api/blob/docs/docs/connectionModule.md)
	* [Extension API](https://github.com/dadi/api/blob/docs/docs/extensionApi.md)
	* [Logging](https://github.com/dadi/api/blob/docs/docs/logging.md)
	* [Monitor module](https://github.com/dadi/api/blob/docs/docs/monitorModule.md)
* [Cache performance](https://github.com/dadi/api/blob/docs/docs/cachePerformance.md)
* [Development](https://github.com/dadi/api/blob/docs/docs/development.md)

## Development

DADI is based on an original concept by Joseph Denne.

DADI API was conceived, developed and is maintained by the engineering team at DADI+ ([https://dadi.co](https://dadi.co)).

Core contributors:

* Carl Buelow
* James Lambie
* Arthur Mingard
* Joe Wagner
* Viktor Fero
* Dave Allen
* Niklas Iversen
* Joseph Denne

Feel free to contact the DADI core development team on team@dadi.tech with questions.

### Roadmap

We use the issues log in Github for roadmapping. If you have anything to contribute in terms of future direction, please add as an feature request within [issues](https://github.com/dadi/api/issues).

### Versioning

Semantic Versioning 2.0.0

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

_Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format._