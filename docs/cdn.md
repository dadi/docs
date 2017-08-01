---
title: CDN
---

## Installation

### Image libraries

```bash
$ sudo apt-get install libcairo2-dev libjpeg-dev libgif-dev
```

### Sqwish CSS Compressor

```bash
$ sudo npm install -g sqwish
```

### Upgrade GCC++ Compiler

```bash
$ sudo add-apt-repository ppa:ubuntu-toolchain-r/test
$ sudo apt-get update -y
$ sudo apt-get install gcc-4.9 g++-4.9
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9
```

### NPM

All our platform microservices are available from [NPM](https://www.npmjs.com/). To install *CDN*:

``` console
$ npm install @dadi/cdn
```

### Manual install

If you do not want to use NPM, you can grab the latest [release](https://github.com/dadi/cdn/releases). Then you can install:

``` console
$ cd ./release-download-location/
$ npm install
```

### Dependencies

*API* requires [MongoDB](https://www.mongodb.com/). There is a complete guide to installing this and *API* together [here]().

You can see our full list of dependencies in the [package.json](https://github.com/dadi/cdn/blob/master/package.json).

### Tests

If you have installed manually, you can run tests by:

``` console
$ npm run test
```

### Forever (optional)

As with most Node.js applications, to run the app in the background you will need to install install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service):

``` console
$ [sudo] npm install forever -g
$ [sudo] npm install -g forever-service
```

Install DADI CDN as a service and ensure it loads on boot:

``` console
$ [sudo] forever-service install -s main.js -e NODE_ENV=production cdn --start
```

**Note** the environment variable `NODE_ENV=production` must be set to target the required config version.

You can then interact with the service using the following command:

``` console
$ [sudo] start cdn
$ [sudo] stop cdn
$ [sudo] status cdn
$ [sudo] restart cdn
```

**And you're done, now move on to [configuration](/cdn/getting-started/configuration/).**
