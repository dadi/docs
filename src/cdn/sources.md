---
title: Sources
layout: default.html
---

## Introduction

Before you can serve assets or images you need to tell CDN where your files are located. Currently, CDN can serve your files from three types of source:

* [Amazon S3](#amazon-s3) - store assets in existing Amazon S3 buckets
* [Remote Server](#remote-server) - store assets on a remote web server
* [Local Filesystem](#local-filesystem) - store assets on the same server as CDN

You’re not limited to choosing one source, either. If you’ve elected to use the [Querystring URL scheme](serving-assets.md#querystring-url-scheme) then you can use all configured sources at the same time.

> **Note:** if _not_ using the [Querystring URL scheme](serving-assets.md#querystring-url-scheme), that is, you're using the legacy [Path URL scheme](serving-assets.md#path-url-scheme), then only one source can be configured at a time.

### Configuring sources

#### Amazon S3

> **Security Note:** We **strongly** recommend creating an Amazon IAM account specifically for accessing your S3 buckets.

##### Using the configuration file

The [configuration file](x) contains two sections for configuring an Amazon S3 source. One section is for images and the other is for assets. Specifying image and asset settings separately allows you to use different Amazon credentials for each one.

> **Security Note:** We **strongly** recommend that Amazon credentials **are not** stored in your configuration file if that file could be viewed by the public (for example, committed to a public GitHub repository). A better solution is to use [Environment Variables](x) when configuring an Amazon S3 source.

**Configuration for an Amazon S3 image source**
```js
"images": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  }
}
```

**Configuration for an Amazon S3 asset source**
```js
"assets": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Amazon S3 image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  },
  "remote": {
    "enabled": false
  },
  "directory": {
    "enabled": false
  }
}
```

It was mentioned earlier that if using the [Querystring URL scheme](serving-assets.md#querystring-url-scheme) then you can use all configured sources at the same time, regardless of the value of the `enabled` property.

##### Using environment variables

One easy way to set environment variables is to specify them on the command line when you launch CDN:

```
$ AWS_S3_IMAGES_ACCESS_KEY=your-access-key AWS_S3_IMAGES_SECRET_KEY=your-secret node main.js
```

See the documentation for your operating system for details on setting environment variables. A useful guide for Linux users can be found here https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps.

#### Remote Server

The Remote Server source connects CDN to any publicly available URL where you are hosting your assets and images.

The [configuration file](x) contains two sections for configuring a Remote Server source. One section is for images and the other is for assets. This makes it possible to store your images and assets in different locations on a remote server, or even use different servers for each.

**Configuration for a Remote Server image source**
```js
"images": {
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/images"
  }
}
```

**Configuration for a Remote Server asset source**
```js
"assets": {
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/assets"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Remote Server image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": false
  },
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/images"
  },
  "directory": {
    "enabled": false
  }
}
```

#### Local Filesystem

The [configuration file](x) contains two sections for configuring a Local Filesystem source. One section is for images and the other is for assets. Specifying image and asset settings separately allows you to use different filesystem locations for each one.

**Configuration for a Local Filesystem image source**
```js
"images": {
  "directory": {
    "enabled": true,
    "path": "path/to/your/images"
  }
}
```

**Configuration for a Local Filesystem asset source**
```js
"assets": {
  "directory": {
    "enabled": true,
    "path": "path/to/your/assets"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Local Filesystem image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": false
  },
  "remote": {
    "enabled": false
  },
  "directory": {
    "enabled": true,
    "path": "path/to/your/images"
  }
}
```