---
title: Pre-signed URLs
excerpt: Allow access to private S3 objects
order: 9
---

A pre-signed URL allows you to give one-off access to users who may not have direct access to the file.
Pre-signing generates a valid URL signed with your credentials that any user can access.

## Generating a pre-signed URL

To generate a simple pre-signed URL that allows any user to view the contents of a private object in a bucket you own,
you can use the following call to `getSignedUrl`:

```js
var AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: '<your-access-key-id>',
  secretAccessKey: '<your-secret-access-key>'
})

var params = {
  Bucket: '<your-bucket-name>',
  Key: '<your-filename>'
}

var s3 = new AWS.S3()

s3.getSignedUrl('getObject', params, function (err, url) {
  console.log("The URL is", url)
})
```

The above should result in a response similar to this:

```bash
The URL is https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D
```

## Controlling `Expires` time

The default `Expires` time is 15 minutes. This can be modified by passing a value in the
params that are passed to the `getSignedUrl` method. The following example will cause the
signed URL to expire after 60 seconds.

```js
var params = {
  Bucket: 'myBucket',
  Key: 'myKey',
  Expires: 60 // expire time, in seconds
}
```

## Accessing via CDN

http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D

## Adding image manipulation parameters

When requesting images from external URLs it is possible they have an existing querystring. To
add CDN image manipulation parameters to an external URL, they must be added to the existing querystring.

The following example uses the above URL, adding `width` and `height` parameters.

> Notice that we've added the parameters as part of the existing querystring by including an ampersand before the CDN querystring begins:

>...W6blQuGQ%3D**&?**width=300&height=300

http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D&?width=300&height=300

## Expired URLs

If a pre-signed URL has already expired at the time of the request, a HTTP 403 Forbidden error will be returned:

```json
{"statusCode":"403","message":"Forbidden: http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D"}
```
