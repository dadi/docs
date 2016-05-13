# DADI Web

## Events

### Overview

Events are server side Javascript that can add additional functionality to a page. Events can serve as a useful way to implement logic to a logicless Dust template.

* Global Events
* Preload Events
* Filter Events

```
my-web/
  app/
    datasources/      
    events/           
      addAuthorInformation.js      # an Event file
    pages/            
```

### Global Events

In main configuration file

```js
globalEvents: {
  doc: "",
  format: Array,
  default: []
}
```

### Preload Events

In page specification file

```js
"preloadEvents": [
  "preloadevent-one"
]
```

### Filter Events

In datasource specification file

```js
"filterEvent": "filterevent-one"
```

Use case:
A developer would like count how many people clicked on a 'plus' button.

To achieve this he has to create a new event and attach it to the page where he has the 'plus' button.

The developer then implements a code in the event which will look for specific event (i.e. POST buttonpressed) and inside this he will increase a counter stored in a text file.

The developer then returns the updated counter number from the event which is made accessible within the Dust template.

Events are added to pages in the page specification.

```
{
  "page": {
    "name": "Book Reviews",
    "description": "A collection of book reviews.",
    "language": "en"
  },
  "settings": {
    "cache": true
  },
  "route": "/reviews",
  "template": "book-reviews.dust",
  "datasources": [
    "books"
  ],
  "events": [
    "addAuthorInformation"
  ]
}

```

#### Sample event file

```js
/* optional Node includes */
var path = require('path');
var http = require("http");
var querystring = require('querystring');

/* optional DADI Web includes */
var config = require('@dadi/web').Config;

// the `data` parameter contains the data already loaded by
// the page's datasources and any previous events that have fired

var Event = function (req, res, data, callback) {

  var result = {};

  if (data.books && data.books.results) {
    result = {
      title: data.books.results[0].title
    };
  }
  else {
    result = {
      title: "Not found"
    };
  }

  // return a null error and the result
  callback(null, result);
};

module.exports = function (req, res, data, callback) {
    return new Event(req, res, data, callback);
};

module.exports.Event = Event;
```
