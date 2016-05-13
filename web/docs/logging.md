# DADI Web

## Logging

* [Basic Logging](#basic-logging)
* [Default Configuration](#default-configuration)
* [Configuration Properties](#configuration-properties)
* [Request Logging](#request-logging)
* Log Rotation
* [Viewing the logs](#viewing-the-logs)

### Basic Logging

DADI Web starts with a default configuration for logging which enables both error/event logging and HTTP request logging.

To disable logging, simply add a `logging` section to your configuration file and set `enabled` to `false`. To change the name and location of your log files,  change the `path`, `filename` and `extension` properties.

DADI Web checks for the existence of the configured log path at startup, and creates it if necessary.

##### Default Configuration

```
"logging": {
  "enabled": true,
  "level": "info",
  "path": "./log",
  "filename": "web",
  "extension": "log",
  "fileRotationPeriod": "1d",
  "fileRetentionCount": 7,
  "accessLog": {
    "enabled": true,
    "fileRotationPeriod": "1d",
    "fileRetentionCount": 7,
    "kinesisStream": ""
  },
  "sentry": {
    dsn: ""
  }
}
```

### Configuration Properties

Property       | Description        |  Type        | Default         |  Example
:----------------|:------------|:------------------|:----------------|:---------
enabled            | If true, logging is enabled   | Boolean     | true |
level            | Sets the logging level   | String     | "info" | "warn"
path            | The path relative to the root of the application where log files should be stored   | String     | "./log" | "/var/log/web"
filename            |     | String     |"web" | "your-application-name"
extension            |     | String     |"log" | "txt"
fileRotationPeriod            | The period at which to rotate the log file. This is a string of the format '$number$scope' where '$scope' is one of 'ms' (milliseconds), 'h' (hours), 'd' (days), 'w' (weeks), 'm' (months), 'y' (years).  | String     | "" (disabled) | "1w", "2w". In addition, the following names can be used "hourly", "daily", "weekly", "monthly", "yearly".
fileRetentionCount            | The number of rotated log files to keep  | Number     | 7 | 14
  -          |    |   |  |
**accessLog**            | **Allows configuration of HTTP request logging**   |   |  |
accessLog.enabled            | If true, HTTP requests are logged to a separate file. The filename used will be a combination of `logging.filename` + access + `logging.extension`. For example, `web.access.log`  | Boolean     | true |
accessLog.fileRotationPeriod            | The period at which to rotate the access log file. This is a string of the format '$number$scope' where '$scope' is one of 'ms' (milliseconds), 'h' (hours), 'd' (days), 'w' (weeks), 'm' (months), 'y' (years).  | String     | "1d" | "1w", "2w". In addition, the following names can be used "hourly", "daily", "weekly", "monthly", "yearly".
accessLog.fileRetentionCount            | The number of rotated log files to keep  | Number     | 7 | 14
accessLog.kinesisStream            | The name of an AWS Kinesis stream to write to log records to | String     | Empty, therefore disabled  | "webAppLogStream"
  -          |    |   |  |
**sentry**            | **Allows sending events to a Sentry server**   |   |  |
sentry.dsn            | A DSN key as provided by your Sentry integration   |   | "https://693ef18da3184cffa82144fde2979cbc:a0651b0286784761a62ef8e8fc128722@app.getsentry.com/59524" |


### Using the logger in your own modules

DADI Web exposes it's log module so you can use it within your own modules or events. Use the following code to get a reference to the log, then call one of the log methods to send data to the log file. Available log methods are `debug`, `info`, `warn`, `error`, `trace`.

```
var Logger = require('dadi-api').Log;
var log = Logger.get();

log.info('Something worth logging');
log.error(new Error('Something bad happened'));
```

#### Adding a module identifier to log records

To make it easier to identify log records from your own modules or events, pass a `module` property into the log call:

```
var Logger = require('dadi-api').Log;
var log = Logger.get();

log.info({ module: 'your module' }, 'Something worth logging');
```

Log records created using the above child logger will include a property containing the specified module name:

```
{"name":"web","hostname":"localhost","pid":12010,"module":"your module","level":30,"msg":"Something worth logging","time":"2015-12-17T08:57:56.678Z","v":0}
```

### Request Logging

```
"logging": {
  "enabled": true,
  "level": "info",
  "path": "./log",
  "filename": "web",
  "extension": "log",
  "accessLog": {
    "enabled": true,
    "fileRotationPeriod": "1d",
    "fileRetentionCount": 7,
    "kinesisStream": ""
  }
}
```

The request log contains a stream of JSON records. Each record contains a `msg` property containing details about the HTTP request, formatted using the nginx server log format.

#### The raw log record
```
{"name":"web_access","hostname":"localhost","pid":14157,"level":30,"msg":"127.0.0.1 - 2015-12-17T19:02:08+08:00 GET /movies/ HTTP/1.1 200 17529 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36","time":"2015-12-17T11:02:08.676Z","v":0}
```

#### The actual log record, in nginx format

```
127.0.0.1 - 2015-12-17T19:02:08+08:00 GET /movies/ HTTP/1.1 200 17529 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36
```

This record consists of the following fields:
`remote address` - `time` `request` `status_code` `bytes_sent` `http_referer (optional)` `http_user_agent`

For example:

* `remote address`: 127.0.0.1
* `time`: 2015-12-17T19:02:08+08:00
* `request`: GET /movies/ HTTP/1.1
* `status_code`: 200
* `bytes_sent`: 17529
* `http_referer (optional)`:
* `http_user_agent`: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36

### Log Rotation

[TODO]

### Viewing the logs

DADI Web uses [Bunyan](https://github.com/trentm/node-bunyan) to log errors and events. The Bunyan log output is a stream of JSON objects. A CLI tool is provided for pretty-printing Bunyan logs and for filtering.

#### Install the CLI

To make reading the application logs easier install the Bunyan CLI tool globally:

```
$ npm install -g bunyan
```


#### Example: pass the log contents to the CLI tool

```
$ tail log/web.log | bunyan
```
```
[2015-10-27T09:14:01.856Z]  INFO: web/67025 on localhost: 5 rewrites/redirects loaded. (module=router)
[2015-10-27T09:14:03.380Z]  INFO: web/67025 on localhost: Generating new access token for "/home" (module=auth)
[2015-10-27T09:14:04.510Z]  INFO: web/67025 on localhost: Token received. (module=auth)
[2015-10-27T09:14:04.517Z]  INFO: web/67025 on localhost: Generating new access token for datasource movies (module=auth/bearer)
[2015-10-27T09:14:04.623Z]  INFO: web/67025 on localhost: https://127.0.0.1:3000/1.0/app/movies?count=3&page=1&filter={"state":"published"}&fields={}&sort={} (module=helper)
[2015-10-27T09:14:04.643Z]  INFO: web/67025 on localhost: GET /home 200 65ms (module=router)
[2015-10-27T09:16:46.331Z]  INFO: web/67025 on localhost: Server stopped, process exiting. (module=server)
```

#### Example: filter logs by module

In the next two examples, a valid Javascript condition can be specified. Here, `this` refers to the log record as JSON.

```
$ tail -n30 log/web.log | bunyan -c 'this.module=="router"'
```
```
[2015-10-27T09:14:01.413Z]  INFO: web/67025 on localhost: Added route constraint function 'nextIfPaginationRequest' for '/movies/reviews/' (module=router)
[2015-10-27T09:14:01.856Z]  INFO: web/67025 on localhost: Rewrite module loaded. (module=router)
[2015-10-27T09:14:01.856Z]  INFO: web/67025 on localhost: 5 rewrites/redirects loaded. (module=router)
[2015-10-27T09:14:04.643Z]  INFO: web/67025 on localhost: GET /home 200 65ms (module=router)
```

#### Example: filter logs by any other valid Javascript condition

In this example we also pass a formatting option to the command to view shorter output. See the full range of options available [here](https://github.com/trentm/node-bunyan)

```
$ tail log/web.log | bunyan -c 'this.msg.indexOf("GET") > -1' -o short
```
```
09:11:57.618Z  INFO web: GET /home 200 460ms (module=router)
09:13:18.325Z  INFO web: GET /home 200 2ms (module=router)
```

#### Example: filter logs by level

```
$ tail log/web.log | bunyan -l warn
```
```
[2015-10-25T13:54:25.429Z]  WARN: web/58045 on localhost.local: log.stage() is deprecated and will be removed in a future release. Use log.debug(), log.info(), log.warn(), log.error(), log.trace() instead.
```


### Sentry Error Reporting

DADI Web contains functionality to integrate your application with [Sentry](https://getsentry.com/welcome/), a real-time crash reporting solution.

Whether you already have an account with the cloud-hosted version of Sentry, or are hosting your own server, it is easy to start sending data from your DADI Web application.

Simply locate or create your project's Sentry DSN under Settings > Client Keys. Copy the DSN to your configuration file so it looks similar to the following (some properties omitted for brevity):

```
"logging": {
  "sentry": {
    "dsn": "https://693ef18da3184cffa82144fde2979cbc:a0651b0286784761a62ef8e8fc128722@app.getsentry.com/59524"
  }
}
```
