---
title: Configuration
---

# Basic configuration

All the core platform services are configured using enviroment specific configuration.json files, the default being `development`. For more advanced users this can also load based on the `hostname` i.e., it will also look for `config." + req.headers.host + ".json`

A very basic `config.development.json` file looks like this:

```json
{
  "server": {
    "host": "localhost",
    "port": 3001
  },
  "images": {
    "directory": {
      "enabled": true,
      "path": "./path-to-images"
    }
  }
}
```

## Advanced configuration

### Example Configuration File

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8001
  },
  "logging": {
    "enabled": true,
    "level": "info",
    "path": "./log",
    "filename": "cdn",
    "extension": "log"
  },
  "notFound": {
    "statusCode": 410,
    "images": {
      "enabled": false,
      "path": "./images/missing.png"
    }
  },
  "images": {
    "directory": {
      "enabled": true,
      "path": "./test/images"
    },
    "s3": {
      "enabled": false,
      "accessKey": "",
      "secretKey": "",
      "bucketName": "",
      "region": ""
    },
    "remote": {
      "enabled": false,
      "path": ""
    }
  },
  "assets": {
    "directory": {
      "enabled": true,
      "path": "./public"
    },
    "s3": {
      "enabled": false,
      "accessKey": "",
      "secretKey": "",
      "bucketName": "",
      "region": ""
    },
    "remote": {
      "enabled": false,
      "path": ""
    }
  },
  "caching": {
    "ttl": 3600,
    "directory": {
      "enabled": false,
      "path": "./cache/"
    },
    "redis": {
      "enabled": false,
      "host": "127.0.0.1",
      "port": 6379
    }
  },
  "security": {
    "maxWidth": 10048,
    "maxHeight": 5024
  },
  "auth": {
    "clientId":"webClient",
    "secret":"secretSquirrel"
  },
  "upload": {
    "enabled": true,
    "requireAuthentication": true,
    "pathFormat": "sha1/4"
  },
  "cloudfront": {
    "accessKey": "",
    "secretKey": "",
    "distribution": ""
  },
  "headers": {
    "useGzipCompression": true,
    "cacheControl": {
      "default": "public, max-age=3600",
      "paths": [],
      "mimetypes": [
        { "image/jpeg": "public, max-age=86400" },
        { "text/css": "public, max-age=86400" },
        { "text/javascript": "public, max-age=86400" },
        { "application/javascript": "public, max-age=86400" }
      ]
    }
  }
}
```