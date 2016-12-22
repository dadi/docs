---
title: Uploading Media
excerpt: Let CDN choose the recipe based on device, network, location or language
order: 9
---

API can be configured to accept file uploads, allowing you to store your file-based content along with your text-based content.
After a successful upload, API stores the file's associated metadata in an internal collection and returns an identifier that can be used to reference the file from another collection.

## Authentication

Media upload requests must be authenticated with a Bearer token supplied in an `Authorization` header along with the POST request. See the [Authentication](authentication) section for details on obtaining a token.

## File Storage

API ships with two file storage handlers, one for storing files on the local filesystem and the other for storing files in an Amazon S3 bucket. If you need access to the files from another application, for example DADI CDN, we recommend using the S3 option.

## Configuration

Media uploads are disabled by default. To enable uploads, add a `media` block to the [main configuration file](getting-started/configuration):

```json
"media": {
  "enabled": true,
  "storage": "disk",
  "basePath": "workspace/media",
  "pathFormat": "date"
}
```

|Property|Description|Default
|:--|:--|:---
|enabled|  | false
|collection|  | `"mediaStore"`
|storage| The storage handler to use. Determines where file uploads are stored. Possible values: `"disk"`, `"s3"`| `"disk"`
|basePath| When `"disk"` storage is used, `basePath` is either an absolute path or a path  relative to the directory where the application is run. When `"s3"` storage is used, `basePath` is a directory relative to the S3 bucket root.  | `"workspace/media"`
|pathFormat| xxx. Possible values: `"none"`, `"date"`, `"datetime"`, `"sha1/4"`, `"sha1/5"`, `"sha1/8"` | `"date"`|

### Available path formats

The `pathFormat` property determines the directory structure that API will use when storing files. This allows splitting files across many directories rather than storing them all in one directory. While this [isn't a problem when using S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html), when using the local filesystem storing a large number of files in one directory could negatively affect performance.

| Format | Description | Example
|:--|:--|:---
|`"none"`| Doesn't create a directory structure, storing all uploads directly in the `basePath` location |
|`"date"`| Creates a directory structure using parts derived from the current datetime | `2016/12/19/test.jpg`
|`"datetime"`| Creates a directory structure using parts derived from the current datetime | `2016/12/19/13/07/22/test.jpg`
|`"sha1/4"`| Splits SHA1 hash of the image's filename into 4 character chunks | `cb56/7524/77ca/e640/5f85/b131/872c/60d2/1b96/7c6a/test.jpg` |
|`"sha1/5"`| Splits SHA1 hash of the image's filename into 5 character chunks | `cb567/52477/cae64/05f85/b1318/72c60/d21b9/67c6a/test.jpg` |
|`"sha1/8"`| Splits SHA1 hash of the image's filename into 8 character chunks | `cb567524/77cae640/5f85b131/872c60d2/1b967c6a/test.jpg` |

### Configuring Amazon S3

If the S3 storage handler is used, an additional set of configuration properties are required as seen in the `s3` block below:

```json
"media": {
  "enabled": true,
  "storage": "s3",
  "basePath": "uploads",
  "pathFormat": "date",
  "s3": {
    "accessKey": "asdf4hdhh422ss",
    "secretKey": "agDo40XIoK7jPxOx3HU9Pl",
    "bucketName": "media"
  }
}
```

> **Security Note:** We don't recommend storing your AWS credentials in the configuration file. The `accessKey` and `secretKey` properties should instead be set as the environment variables `AWS_S3_ACCESS_KEY` and `AWS_S3_SECRET_KEY`.

## Filename clashes

If the filename of an file being uploaded is the same as an existing file, the new file will have it's name changed by adding the current timestamp:

* Existing filename: `test.jpg`
* New filename: `test-1480482847099.jpg`

## Uploading a file

To upload a file send a `multipart/form-data` POST to the media endpoint `/api/media`. On successful upload the file's metadata is returned as JSON, and includes an identifier that can be used to create a reference to the file from another collection.

### Uploading a file with cURL

```bash
curl -X POST
  -H "Content-Type: multipart/form-data"
  -H "Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe"
  -F "data=@test.jpg" "http://api.somedomain.tech/api/media"
```

### Uploading a file with Node.js

```js
var FormData = require('form-data')

var options = {
  host: 'api.somedomain.tech',
  port: 80,
  path: '/api/media',
  headers: {
    'Authorization': 'Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe',
    'Accept': 'application/json'
  }
}

var uploadResult

var form = new FormData()
form.append('file', fs.createReadStream(filePath))

form.submit(options, (err, response, body) => {
  if (err) return reject(err)

  response.on('data', (chunk) => {
    if (chunk) {
      uploadResult += chunk
    }
  })

  response.on('end', () => {
    // finished
    console.log(uploadResult)
  })
})
```

### Response

If successful, expect a response similar to the below examples.

#### Disk storage

```http
HTTP/1.1 201 Created
Server: DADI (API)
content-type: application/json
content-length: 305
Date: Mon, 19 Dec 2016 05:20:29 GMT
Connection: keep-alive

{
  "results":[
    {
      "fileName":"test.jpg",
      "mimetype":"image/jpeg",
      "width":1920,
      "height":1080,
      "path":"/Users/userName/api/workspace/media/2016/12/19/test.jpg",
      "contentLength":173685,
      "createdAt":1482124829485,
      "createdBy":"testClient",
      "v":1,
      "_id":"58576e1d5dd9975624b0d92c"
    }
  ]
}
```

#### Amazon S3 storage

```http
HTTP/1.1 201 Created
Server: DADI (API)
content-type: application/json
content-length: 305
Date: Mon, 19 Dec 2016 05:20:29 GMT
Connection: keep-alive

{
  "results":[
    {
      "fileName":"test.jpg",
      "mimetype":"image/jpeg",
      "width":1920,
      "height":1080,
      "path":"workspace/media/2016/12/19/test.jpg",
      "contentLength":173685,
      "awsUrl":"https://bucketName.s3.amazonaws.com/workspace/media/2016/12/19/test.jpg",
      "createdAt":1482124902978,
      "createdBy":"testClient",
      "v":1,
      "_id":"58576e72bafa53b625aebd4f"
    }
  ]
}
```

## Referencing files from another collection

Once a file is uploaded, it's identifier can be used to create a reference from another collection. For this example we have a collection called `books` with the following schema:

```json
{
  "fields": {
    "title": {
      "type": "String",
      "required": true
    },
    "content": {
      "type": "String",
      "required": true
    },
    "image": {
      "type": "Reference",
      "settings": {
        "collection": "mediaStore"
      }
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "compose": true,
    "sort": "title",
    "sortOrder": 1
  }
}
```

The `image` field is a Reference field which will lookup the `mediaStore` collection to resolve the reference. Having uploaded an image file and received it's metadata, we can now send a POST to the `books` collection with the image identifier.

```http
POST /1.0/library/books HTTP/1.1
Host: api.somedomain.tech
content-type: application/json
Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe

{
  "title": "Harry Potter and the Philosopher's Stone",
  "content": "Harry Potter and the Philosopher's Stone is the first novel in the Harry Potter series and J. K. Rowling's debut novel, first published in 1997 by Bloomsbury.",
  "image": "58576e72bafa53b625aebd4f"
}
```

A subsequent GET request for this book would return a response such as:

```
{
  "title": "Harry Potter and the Philosopher's Stone",
  "content": "Harry Potter and the Philosopher's Stone is the first novel in the Harry Potter series and J. K. Rowling's debut novel, first published in 1997 by Bloomsbury.",
  "image": {
    "fileName":"test.jpg",
    "mimetype":"image/jpeg",
    "width":1920,
    "height":1080,
    "path":"workspace/media/2016/12/19/test.jpg",
    "contentLength":173685,
    "awsUrl":"https://bucketName.s3.amazonaws.com/workspace/media/2016/12/19/test.jpg",
    "createdAt":1482124902978,
    "createdBy":"testClient",
    "v":1,
    "_id":"58576e72bafa53b625aebd4f"
  }
}
```