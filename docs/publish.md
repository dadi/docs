---
title: Publish
order: 4
---

## Requirements

Microservices in the DADI platform are built on Node.js, a JavaScript runtime built on Google Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.

DADI follows the Node.js LTS (Long Term Support) release schedule, and as such the version of Node.js required to run DADI products is coupled to the version of Node.js currently in Active LTS. See the [LTS schedule](https://github.com/nodejs/LTS) for further information.

* **[Node.js](https://www.nodejs.org/)** (current LTS version)

Installing DADI Publish directly from NPM

All DADI platform microservices are also available from NPM. To add Publish to an existing project as a dependency:

```console
$ cd my-existing-node-app
$ npm install --save @dadi/publish
```

## Application Anatomy
### Pages
### Fields
### Filters
### Components

## Configuration

## First use
### Connecting to API
### Connecting to CDN

## ACL
### Managing users
### Password recovery

## Security
### SSL
SSL is currently disabled by default. 

Publish generates certificates automatically with [dadi/ssl](https://github.com/dadi/ssl), using [LetsEncrypt](https://letsencrypt.org/), the non-profit _free_ certificate authority. Certificates are renewed two days before expiry and do not require an app relaunch. To handle inbound challenge requests from the certificate authority, Publish opens port 80. All traffic other than requests from the CA are upgraded to 443.

When SSL is enabled, the port defined in environment config is ignored in favour of port 443. LetsEncrypt requires an email address for renewal notifications.

```json
 "server": {
    "host": "127.0.0.1",
    "port": 80,
    "ssl": {
      "enabled": true,
      "domains": ["somedomain.tech"],
      "email": "publish@somedomain.tech"
    }
  }
```

> **Note**
> 
> When SSL is enabled, all connected APIs must also run over SSL. Any insecure APIs will not be available in Publish.
> -- warning

### Authentication
### Storing user data

## How-to guides
### Creating a document
Publish interacts directly with any number of instances of [dadi/api](https://github.com/dadi/api). 

To create a document:
1. Select a collection from the collection menu and on the list view.
{Image of menu}
2. On the document list view, click the _Create New_ button to the top right of the document list table.

#### Validation

Validation rules are taken directly from the `validation` block in the collection config schema. 

**An example field in API**
```json
"fieldName": {
  "type": "String",
  "required": true,
  "label": "Title",
  "validation": {
    "minLength": 4,
    "maxLength": 20,
    "regex": {
      "pattern": "/[A-Za-z0-9]*/"
    }
  }
}
```

As you edit each field, Publish will identify any validation errors and display them clearly next to the field input.

Validation is also checked once more as a document is saved. 

If an invalid field is not part of the current selected tab (_see [tabs](#tabs) below_), a warning icon will appear on each tab containing one or more validation errors.

### Filtering documents
### Document actions
### Pagination

## Collaborative editing

## Performance

## Customisation

### Document sections

When there are a lot of fields in the collection schema, splitting the fields into _sections_ makes the interface less cluttered. Each section will appear as a _tab_ at the top of the document edit view. 

**Example section**
```json
"fieldName": {
  "type": "String",
  "required": true,
  "label": "Title",
  "publish": {
    "section": "Article",
    "placement": "main",
    "display": {
      "list": true,
      "edit": true
    }
  }
}
```

#### Document layout

Not all fields require a lot of room. You can decide to place fields in either the **main** view, or the **sidebar** depending on the size.

**Example placement setting**
```json
"fieldName": {
  "type": "String",
  "required": true,
  "label": "Title",
  "publish": {
    "section": "Article",
    "placement": "main"
  }
}
```

### Collection navigation groups

By default, the navigation menu will display collections in the order they are returned from the connected APIs. 

If a large number of menu entries becomes difficult to read, or two connected APIs contain a collection with matching names, you may want to group or order collections into sub-menus.

** Example menu layout**

```json
"apis": [
  {
    "name": "API 1",
    "host": "https://api.somedomain.tech",
    "port": 443,
    "database": "my-api",
    "version": "1.0",
    "credentials": {
      "clientId": "testClient",
      "secret": "superSecret"
    },
    "menu": [
      {
        "title": "Blog",
        "collections": [
          "articles"
        ]
      },
      "galleries"
    ]
  },
  {
    "name": "API 2",
    "host": "https://api.anotherdomain.tech",
    "port": 443,
    "database": "my-second-api",
    "version": "1.0",
    "credentials": {
      "clientId": "testClient",
      "secret": "superSecret"
    },
    "menu": [
      {
        "title": "Reviews",
        "collections": [
          "articles"
        ]
      },
      "books"
    ]
  }
]
```

## Extendibility
### Theming
### Custom fields
### App extensions
### Build process



