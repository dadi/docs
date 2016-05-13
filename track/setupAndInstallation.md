# DADI Track

## Setup and installation

`$ [sudo] git clone https://github.com/dadi/track.git`

`$ cd track`

### Installing dependencies

To ensure your system has all the required dependencies, run the following command:

`$ [sudo] npm install`

### Running tests

The inclusion of opperational tests is work in progress. Watch this space.

### Starting the server

To start DADI Track, issue the following command. This will start the server using the configuration settings found in the config.json file.

`$ [sudo] npm start`

_Note: the dashboard HTML is served out of the foleder `public/`: it can be served it using any webserver. For exmple, to run the UI locally but stream data from your production server, use the url http://localhost:8080/?ws_server=your-host.com&ws_port=12345_

#### Running the server in the background and as a service

Pro tip: to run DADI CDN in the background, install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service)

`[sudo] npm install forever -g`

`[sudo] npm install -g forever-service`

Install DADI CDN as a service and ensure it loads on boot:

`[sudo] forever-service install -s dadi/main.js track --start`

You can then interact with Barbu as a service using the following command:

- Start: `[sudo] start track`
- Stop: `[sudo] stop track`
- Status: `[sudo] status track`
- Restart `[sudo] restart track`

### Additional reading

You can see a complete installation guide for DADI Track under Ubuntu [here](https://github.com/dadi/track/blob/docs/installGuide.ubuntu.md).
