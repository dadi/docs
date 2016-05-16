---
title: Configuration API
---

## Configuration API

### Overview

DADI API allows creating and updating collection and custom endpoints by sending a POST request to the API.

### Collection Endpoints

#### Creating a new collection

A new collection can be created by sending a POST request using the URL format below. The body of the request should be a JSON string containing the collection specification.

**Note:** This operation requires client credentials with `accessType: "admin"`.

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/config`

**Example Request**
```
POST /1.0/library/books/config HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65

{
  "fields": {
    "field1": {
      // field specification
    },
    "field2": {
      // field specification
    }
  },
  "settings": {
    // collection settings and defaults
  }
}
```

_**WARNING**: If the version, database and collection already exist, the request will overwrite the existing specification_

Validation is performed against schema updates to ensure that the minimum viable structure is present and correct.

#### Updating an existing collection

An existing collection can be updated by sending a POST request to the `/config` endpoint. The body of the request should be a JSON string containing the new collection specification.

**Note:** This operation requires client credentials with `accessType: "admin"`.

See the example request in the above section [Creating a new collection](#creating-a-new-collection).

#### Deleting a collection

You may remove a collection endpoint by sending a DELETE request to the collection's `/config` endpoint.

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/config`

**Example Request**
```
DELETE /1.0/library/books/config HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

#### Viewing a Collection Specification

An existing collection's specification can be viewed by sending a GET request to the `/config` endpoint of an existing collection. The response will contain a JSON string containing the collection specification.

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/config`

**Example Request**
```
GET /1.0/library/books/config HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

**Example Response**
```
{
  "fields": {
    "field1": {
      // field specification
    },
    "field2": {
      // field specification
    }
  },
  "settings": {
    // collection settings and defaults
  }
}

```

### Custom Endpoints

A new custom endpoint can be created by sending a POST request using the URL format below. The body of the request should be plain text containing the Javascript code for the endpoint.

**Note:** This operation requires client credentials with `accessType: "admin"`.

**URL Format:** `http(s)://{url}/{version}/{endpoint}/config`

**Example Request**
```
POST /1.0/booksByAuthor/config HTTP/1.1
Host: api.example.com
Content-Type: text/plain
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65

module.exports.get = function (req, res, next) {
   res.setHeader('content-type', 'application/json');
   res.statusCode = 200;
   res.end(JSON.stringify({message: 'Hello World'}));
};
```

_**WARNING**: the content of this request will be evaluated on the server: if a malicious user obtains a valid token they will be able to execute arbitrary Javascript. Take care to fully secure your API in production environments_

Following the successful creation of the custom endpoint, it is possible to send a GET request to confirm it is working:

**Example Request**
```
GET /1.0/booksByAuthor HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

**Example Response**

```
{message: 'Hello World'}
```


### Main API Configuration

**Note:** The two operations below require client credentials with `accessType: "admin"`. See [Authorisation](https://github.com/dadi/api/blob/docs/docs/auth.md) for more information regarding the permissions required for working with the main configuration.

#### Viewing the API configuration

DADI API allows users with appropriate permissions to view the current configuration by sending a GET request to the `/api/config` endpoint.

**Example Request**
```
GET /api/config HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

#### Updating the API configuration

DADI API allows users with appropriate permissions to update the main configuration by sending a POST request to the `/api/config` endpoint.

The body of the request should be a JSON string containing the new configuration settings.

```
This may contain only a partial update, i.e. if the requesting agent doesnt want to update the database they can still update the caching config by just sending the cache JSON.
```

**Example Request**
```
POST /api/config HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer 171c8c12-6e9b-47a8-be29-0524070b0c65
```

_Note: for updated configuration to take affect, the API instance will need to be restarted_
