---
title: Pages
layout: default.html
---

# Introduction

A `page` on your website consists of two files within your application's file structure: a Page Specification and a Template.

Page Specifications exist as JSON files in your application's `pages` folder. The location of this folder is [configurable](/web/getting-started/configuration/), but defaults to `workspace/pages`.

```bash
your-project/
  workspace/
    datasources/      # datasource specifications
    events/           # event files
    pages/            # page specifications        
      people.dust     # page template file
      people.json     # page specification file
```

## Basic Page Configuration

```js
{
  "page": {
    "name": "People",
    "description": "A page for displaying People records.",
    "language": "en"
  },
  "datasources": [ ],
  "events": [ ]
}
```

## Advanced Page Configuration

```js
{
  "page": {
    "name": "People",
    "description": "A page for displaying People records.",
    "language": "en"
  },
  "settings": {
    "cache": true,
    "beautify": true,
    "keepWhitespace": true,
    "passFilters": true
  },
  "routes": [
    {
      "path": "/people"
    }
  ],
  "contentType": "text/html",
  "template": "people.dust",
  "datasources": [
    "allPeople"
  ],
  "requiredDatasources": [
    "allPeople"
  ],
  "events": [
    "processPeopleData"
  ]  
  "preloadEvents": [
    "geolocate"
  ],
}
```

## Configuration Properties

Property    |   Description        |  Type        | Default         
------------|----------------|------------------|----------------
**page**|        ||
 page.name          || String |
 page.key           || String |
 page.description   || String |
**settings** |   ||
 settings.cache         || Boolean | `false`
 settings.beautify      || Boolean | `false`
 settings.keepWhitespace    || Boolean | If the global config has a setting for `dust.whitespace` that is used as the default, otherwise `true`
 settings.passFilters    || Boolean | `false`
**route**   |  | |
 paths  | An array of routes that this page will respond to | Array | `[/pageName]`
 constraint | An optional function to execute to determine if the current URL matches this page | String |  
contentType      | The Content-Type of the page | String | `"text/html"`
template         | The filename of the template to load for the page | String | `pageName.dust`
datasources      | An array containing the datasources that should be loaded for the page | Array | `[]`
requiredDatasources  | An array containing the datasources that must return data for the page to function. If any of the listed datasources return no results, a 404 is returned | Array | `[]`
events           | An array containing the events that should be executed once all the page's datasources have returned data | Array | `[]`
preloadEvents    | An array containing the events that should be executed before the rest of the page's datasources and events | Array | `[]`

## Routing

For every page added to your application, a route is created by default. A page’s default route is a value matching the page name. For example if the page name is books the page will be available in the browser at /books.

To make the books page reachable via a different URL, simply add (or modify) the page’s routes property:

```js
"routes": [
  {
    "path": "/reading"
  }
]
```

For detailed documentation of routing, see [Routing](/web/concepts/routing#page-routing).

## Templates

Template files are stored in the same folder as the page specifications and have a `.dust` extension. Unless the page specification contains an explicit `template` property, the template name should match the page specification name.

See [Views](/web/concepts/views#page-templates) for further documentation.

## Datasources

An array containing datasources that should be executed to load data for the page.

For detailed documentation of datasources, see [Datasources](/web/concepts/datasources)

```js
"datasources": [
  "datasource-one",
  "datasource-two"
]
```

## Required Datasources

Allows specifying an array of datasources that must return data for the page to function. If any of the listed datasources return no results, a 404 is returned. The datasources specified must exist in the `datasources` array.

```js
"requiredDatasources": [
  "datasource-one"
]
```

## Events

An array containing events that should be executed after the page's datasources have loaded data.

For detailed documentation of events, see [Events](/web/concepts/events)

```js
"events": [
  "event-one",
  "event-two",
]
```

## Preload Events

An array containing events that should be executed before the rest of the page's datasources and events.

Preload events are loaded from the filesystem in the same way as a page's regular events, and a Javascript file with the same name must exist in the `events` path.

```js
"preloadEvents": [
  "preloadevent-one"
]
```

## Caching

If true the output of the page will be cached using cache settings in the main configuration file.

For detailed documentation of page caching, see [Page Caching](/web/concepts/caching#page-caching).

```js
"settings": {
  "cache": true
}
```

## Error pages

You can have error pages for any error code your application can throw. For example, a 404.

`/workspace/pages/404.json`

```js
{
  "page": {
      "name": "404 Error page",
      "description": "Page not found",
      "language": "en"
  }
}
```

`/workspace/pages/404.dust`

```html
<h1>404 Error: page not found</h1>
```
