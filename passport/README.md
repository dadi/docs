# DADI Passport

![Build Status](http://img.shields.io/badge/Release-0.1_Beta-green.svg?style=flat-square)&nbsp;![Coverage](https://img.shields.io/badge/Coverage-0%-yellow.svg?style=flat-square)

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