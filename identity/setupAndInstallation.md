---
title: Setup and installation
---

`$ [sudo] git clone https://github.com/dadi/identity`

`$ cd identity`

## Installing dependencies

To ensure your system has all the required dependencies, run the following command:

`$ [sudo] npm install`

## Running tests

```
$ [sudo] npm test
```

## Starting the server

To start the Identity server, issue the following command. This will start the server using the configuration settings found in the `config.json` file.

`$ [sudo] npm start`

### Running the server in the background

Pro tip: to run the server in the background, install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service)

`[sudo] npm install forever -g`

`[sudo] npm install -g forever-service`

Install Identity as a service and ensure it loads on boot:

`[sudo] forever-service install -s main.js identity --start`

You can then interact with Identity as a service using the following command:

- Start: `[sudo] start identity`
- Stop: `[sudo] stop identity`
- Status: `[sudo] status identity`
- Restart `[sudo] restart identity`

## Additional reading

You can see a complete installation guide for API under Ubuntu [here](https://github.com/dadi/identity/blob/master/docs/install.ubuntu.md).
