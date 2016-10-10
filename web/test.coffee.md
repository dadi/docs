
### Meta

namename namenamename namenamenamenamename namenamename

    "datasource": {
      "key": "books",
      "name": "Books datasource",

### Source

Tells Web where to get the data for this datasource.
 * **type**: (optional) determines whether the data is from a remote endpoint or local, static data.
  * **default**: "remote"
 * **protocol**: (optional) the protocol to use when requesting data from the endpoint.
  * **default**: "http"
  * **options**: "http", "https"
 * **host**: (optional) the hostname or IP address for the endpoint.
  * **default**: the main configuration value `api.host`
  * **example**: "api.example.com"
 * **port**: (optional) the port the endpoint is running on.
  * **default**: the main configuration value `api.port`
  * **example**: 3000
 * **endpoint**: the path to the endpoint which contains the data for this datasource.
  * **example**: "/1.0/news/articles"

    "source": {
      "type": "remote",
      "protocol": "http",
      "host": "api.example.com",
      "port": "80",
      "endpoint": "1.0/library/books"
    },

### Caching

Controls caching of results for the datasource.
 * **enabled**: (optional) determines whether the data is from a remote endpoint or local, static data.
  * **default**: "remote"
 * **ttl**: (optional) the protocol to use when requesting data from the endpoint.
  * **default**: "http"
  * **options**: "http", "https"
 * **host**: (optional) the hostname or IP address for the endpoint.
  * **default**: the main configuration value `api.host`
  * **example**: "api.example.com"
 * **port**: (optional) the port the endpoint is running on.
  * **default**: the main configuration value `api.port`
  * **example**: 3000
 * **endpoint**: the path to the endpoint which contains the data for this datasource.
  * **example**: "/1.0/news/articles"

    "caching": {
      "enabled": true,
      "ttl": 300,
      "directory": "./cache/web/",
      "extension": "json"
    },

### Authentication

Details for authenticating the request to the datasource endpoint. If not specified, the datasource
is assumed to be using the same authentication scheme as set in the main configuration file. See [TODO](#).

    "auth": {
      "type": "bearer",
      "host": "api.example.com",
      "port": "80",
      "tokenUrl": "/token",
      "credentials": {
        "clientId": "testClient",
        "secret": "superSecret"
      }
    },

### Limit the results

Specify the number of results to return from the datasource endpoint.

    "count": 5,

### Default sorting

The fields to order the result set by. Use `{}` to return the results unsorted. To sort ascending use `1` and to sort
descending use `-1`. **Examples:** `{ "title": 1 }`, `{ "title": -1 }`

    "sort": { "title": 1, "publicationDate": -1 },

### Default filter

A set of filters to pass to the datasource endpoint. Any `requestParams` are added to this filter at the time of
the request. See [TODO](#).

    "filter": { "published": true },

### Return fields

The fields to return in the result set. Use `{}` to return all fields. To include a field use `1` and to exclude use `-1`.

    "fields": {"title": 1, "author": 1},

### Request Parameters

`requestParams` is an array of parameters that the datasource can accept from the querystring.
Used in conjunction with the `route` property in the page specification, this allows
filters to be generated from the URL for querying the endpoint. See [TODO](#).

    "requestParams": [
      { "param": "title", "field": "title" }
    ]

### Chaining datasources

It is often a requirement to query a datasource using data already loaded by another datasource.
DADI Web supports this through the use of chained datasources. See [TODO](#).

    "chained": {
      "datasource": "books",              // the primary (non-chained) datasource that this datasource relies on
      "outputParam": {
        "param": "results.0.author_id",  // the path to the value this datasource will use as a filter
        "field": "_id"                   // the filter property to use for this datasource
      }
    }
