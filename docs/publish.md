---
title: Publish
order: 4
published: true
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

{To-Do}

### App

{To-Do}
### Components

{To-Do}
#### Views

{To-Do}
#### Containers

{To-Do}
#### Components

{To-Do}

## Configuration

{To-Do}

## First use

Before running Publish, you will need:
- At least one running API.
- An auth API with the [required auth hook and collection](#publish/authentication) (can be the same as one of your other APIs). 
- An admin user. (See [Creating a user](#publish/creating-a-user))

### Connecting to API

To connect to an API, make sure your @dadi/api install is running, then add one or more APIs to your environment config

```json
"apis": [
  {
    "name": "My API",
    "host": "https://api.somedomain.tech",
    "port": 443,
    "database": "my-api",
    "version": "1.0",
    "credentials": {
      "clientId": "testClient",
      "secret": "secretSquirrel"
    }
  }
]
 ```

### Managing users

Users are currently managed in API. To add a user, send the user credentials to the users collection. See [Creating a user](#publish/creating-a-user) how-to guide.

> **Note**
> 
> You must have the required hooks and collection in order to insert and authorise users.
> -- warning

### Password recovery

{To-Do}

## Security

{To-do}

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

## How-to guides

{To-do}

### Authentication

Authentication is currently handled with a hook and collection in the current connected api. To install these required files, run the following from your publish directory

```shell
NODE_ENV=development npm explore @dadi/publish -- npm run api-install --configDir=/path/to/config/directory
```

> **Note**
> 
> If the api does not contain these required files it will not be able to handle authentication. 
> -- warning

### Creating a user

{To-do}

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

If an invalid field is not part of the current selected tab (_see [tabs](#publish/tabs) below_), a warning icon will appear on each tab containing one or more validation errors.

### Filtering documents

{To-do}

### Document selection

For individual document selection a checkbox to the left of the document can be toggled. To toggle select on an entire page, click the checkbox in the table header, to the far left. 

Document selection is retained even during [Pagination](#publish/document-pagination). This means that [Batch actions](#publish/batch-document-actions) will be applied to documents that aren't currently in view.

### Batch Document actions

Some basic document tasks can be performed on the list view. By default, **Delete** is the only option.

> **Note**
> 
> Other batch actions will be made available soon. These will include actions for _Boolean_ fields, and other types that can be updated without input.
> -- advice

### Document Pagination

If a collection contains more than the pagination limit (20 by default), page buttons will appear under the document list. 

## Collaborative editing

The first component of collaborative editing is already availble. This will show you other editors that are currently viewing the same document.

> **Note**
> 
> Future collaborative features include _multi-user editing_, _in-document messaging_ and _revision history_.
> -- advice

## Performance

Publish is a web-app. This means that after the first page load, all subsequent pages are rendered in the browser, and the only requests to the server are for data and images.

## Customisation

The Publish app can be customised to optomize user experience, and add a personal touch to your organisation.

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
### Hidden fields

To hide a field from either **list** or **edit** view, add each property to a **publish.display** block in the field schema.

**Example hidden field settings**
```json
"fieldName": {
  "type": "String",
  "required": true,
  "label": "Title",
  "publish": {
    "display": {
      "edit": true,
      "list": false
    }
  }
}
```

### Hidden collections

If an enire collection needs to be hidden, add **hidden** to the collections **settings.publish** block.

**Example hidden collection settings**
```json
{
  "fields": {
    "fieldName": {
      "type": "String",
      "required": true,
      "label": "Title",
      "publish": {
        "display": {
          "edit": true,
          "list": false
        }
      }
    }
  },
  "settings": {
    "publish": {
      "hidden": true
    }
  }
}
```

### Build process

When you install the Publish app directly from npm, a _post-install_ script runs automatically, and builds the **bundle.js**, and **main.css** required to run the app. This process only needs to happen when the app installs or is updated.



