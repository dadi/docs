# DADI Web

## Routing

* [URL Rewriting](#url-rewriting-and-redirects)
* [Page Routing](#page-routing)
  * [Dynamic route segments](#dynamic-route-segments)
  * [Multi-route pages](#multi-route-pages)
  * [Route constraints](#route-constraints)
  * [Template URL Building](#template-url-building)

### URL Rewriting and Redirects

#### URL Rewrites File
```
^(.*[^/])$ $1/ [R=301,L]
^/books/(.*)$ /books?authorId=$1 [R=301,L]
```

forceLowerCase: "If true, converts URLs to lowercase and redirects"
forceTrailingSlash: "If true, adds a trailing slash to URLs and redirects"
stripIndexPages: "A set of filenames to remove from URLs. For example ['index.php', 'default.aspx']",

### Page Routing

> **Note:** DADI Web uses the [Path to Regexp](https://github.com/pillarjs/path-to-regexp) library when parsing routes. More information on parameter usage can be found in the Github repository.

A page's default route is a value matching the page name. For example if the page name is `books` the page will be available in the browser at `/books`. The page specification's route property becomes:

```js
"route": {
  "paths": ["/books"]
}
```

The `route.path` and `route.paths` properties allow customising the page's route to specify the URL(s) that match the page.

This property allows for an array of URL formats to enable multi-page routing. A value such as `"route": { "path": "/books" }` will be resolved at startup to `"route": { "paths": ["/books"] }`. Both forms are considered valid.

#### Dynamic route segments and named parameters

Routes may contain dynamic segments or named parameters which are resolved from the request URL and can be utilised by the datasources and events attached to the page.

For example a page with the route `/books/:title` will cause the page to be loaded for any request matching this format. DADI Web will extract the `:title` parameter and add it to the `req.params` object, making it available for use in the page's attached datasources and events.

The following URLs all match the above page's route:

URL       | Named Parameters        | Request Parameters         
---------------|----------------------|-----
/books/war-and-peace           |    :title = war-and-peace | ```req.params = { title: "war-and-peace" } ```
/books/sisters-brothers           |    :title = sisters-brothers | ```req.params = { title: "sisters-brothers" } ```

#### Using Request Parameters

See [Datasource Specification](datasource_specification.md) for more information regarding the use of named parameters in datasource queries.

#### Optional Parameters

Parameters can be made optional by adding a question mark `?`.

For example the route `/books/:page?` will match requests in both the following formats:

URL       | Named Parameters          | Request Parameters         
:---------------|:---------------------|------
/books ||
/books/2 | :page = 2 | ```req.params = { page: "2" } ```


#### Multi-route pages

```js
"route": {
  "paths": ["/people", "/people/:id"]
}
```

#### Route Constraints

An application may have more than one route that matches a particular URL, for example two routes that each have one dynamic segment:

```
/:genres
/:categories
```

In the case of ambiguous routes it is possible to provide DADI Web with a constraint function or datasource to check each matching route against some business logic or existing data.

> Returning `true` from a constraint instructs DADI Web that this is the correct route, the attached datasources and events should be run and the page displayed.

> Returning `false` from a constraint instructs DADI Web to try the next matching route (or return a 404 if there are no further matching routes).

Constraints for ambiguous routes are added as a property in the page specification file:

```js
"route": {
  "path": "/:people",
  "constraint": "nextIfNotPeople"
}
```

##### Constraint Functions

To add constraint functions, create a file in the `routes` folder (by default configured as `app/routes`). The file MUST be named `constraints.js`.

In the following example the route has a dynamic parameter `content`. The constraint function `nextIfNewsOrFeatures` will check the value of the `content` parameter and return `false` if it matches "news" or "features", indicating to DADI Web that the next matching route should be tried (or a 404 returned if there are no further matching routes).

_app/pages/movies.json_

```js
"route": {
  "paths": ["/movies/:content"],
  "constraint": "nextIfNewsOrFeatures"
},
```

_app/routes/constraints.js_

```js
module.exports.nextIfNewsOrFeatures = function (req, res, callback) {  
  if (req.params.content === 'news' || req.params.content === 'features') {
    return callback(false);
  }
  else {
    return callback(true);
  }
}
```

##### Constraint Datasources

An existing datasource can be used as the route constraint. The specified datasource must exist in `datasources` (by default configured as `app/datasources`). The following examples have some missing properties for brevity.

_app/pages/books.json_

```js
"route": {
  "paths": ["/:genre"],
  "constraint": "genres"
},
```

_app/datasources/genres.json_

```js
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
