# DADI Passport

## Overview

DADI Passport is a library for generating access tokens to authenticate with DADI platform components.

Various components within the DADI stack implement 2-legged oAuth2, requiring a bearer token to authorise requests. This bearer token is obtained as a response sent to a specific endpoint with a clientId/secret pair, along with a TTL defined by the provider.

This library can be used by third-party applications that wish to integrate with DADI, as it abstracts the oAuth protocol by storing and requesting bearer tokens as needed, and returning always a promise with a valid bearer token.

## Contents

### Overview

* [Token wallets](docs/tokenWallets.md)
* [Development](docs/development.md)
* [License](docs/license.md)
* [GPL](docs/gpl.md)

### Node.js

* [Requirements](docs/node/requirements.md)
* [Installation](docs/node/installation.md)
* [Usage examples](docs/node/usageExamples.md)
* [Testing](docs/node/testing.md)

### PHP

* [Requirements](docs/php/requirements.md)
* [Installation](docs/php/installation.md)
* [Usage examples](docs/php/usageExamples.md)
* [Testing](docs/php/testing.md)

## Development

DADI is based on an original concept by Joseph Denne.

DADI Passport was conceived and developed by Eduardo Bouças and is maintained by the engineering team at DADI+ ([https://dadi.co](https://dadi.co)).

Core contributors:

* Eduardo Bouças
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

We use the issues log in Github for roadmapping. If you have anything to contribute in terms of future direction, please add as an feature request within [issues](https://github.com/dadi/passport/issues).

### Versioning

Semantic Versioning 2.0.0

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

_Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format._