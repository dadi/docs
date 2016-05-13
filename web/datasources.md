# DADI Web

## Datasources

### Overview

DADI Web.

* [Datasource Specification](#datasource-specification)
* [Caching](#caching)

```
my-web/
  app/
    datasources/      
      books.json      # a datasource specification
    events/           
    pages/            
```

### Datasource Specification

#### Example datasource specification


```
{
  "datasource": {
    "key": "books",
    "name": "Books datasource",
    "source": {
      "endpoint": "1.0/library/books"
    },
    "paginate": true,
    "count": 5,
    "sort": { "name": 1 },
    ],
    "filter": {},
    "fields": {}
  }
}
```

```
{
  "datasource": {
    "key": "books",
    "name": "Books datasource",
    "source": {
      "type": "remote",
      "protocol": "http",
      "host": "api.example.com",
      "port": "80",
      "endpoint": "1.0/library/books"
    },
    "caching": {
      "enabled": true,
      "ttl": 300,
      "directory": "./cache/web/",
      "extension": "json"
    },
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
    "paginate": true,
    "count": 5,
    "sort": { "name": -1 },
    "filter": {},
    "fields": {"title": 1, "author_id": 1},
    "requestParams": [
      { "param": "title", "field": "title" }
    ]
  }
}
```

```
{
  "datasource": {
    "key": "books",
    "name": "Books datasource",
    "source": {
      "type": "remote",
      "protocol": "http",
      "host": "api.example.com",
      "port": "80",
      "endpoint": "1.0/library/books"
    },
    "caching": {
      "enabled": true,
      "ttl": 300,
      "directory": "./cache/web/",
      "extension": "json"
    },
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
    "paginate": true,
    "count": 5,
    "sort": { "name": -1 },
    "filter": {},
    "fields": {"title": 1, "author_id": 1},
    "requestParams": [
      { "param": "title", "field": "title" }
    ]
  }
}
```

#### Property Description

###### Section: `datasource`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
key           | Short identifier of the datasource. This value is used in the page specification files to attach a datasource   |               | books
name           | This is the name of the datasource, it will be displayed on the front-end of the gui   |               | Books
paginate           |    | true              | true
count           | Number of items to return from the endpoint per page. If set to '0' then all results will be returned    | 20              | 5
sort           | A JSON object with fields to order the result set by | {} // unsorted     | `{ "title": 1 } // sort by title ascending`, `{ "title": -1 } // sort by title descending`
filter           | A JSON object containing a MongoDB query  |               | { "SaleDate" : { "$ne" : null} }
filterEvent           | An event file to execute which will generate the filter to use for this datasource. The event must exist in the configured events path  |               | "getBookFilter"
fields           | Limits the fields to return in the result set   |               | { "title": 1, "author": 1 }
requestParams           | An array of parameters the datasource can accept from the querystring   |               | [ { "param": "author", "field": "author_id" } ]

###### Section: `datasource.source`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
type           | (optional) Determines whether the data is from a remote endpoint or local, static data   | "remote"              | "remote", "static"       
protocol           | (optional) The protocol portion of an endpoint URI   | "http"              | "http", "https"
host           | (optional) The host portion of an endpoint URL   | The main config value `api.host`              | "api.example.com"
port           | (optional) The port portion of an endpoint URL   | The main config value `api.port`  | "3001"
endpoint           | The path to the endpoint which contains the data for this datasource   |               | "/1.0/news/articles"       

###### Section: `datasource.caching`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
enabled           | Sets caching enabled or disabled   | enabled              | enabled
ttl           |    |               |        
directory           | The directory to use for storing cache files, relative to the root of the application   |               | "./cache"
extension           | The file extension to use for cache files   |               |  "json"

###### Section: `datasource.auth`

 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
type           |    |               | bearer
host           |    |               | api.example.com       
port           |    |               | 3000
tokenUrl           |    |               |     "/token"   
credentials           |    |               |        { "clientId": "test123", "secret": "superSecret" }

#### Passing parameters with `requestParams`

`requestParams` is an array of parameters that the datasource can accept from the querystring.
Used in conjunction with the `route` property in the page specification, this allows
filters to be generated for querying the collection.

**Page specification**
```js
"route": {
  "path": "/books/:title"
}
```

**Datasource specification**
```js
"source": {
  "endpoint": "1.0/library/books"
},
"requestParams": [
  { "field": "title", "param": "title" }
]
```

| field | param
|--|---
| The collection field to filter on | The request parameter to use as the value for the filter, This must match a named parameter in the page specification's `route` property

###### For example, given a collection `books` with the fields `_id`, `title`

With the page route `/books/:title` and the above datasource configuration, DADI Web will extract the `:title` parameter from the URL and use it to query the `books` collection using the field `title`.

With a request to http://www.example.com/books/sisters-brothers, the named parameter `:title` is `sisters-brothers`. A filter query is constructed for DADI API using this value.

The query passed to the API is: `{ "title" : "sisters-brothers" }`

| Page Route |  Datasource requestParams | URL | req.params | Query
|--|---|---|----|---
| `/books/:title` | ```"requestParams": [ { "param": "title", "field": "title" } ]``` | http://www.example.com/books/sisters-brothers | `{ 'title': 'sisters-brothers' }` | `db.books.find({ 'title': 'sisters-brothers' })`

See [Routing](https://github.com/dadi/web/blob/docs/docs/pages.md#routing) for detailed routing documentation.

#### Chaining datasources

It is often a requirement to query a datasource using data already loaded by another datasource. DADI Web supports this through the use of chained datasources. Chained datasources are executed after all non-chained datasources.

Add a `chained` property to the datasource that relies on data loaded by another datasource.

_Simple field replacement_

```js
"chained": {
  "datasource": "books",              // the primary (non-chained) datasource that this datasource relies on
  "outputParam": {
    "param": "results.0.author_id",  // the path to the value this datasource will use as a filter
    "field": "_id"                   // the filter property to use for this datasource
  }
}
```

_Filter replacement_

```js
"filter": ["{books}",{"$group":{"_id":{"genre":"$genre"}}}],
"chained": {
  "datasource": "books",
  "outputParam": {
    "param": "results.0.genre_id",
    "type": "Number",
    "query": {"$match":{"genre_id": "{param}"}}
  }
}
```

| x | x | x
|--|--|--
| datasource | Should match the `key` property of the primary datasource. |
| outputParam.param | The `param` value specifies where to locate the output value in the results returned by the primary datasource. |
| outputParam.field | The `field` value should match the MongoDB field to be queried. The `type` value indicates how the `param` value should be treated (currently only "Number" is supported). |
| outputParam.query | The `query` property allows more advanced filtering, see below for more detail.   |

###### For example

On a page that displays a car make and all it's associated models, we have two datasources querying two collections, __makes__ and __models__.

** Collections **

* __makes__ has the fields `_id` and `name`
* __models__ has the fields `_id`, `makeId` and `name`

** Datasources **

* The primary datasource, `makes` (some properties removed for brevity)

```
{
  "datasource": {
     "key": "makes",
     "source": {
       "endpoint": "1.0/car-data/makes"
     },
     filter: { "name": "Ford" }
   }
}
```

The result of this datasource will be:

```
{
  "results": [
    {
      "_id": "5596048644713e80a10e0290",
      "name": "Ford"
    }
  ]
}
```

To query the models collection based on the above data being returned, add a `chained` property to the models datasource specifying `makes` as the primary datasource:

```
{
  "datasource": {
     "key": "models",
     "source": {
       "endpoint": "1.0/car-data/models"
     },
      "chained": {
        "datasource": "makes",
        "outputParam": {
          "param": "results.0._id",
          "field": "makeId"
        }
      }
   }
}
```
In this scenario the **models** collection will be queried using the value of `_id` from the first document of the `results` array returned by the **makes** datasource.

If your query parameter must be passed to the endpoint as an integer, add a `type` property to the `outputParam` specifying `"Number"`.
```
{
  "datasource": {
     "key": "models",
     "source": {
       "endpoint": "1.0/car-data/models"
     },
     "chained": {
        "datasource": "makes",
        "outputParam": {
          "param": "results.0._id",
          "type": "Number",
          "field": "makeId"
        }
      }
   }
}
```

###### Filter replacement

```js
"filter": ["{capRangeByUrlModel}",{"$group":{"_id":{"fuelType":"$fuelType"}}}],
"chained": {
  "datasource": "capRangeByUrlModel",
  "outputParam": {
    "param": "results.0.capRanId",
    "type": "Number",
    "query": {"$match":{"capRanId": "{param}"}}
  }
}
```

### Caching

[TODO]
