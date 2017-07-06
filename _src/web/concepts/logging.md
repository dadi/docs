---
title: Logging
excerpt: How to log errors and events
order: 8
---

## Basic Logging

DADI Web starts with a default configuration for logging which enables both error/event logging and HTTP request logging.

To disable logging, simply add a `logging` section to your configuration file and set `enabled` to `false`. To change the name and location of your log files, change the `path`, `filename` and `extension` properties.

DADI Web checks for the existence of the configured log path at startup, and creates it if necessary.

### Default Configuration

```
"logging": {
  "enabled": true,
  "level": "info",
  "path": "./log",
  "filename": "web",
  "extension": "log",
  "accessLog": {
    "enabled": true
  }
}
```

> **Note:** for a full description of each configuration property, see here: https://github.com/dadi/logger#configure

## Using the logger

DADI Web exposes the log module so you can use it within your own modules or events. For usage information, go here: https://github.com/dadi/logger#using-the-logger

## Request Logging

Configuring Web to log all HTTP requests is possible by adding an `accessLog` block. The request logger function will executed every time the app receives a request. For detailed documentation, go here: https://github.com/dadi/logger#http-request-logging

```json
"logging": {
  "enabled": true,
  "level": "info",
  "path": "./log",
  "filename": "web",
  "extension": "log",
  "accessLog": {
    "enabled": true
  }
}
```

## Log Rotation

Rotating log files should be configured via your operating system. For detailed documentation, go here: https://github.com/dadi/logger#log-rotation

## Viewing the logs

DADI Web uses [Bunyan](https://github.com/trentm/node-bunyan) to log errors and events. The Bunyan log output is a stream of JSON objects. A CLI tool is provided for pretty-printing Bunyan logs and for filtering. For detailed documentation, go here: https://github.com/dadi/logger#viewing-the-logs
