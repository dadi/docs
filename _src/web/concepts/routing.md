---
title: Routing
---

# Routing

Routing allows you to define URL endpoints for your application and control how Web responds to client requests.

* [Basic Routing](#basic-routing)
* [Page Routing](#page-routing)
  * Dynamic route segments and named parameters
      * [Optional Parameters](#optional-parameters)
      * [Parameter Format](#parameter-format)
* [Multiple Route Pages](#multiple-route-pages)
* [Route Priority](#route-priority)
* [Route Validation](#route-validation)
  * [Parameter Validation](#parameter-validation)
      * Preloaded data (`preload`)
      * Static array test (`in`)
      * Datasource lookup (`fetch`)
  * [Route Constraint Functions]
      * Constraint Datasources (deprecated)
  * [Template URL Building](#template-url-building)
  * [Using Request Parameters](#using-request-parameters)
* [URL Rewriting and Redirects](#url-rewriting-and-redirects)
  * forceLowerCase
  * forceTrailingSlash
  * stripIndexPages
  * URL Rewrites File
* [Migrating to Version 1.7.0](#migrating-to-version-1-7-0)

### Basic Routing

Adding routes provides URLs for interacting with the application. A route specified as `/contact-us`, for example, will make a URL available to your end users as `http://www.example.com/contact-us`.

### Page Routing

For every page added to your application, a `route` is created by default. A page's default route is a value matching the page name. For example if the page name is `books` the page will be available in the browser at `/books`.

To make the `books` page reachable via a different URL, simply add (or modify) the page's `routes` property:

```json
{
  "routes": [
    {
      "path": "/books/all"
    }
  ]
}
```


**Note: for DADI Web prior to version 1.7.0**

In earlier versions of DADI Web, the syntax for defining routes was slightly different. Instead of a `routes` property defined as an array, we used a `route` property (notice the plural vs singular forms) containing an array of paths. This format is still valid in versions prior to 1.7.0. In 1.7.0 and above, this format will be resolved at startup to match the required format.

For example, starting in 1.7.0, a value such as `"route": { "path": "/books" }` will be resolved at startup to `"routes": [ { "path": "/books" } ]`.

Should you have existing page routes in this format `"route": "/books"`, [please see the note](#migrating-to-version-1.7.0) at the end of this page.

#### Dynamic route segments and named parameters

Routes may contain dynamic segments or named parameters which are resolved from the request URL and can be utilised by the datasources and events attached to the page.

A route segment with a colon at the beginning indicates a dynamic segment which will match any value. For example, a page with the route `/books/:title` will be loaded for any request matching the format. DADI Web will extract the `:title` parameter and add it to the `req.params` object, making it available for use in the page's attached datasources and events.

The following URLs match the above route, with the segment defined by `:title` extracted, placed into `req.params` and accessible via the property `title`.

URL       | Named Parameter `:title`        | Request Parameters `req.params`         
---------------|----------------------|-----
/books/war-and-peace           |    `war-and-peace` | `{ title: "war-and-peace" }`
/books/sisters-brothers           |    `sisters-brothers` | `{ title: "sisters-brothers" }`

##### Optional Parameters

Parameters can be made optional by adding a question mark `?`.

For example the route `/books/:page?` will match requests in both the following formats:

URL   |  Matched?    | Named Parameters          | Request Parameters `req.params`         
:---------------|:------|:---------------------|------
/books  | Yes|| `{}`
/books/2 | Yes | `:page` | `{ page: "2" }`

##### Parameter Format

Specifying a format for a parameter can help Web identify the correct route to use. We can use the same example as above, where the URL has an optional `page` parameter. If we add a regular expression to this parameter indicating that it should only match numbers, any URL that doesn't contain numbers in this segment will not match the route.

**Example**

The route `/books/:page(\\d+)` will only match a URL that has `books` in the first segment and a number in the second segment:

URL | Matched? | Named Parameters  | Request Parameters `req.params`         
:---------------|:--------|:---------------------|------
/books/war-and-peace | No ||
/books/2 | Yes | `:page` | `{ page: "2" }`


> **Note:** DADI Web uses the [Path to Regexp](https://github.com/pillarjs/path-to-regexp) library when parsing routes and parameters. More information on parameter usage can be found in the Github repository.


### Multiple Route Pages

The `routes` property makes it easy for you to define "multiple route" pages, where one page specification can respond to requests for multiple routes.

**DADI Web versions >= 1.7.0**

DADI Web 1.7.0 introduced a more explicit way of specifying multiple routes per page . The `route` property has been replaced with `routes` which should be an Array of route objects.

Each route object must contain, at the very least, a `path` property. At startup, Web adds the value of each `path` property to an internal collection of routes for matching incoming requests.

In this example, the same page (and therefore it's template) will be loaded for requests matching any of the formats specified by the `path` properties:

```json
{
  "routes": [
    {
      "path": "/movies/:title"
    },
    {
      "path": "/movies/news/:title?/"
    },
    {
      "path": "/movies/news/:page?/"
    }
  ]
}
```

**DADI Web versions < 1.7.0**

```json
{
  "route": {
    "paths": ["/people", "/people/:id"]
  }
}
```

### Route Priority

DADI Web sorts your routes into a priority order so that the most likely matches are easier to find.

* In Web, the most important parts of a route are the static segments, or rather the non-dynamic segments, for example `/books`. The more static segments in a route the its priority.

* The second most important parts are the mandatory dynamic segments, for example `/:title`.

* The least important parts are the optional dynamic segments, for example `/:year?`.

* Any route with a `page` parameter gets a slight edge, with 1 point being added to its priority.

| Path | Priority
|:---|:---------
`/movies/news/:page(\\d+)?/` |  12
`/movies/reviews/:page(\\d+)?` |  12
`/movies/features/:page(\\d+)?/` |  12
`/movies/news/:title?/` |  11
`/movies/features/:title?/` |  11
`/movies/reviews/` |  10
`/movies/:title/:page(\\d+)?` |  9
`/movies/:title/:content?` |  8
`/movies/` |  5

### Route Validation

An application may have more than one route that matches a particular URL, for example two routes that each have one dynamic segment:

```
/:genres
/:categories
```
In this case it is possible to provide DADI Web with some rules for determining the correct routes based on the parameters in the request. Parameter checks currently supported are:

* `preload` - tests the parameter value exists in a set of preloaded data
* `in` - tests the parameter value exists in an array of static values  
* `fetch` - performs a datasource lookup using the parameter value as a filter

#### Parameter Validation

##### Preloaded data (`preload`)

To validate parameters against preloaded data, you first need to configure Web to preload some data. Add a block to the [main configuration](configuration.md) file like the example below, using your datasource names in place of "channels":

```json
{
  "data": {
    "preload": [
      "channels"
    ]
  }
}
```

```json
{
  "routes": [
    {
      "path": "/:channel/news/",
      "params": [
        {
          "param": "channel",
          "preload": {
            "source": "channels",
            "field": "key"
          }
        }
      ]
    }
  ]
}
```

##### Static array test (`in`)

```json
{
  "routes": [
    {
      "path": "/movies/:title/:subPage?/",
      "params": [
        {
          "param": "subPage",
          "in": ["review"]
        }
      ]
    }
  ]
}
```

##### Datasource lookup (`fetch`)

```json
{
  "routes": [
    {
      "path": "/movies/:title/:content?/",
      "params": [
        {
          "fetch": "movies"
        }
      ]
    }
  ]
}
```

#### Route Constraint Functions

In the case of ambiguous routes it is possible to provide DADI Web with a constraint function to check each matching route against some business logic or existing data.

> Returning `true` from a constraint instructs DADI Web that this is the correct route, the attached datasources and events should be run and the page displayed.

> Returning `false` from a constraint instructs DADI Web to try the next matching route (or return a 404 if there are no further matching routes).

Constraints are added as a route property in the page specification file:

```json
{
  "routes": [
    {
      "path": "/:people",
      "constraint": "nextIfNotPeople"
    }
  ]
}
```

To add constraint functions, create a file in the `routes` folder (by default configured as `app/routes`). The file **MUST** be named `constraints.js`.

In the following example the route has a dynamic parameter `subPage`. The constraint function `nextIfNewsOrFeatures` will check the value of the `subPage` parameter and return `false` if it matches "news" or "features", indicating to DADI Web that the next matching route should be tried (or a 404 returned if there are no further matching routes).

_app/pages/movies.json_

```json
{
  "routes": [
    {
      "path": "/movies/:subPage",
      "constraint": "nextIfNewsOrFeatures"
    }
  ]
}
```

_app/routes/constraints.js_

```js
module.exports.nextIfNewsOrFeatures = function (req, res, callback) {  
  if (req.params.subPage === 'news' || req.params.subPage === 'features') {
    return callback(false)
  }
  else {
    return callback(true)
  }
}
}
```

##### Constraint Datasources

> **Note:** Deprecated in Version 1.7.0

An existing datasource can be used as the route constraint. The specified datasource must exist in `datasources` (by default configured as `app/datasources`). The following examples have some missing properties for brevity.

app/pages/books.json

```json
{
  "route": {
    "paths": ["/:genre"],
    "constraint": "genres"
  }
}
```

app/datasources/genres.json

```json
{
  "datasource": {
    "key": "genres",
    "name": "Genre datasource",
    "source": {
      "endpoint": "1.0/library/genres"
    },
    "count": 1,
    "fields": { "name": 1, "_id": 0 },
    "requestParams": [
      { "param": "genre", "field": "title" }
    ]
  }
}

```

In the above example a request for `http://www.example.com/crime` will call the `genres` datasource, using the `requestParams` to supply a filter to the endpoint. The request parameter `:genre` will be set to `crime` and the resulting datasource endpoint will become:

```
/1.0/library/genres?filter={"title":"crime"}
```

If there is a result for this datasource query, the constraint will return `true`, otherwise `false`.


#### Template URL Building

Using `toPath()`:

```js
var app = require('dadi-web');
var page = app.getComponent('people');
var url = page.toPath({ id: '1234' });
```

```
"/person/1234"
```

#### Using Request Parameters

See [Datasource Specification](datasource_specification.md) for more information regarding the use of named parameters in datasource queries.



### URL Rewriting and Redirects

#### forceLowerCase

With this property set to true, Web converts incoming URLs to lowercase and sends a 301 Redirect response to the browser with the lowercased version of the URL.

```js
{
  "forceLowerCase": true
}
```

#### forceTrailingSlash

With this property set to true, Web adds a trailing slash to incoming URLs and sends a 301 Redirect response to the browser with the new version of the URL.

```js
{
  "forceTrailingSlash": true
}
```

#### stripIndexPages

This property accepts an array of filenames to remove from URLs. Useful for when you're migrating from another system and search engines may have indexed URLs containing legacy files. For example `http://legacy-web.example.com/index.php`


```js
{
  "stripIndexPages": ["index.php", "default.aspx"]
}
```

#### URL Rewrites File
```
^(.*[^/])$ $1/ [R=301,L]
^/books/(.*)$ /books?authorId=$1 [R=301,L]
```

### Migrating to Version 1.7.0

To help you migrate your Web installation to v1.7.0, the router will inform you of any changes required to page specifications if the existing `route` property has not yet been modified.

Look out for console messages similar to the following:

```
The `route` property for pages has been extended to provide better routing functionality.
Please modify the route property for page 'movies_news'. The schema should change to the below:

{
  "page": {
    "name": "movies_news",
    "description": "movies news",
    "language": "en"
  },
  "settings": {
    "cache": true
  },
  "datasources": [],
  "events": [],
  "routes": [
    {
      "path": "/movies/news/:furl?/"
    }
  ]
}
```