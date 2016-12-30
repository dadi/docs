---
title: Events
excerpt: Add functionality to a page using Event functions
order: 4
---

Events are server side Javascript that can add additional functionality to a page. Events can serve as a useful way to implement logic to a logicless Dust template.

```
my-web/
  app/
    datasources/      
    events/           
      addAuthorInformation.js      # an Event file
    pages/            
```

## Global Events

In the main configuration file:

```js
globalEvents: [
  "eventName"
]
```

## Preload Events

In a page specification file:

```js
"preloadEvents": [
  "preloadevent-one"
]
```

## Filter Events

In a datasource specification file:

```js
"filterEvent": "filterevent-one"
```

Use case:
A developer would like count how many people clicked on a 'plus' button.

To achieve this he has to create a new event and attach it to the page where he has the 'plus' button.

The developer then implements a code in the event which will look for specific event (i.e. POST buttonpressed) and inside this he will increase a counter stored in a text file.

The developer then returns the updated counter number from the event which is made accessible within the Dust template.

Events are added to pages in the page specification.

```json
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
/**
 * <Event Description>
 *
 * @param {IncomingMessage} req -
 * @param {ServerResponse} res -
 * @param {object} data - contains the data already loaded by the page's datasources and any previous events that have fired
 * @param {function} callback - call back to the controller with two arguments, `err` and the result of the event processing
 */
var Event = function (req, res, data, callback) {
  var result = {}

  if (data.books && data.books.results) {
    result = {
      title: data.books.results[0].title
    }
  }
  else {
    result = {
      title: "Not found"
    }
  }

  // return a null error and the result
  callback(null, result)
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}

module.exports.Event = Event
```
