# DADI Track

## Installation guide: Ubuntu

### Overview

This document provides a simple step by step guide to installation on Ubuntu [14.04.1 LTS](http://releases.ubuntu.com/14.04.1/).

This guide assumes a single server holding both the database and the API.

For information on using DADI API as your data store, see the [data stores documentation](https://github.com/dadi/track/blob/docs/docs/dataStores.md).

### Installing DADI Track

#### Node.js latest

1. `sudo apt-get -y update`
2. `sudo apt-get -y upgrade`
3. `sudo apt-get -y install python-software-properties`
4. `sudo add-apt-repository ppa:chris-lea/node.js`
5. `sudo apt-get -y update`
6. `sudo apt-get -y install nodejs`

#### MongoDB

1. `sudo apt-get -y install mongodb`

#### DADI Track

Install GCC to provide the latest build of the c++ bson extension (not required, but improves performance):

`sudo apt-get install gcc make build-essential`

Install Git and pull down the latest stable build of DADI Track:

1. `sudo apt-get install git`
2. `sudo git clone https://github.com/dadi/track.git`
3. `cd track/`

Install DADI Track:

`[sudo] cp config-sample.json config.json`
`[sudo] npm install`

Perform tests:

`[sudo] npm test`

In order to get up and running you will also need to create a client document in the db. To automate this do:

`node utils/create-client.js`

Start the server:

`[sudo] npm start`

By default a dashboard will be run on port 80. You can disable it for production use within the config.

_Note: the dashboard HTML is served out of the foleder `public/`: it can be served it using any webserver. For exmple, to run the UI locally but stream data from your production server, use the url http://localhost:8080/?ws_server=your-host.com&ws_port=12345_

#### Forever

To run the API server in the background, install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service):

`[sudo] npm install forever -g`

`[sudo] npm install -g forever-service`

Install as a service and ensure it loads on boot:

`[sudo] forever-service install -s main.js -e NODE_ENV=production track --start`

_Note the environment variable - `NODE_ENV=production` - must be set to target the required config version._

You can then interact with the service using the following command:

- Start: `[sudo] start track`
- Stop: `[sudo] stop track`
- Status: `[sudo] status track`
- Restart `[sudo] restart track`
