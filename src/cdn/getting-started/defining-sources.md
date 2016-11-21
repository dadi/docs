---
title: Defining sources
---

_CDN_ can load images from a local relative directory, an Amazon Web Services S3 account or from a remote server  


```json
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
}
```