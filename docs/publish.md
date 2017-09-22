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

### Authentication
### Storing user data

## How-to guides
### Creating a document
#### Validation
#### Tabs
#### Page sections
### Filtering documents
### Document actions
### Pagination

## Collaborative editing

## Performance

## Customisation
### Tabs
### Menu ordering

## Extendibility
### Theming
### Custom fields
### App extensions
### Build process


