### Configuration

#### Example Configuration File

```js
{
    "app": {
      "name": "Project Name Here"
    },
    "server": {
      "host": "127.0.0.1",
      "port": 3020,
      "socketTimeoutSec": 30
    },
    "api": {
      "host": "127.0.0.1",
      "port": 3000
    },
    "auth": {
      "tokenUrl":"/token",
      "clientId":"webClient",
      "secret":"secretSquirrel"
    },
    "aws": {
      "accessKeyId": "<your key here>",
      "secretAccessKey": "<your secret here>",
      "region": "eu-west-1"
    },
    "caching": {
      "ttl": 300,
      "directory": {
        "enabled": true,
        "path": "./cache/web/",
        "extension": "html"
      },
      "redis": {
        "enabled": false,
        "host": "localhost",
        "port": 6379
      }
    },
    "dust": {
      "cache": true,
      "debug": false,
      "debugLevel": "INFO",
      "whitespace": false
    },
    "headers": {
      "useGzipCompression": true,
      "cacheControl": {
        "text/css": "public, max-age=86400"
      }
    },
    "logging": {
      "enabled": true,
      "level": "info",
      "path": "./log",
      "filename": "dadi-web",
      "extension": "log",
      "fileRotationPeriod": "1d",
      "fileRetentionCount": 7
      "accessLog": {
        "enabled": true,
        "fileRotationPeriod": "1d",
        "fileRetentionCount": 14,
        "kinesisStream": "dadi_web_test_stream"
      }
    },
    "rewrites": {
      "datasource": "redirects",
      "path": "workspace/routes/rewrites.txt",
      "forceLowerCase": true,
      "forceTrailingSlash": true,
      "stripIndexPages": ['index.php', 'default.aspx']
    },
    "global" : {
      "baseUrl": "http://www.example.com"
    },
    "debug": true,
    "allowJsonView": true
}
```

#### Property Description

Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
debug           | If true, enables a debug panel on every page containing the loaded data and execution stats   |     false          | true
allowJsonView           |  If true, allows ?json=true in the querystring to return a view of the raw data loaded for the page  |   false            | true

###### Section: `server`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
host           | The hostname or IP address to use when starting the Web server   |               | "www.example.com"
port           | The port to bind to when starting the Web server   |               | 3000
socketTimeoutSec  | The number of seconds to wait before closing an idle socket   |        30       | 10

###### Section: `api`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
host           | The hostname or IP address of the API instance to connect to   |               | "api.example.com"
port           | The port of the API instance to connect to   |               | 3001
enabled           | If false, the web server runs in stand-alone mode   |         true      | false

###### Section: `auth`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
tokenUrl           | The endpoint to use when requesting Bearer tokens from the API   |  |  "/token"
clientId           |    |               |        "test123"
secret           |    |               |         "superSecret"

###### Section: `caching`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
ttl           |    |               |  300      
directory           | Configuration block for caching using a local filesystem directory   |               |
directory.enabled           | If true, cache files will be stored on disk using the settings below. Either directory or redis caching must be enabled for caching to work.   | true              | true
directory.path           | The directory to use for storing cache files, relative to the root of the application. Automatically created at startup if it doesn't exist.   |    "./cache/web"           |  
directory.extension           | The file extension to use for cache files   |    "html"           |  
redis           | Configuration block for caching using a Redis caching service   |               |
redis.enabled           | If true, cache files will be stored in the Redis cache store using the settings below. Either directory or redis caching must be enabled for caching to work.   | false              | true
redis.host           | The host for the Redis caching service   |    ""           |  See example config above.
redis.port           | The port for the Redis caching service   |    6379           |  6379


###### Section: `dust`

 Property       | Description         | Default value  |  Example
:---------------|:--------------------|:---------------|:--------------
cache           |     |       true     | true       
debug           |     |       true     | true       
debugLevel      |                     |       "DEBUG"  | "DEBUG"
whitespace      |                     |       true     | false

###### Section: `headers`

 Property       | Description         | Default value  |  Example
:---------------|:--------------------|:---------------|:--------------
useGzipCompression | If true, compresses the reponse using GZip | true | true
cacheControl   | A set of custom cache-control headers for different content types | `{ "text/css": "public, max-age=86400", "text/javascript": "public, max-age=86400", "application/javascript": "public, max-age=86400" }`  | `"cacheControl": { "text/css": "public, max-age=1000" }`

###### Section: `logging`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
enabled           | If true, logging is enabled using the following settings.   |            true   | true       
level           | The level at which log messages will be written to the log file.   | "info"  | "warn"
path           | The absolute or relative path to the directory for log files.   |       "./log"        | "/data/app/log"
filename           | The filename to use for the log files. The name you choose will be given a suffix indicating the current application environment. | "dadi-web" | "your_application_name"      
extension           | The extension to use for the log files.  |  "log"   | "txt"
fileRotationPeriod           | The period at which to rotate the log file. This is a string of the format '$number$scope' where '$scope' is one of 'ms', 'h', 'd', 'w', 'm', 'y'. The following names can be used 'hourly' (= '1h'), 'daily (= '1d'), 'weekly' ('1w'), 'monthly' ('1m'), 'yearly' ('1y').   |       "1d"        | "daily"
fileRetentionCount           | The number of rotated log files to keep. |    7           | 14

###### Section: `logging.accessLog`

Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
enabled           | If true, HTTP access logging is enabled. The log file name is similar to the setting used for normal logging, with the addition of 'access'. For example `dadi-web.access.log`.   |            true   | true       
fileRotationPeriod           | The period at which to rotate the access log file. This is a string of the format '$number$scope' where '$scope' is one of 'ms', 'h', 'd', 'w', 'm', 'y'. The following names can be used 'hourly' (= '1h'), 'daily (= '1d'), 'weekly' ('1w'), 'monthly' ('1m'), 'yearly' ('1y').   |       "1d"        | "daily"
fileRetentionCount           | The number of rotated log files to keep. |    7           | 14
kinesisStream           | An AWS Kinesis stream to write to log records to. |  ""   | "web_aws_kinesis"

###### Section: `aws`

Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
accessKeyId           |    |    ""   | ""
secretAccessKey           |    |       ""        | ""
region           |  |    ""           | ""

###### Section: `rewrites`

Property           | Description                 | Default value  |  Example
:------------------|:----------------------------|:---------------|:--------------
datasource         | The name of a datasource used to query the database for redirect records matching the current URL  | ""    | "redirects"
path               | The path to a file containing rewrite rules  | ""    | "workspace/routes/rewrites.txt"
forceLowerCase | If true, converts URLs to lowercase before redirecting  | false | true
forceTrailingSlash | If true, adds a trailing slash to URLs before redirecting  | false | true
stripIndexPages | A set of common index page filenames to remove from URLs. | [] | ['index.php', 'default.aspx']

###### Section: `global`

The `global` section can be used for any application parameters that should be available for use in page templates, such as asset locations, 3rd party account identifiers, etc

```js
"global" : {
  "baseUrl": "http://www.example.com"
}
```

In the above example `baseUrl` would be availabe to a page template and could be used in the following way:

```html
<html>
<body>
  <h1>Welcome to DADI Web</h1>
  <img src="{baseUrl}/images/welcome.png"/>
</body>
</html>
```
