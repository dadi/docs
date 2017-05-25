---
title: Collections
excerpt: Configure Collections, the storage containers for your data within API
order: 9
---

## Collection Specification

DADI API handles creation and modification of database collections in MongoDB directly. All that is required in order to create a new database collection and it's associated collection endpoint is the creation of the collection specification file.

Collection specifications are simply JSON files stored in your application's `/workspace/collections` folder. It is important to understand how the folder hierarchy in the collections folder affects the behaviour of your API.

```bash
my-api/
  workspace/
    collections/                    
      1.0/                          # API version label
        library/                    # database name
          collection.books.json     # collection specification

    endpoints/                      # custom Javascript endpoints

```

### API Version

Specific versions of your API are represented by "version" folders within the collections folder.
[MORE]

### Database

Collection documents may be stored in separate databases, represented by the name of the folder within the "version" folder.

> **Note** This feature is disabled by default. To enable separate databases in your API the configuration setting `database.enableCollectionDatabases` must be `true`. See [Collection-specific Databases](../../setup/configuration#collection-specific-databases) for more information.


### Collection

Collection specifications exist as JSON files containing any number of field specifications and a configuration block. The naming convention for the collection specifications is `collection.<collection name>.json` where `<collection name>` is used as the name of the collection in MongoDB.

#### Use the Plural Form

We recommend you use the plural form for all collection endpoints to keep consistency across your API. Using the singular form means a GET request for a list of results can easily be confused with a request for a single entity.

For example, a collection named `book (collection.book.json)` will accept GET requests at the following endpoints:

```
http://api.example.com/1.0/library/book
http://api.example.com/1.0/library/book/560a44b33a4d7de29f168ce4
```

Is the first one going to return all books, as intended? It's not obvious. Instead, using the plural form makes it clear what the endpoint's intended behaviour is:

```
http://api.example.com/1.0/library/books
http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4
```


##### Collection Endpoint

With the above folder and file hierarchy a collection's endpoint within the API uses the following format:


`http://api.example.com/{version}/{database}/{collection name}`

In actual use this might look like the following:

`http://api.example.com/1.0/library/books`

##### The JSON File

Collection specification files take the following format:

```json
{
  "fields": {
    "field1": {

    },
    "field2": {

    }
  },
  "settings": {

  }
}
```


## Field Specification


Each field is defined in the following way:

```json
{
  "fieldName": {
    "type": "String",
    "label": "Title",
    "comments": "The title of the entry",
    "example": "War and Peace",
    "matchType": "exact",
    "validation": {
      "minLength": 4,
      "maxLength": 20,
      "regex": {
        "pattern": "/[A-Za-z0-9]*/"
      }
    },
    "required": false,
    "message": "must not be blank",
    "default": "Untitled",
    "placement": "Main content",
    "display": {
      "index": true,
      "edit": true
    }
  }
}
```

 Property       | Description        | Introduced        |  Default                                  | Example
:----------------|:-------------------|:------------------------------------------|:-------
fieldName | The name of the field | | | `"title"`
type | The type of the field. Possible values `"String"`, `"Number"`, `"Boolean"`, `"Mixed"`, `"Object"`, `"ObjectID"`, `"Reference"`  | 1.0.0|  | `"String"`
label | The label for the field | 1.0.0 |  | `"Title"`
comments | The description of the field | 1.0.0 |  | `"The article title"`
example | An example value for the field | 1.0.0 |  | `"War and Peace"`
placement | Determines where to display the field in the backend interface  | 1.0.0 |  | `"Main content"`
validation | Validation rules, including minimum and maximum length and regular expression patterns. | 1.3.0 |  |
validation.minLength | The minimum length for the field.| 1.3.0  | unlimited | `4`
validation.maxLength | The maximum length for the field.| 1.3.0  | unlimited | `20`
validation.regex | A regular expression the field's value must match | 1.3.0  |  | `{ "pattern": /[A-Z]*/ }`
required | If true, a value must be entered for the field. | 1.0.0 | `false` | `true`
message | The message to return if field validation fails.| 1.0.0  | `"is invalid"` | `"must contain uppercase letters only"`
default | An optional value to use as a default if no value is supplied for this field ||  | `"0"`
display | Determines in which view states the field should be visible within the backend interface | 1.0.0|  | `{ "index": true, "edit": false }`
matchType | Specify the type of query that is performed when using this field. If "exact" then API will attempt to match the query value exactly, otherwise it will performa a case-insensitive query. | 1.14.0 | | `"exact"`
validationRule | Replaced by `validation`  | removed 1.8.2 |  |
limit | Replaced by `validation` | removed 1.8.2 |  |

## Field Types

##### String

##### Number

##### Boolean

##### Mixed

##### Object

##### ObjectID

##### Reference

See [Document Composition (reference fields)](#document-composition) for further information.


## Collection Settings

Default values for the collection endpoint are set the following way:

```json
{
  "settings": {
    "cache": true,
    "authenticate": true,
    "count": 40,
    "sort": "title",
    "sortOrder": 1,
    "callback": null,
    "defaultFilters": null,
    "fieldLimiters": null,
    "storeRevisions": false,
    "revisionCollection": null,
    "index": []
  }
}
```

 Property       | Description        |   Example
:----------------|:-------------------|:-------
cache | If true, caching is enabled for this collection. The global config must also have `cache: true` for caching to be enabled | `true`
authenticate |  | `true`
count | The number of results to return when querying the collection | `40`
sort | The default field to sort results by | `"title"`
sortOrder | The sort direction to sort results by | `1` = ascending, `-1` = descending
callback |  |
defaultFilters | A default set of filters to query the collection by | `{ "publishState": true }`
fieldLimiters | A default set of fields to return | `{ "title": 1, "author": 1 }`
index | | | `{ "keys": { "username": 1 }, "options": { "unique": true } }`

> It is possible to override some of these values when requesting data from the endpoint, by using querystring parameters. See [Querying a collection](./querying) for detailed documentation.

##### defaultFilters

Specifies a default query for the collection.

```
defaultFilters: { "publishState": "published" }
```

A `filter` parameter passed in a query will extend the default filters. For example the following request would extend the default filters and the database query would reflect both the defaults and the filters passed in the querystring:

```
http://api.example.com/1.0/magazine/articles?filter={"magazineTitle":"Vogue"}

{ "publishState": "published", "magazineTitle": "Vogue" }
```

##### fieldLimiters

Specifies a default list of fields for inclusion/exclusion. Fields can be included or excluded, but not both.

#### Selecting fields for inclusion

For example to include only `name` and `email`:

```
fieldLimiters: {"name":1, "email": 1}
```

The `_id` field is returned by default and is the only field which can be excluded in a list of included fields. To exclude the `_id` field:

```
fieldLimiters: {"name":1, "email": 1, "_id": 0}
```

Attempting to mix included with excluded results in a MongoDB error:

```
fieldLimiters: {"name":1, "email": 0}
```

#### Selecting fields for exclusion

To exclude fields, list only the fields for exclusion:

```
fieldLimiters: {"name":0, "email": 0}
```


## Validation

Documents sent to the API with POST and PUT requests are validated at field level based on the rules defined in the collection schema. Find more information in the [Validation](../validation) section.

## Database Indexes

Indexes provide high performance read operations for frequently used queries and are fundamental in ensuring performance under load and at scale.

Database indexes can be automatically created for a collection by specifying the fields to be indexed in the `settings` object.
An index will be created on the collection using the fields specified in the `index.keys` setting. A value of `keys: { fieldName: 1 }` will create an index for field `fieldName` using an ascending order. `keys: { fieldName: -1 }` will create an index for field `fieldName` using a descending order. Specifying multiple fields will create a compound index.

The index will be created in the background to avoid blocking other database operations.

##### settings.index

```json
"settings": {
  "cache": true,
  "index": {
    "enabled": true,
    "keys": {
      "field1": 1,
      "field2": -1
    }
  }
}
```

## Document Revision History

##### settings.storeRevisions

If `settings.storeRevisions` is **true**:

* a `revision collection` will automatically be generated in the database when the first document for the collection is created
* a `revision document` will be stored in the `revision collection` when a new document is created
* a `revision document` will be stored for each subsequent update to an existing document  
* each time a `revision document` is created, the `_id` of the `revision document` is pushed onto a `history` array of the original document

##### settings.revisionCollection

If `settings.revisionCollection` is specified, the collection's `revision collection` will be named according to the specified value, otherwise the collection's `revision collection` will take the form `{collection name}History`.

For example:

`db.books.find()`

Main document stored in the collection, with revisions referenced in the history array:

```json
{
  "_id": ObjectId("548efd7687fd8b50f3dca6e5"),
  "title": "War and Peace",
  "history": [
    ObjectId("548efd7687fd8b50f3dca6e6"),
    ObjectId("548efd7687fd8b50f3dca6e7")
  ]
}
```

`db.booksHistory.find()`

Two revision documents stored in the revision collection, one created at
the same time as the original document was created, the second created after an
update operation to change the value of `title`:

```json
{
  "_id": ObjectId("548efd7687fd8b50f3dca6e6"),
  "title": "Draft"
}

{
  "_id": ObjectId("548efd7687fd8b50f3dca6e7"),
  "title": "War and Peace",
  "history": [
    ObjectId("548efd7687fd8b50f3dca6e6")
  ]
}
```

> **Note:** DADI API does not add or update any date/time fields to indicate the order in which revision documents were created, nor does it perform any sort operations when returning a document's revision history. It is up to the API consumer to include appropriate date/time fields and perform sort operations on the returned revision collection.

## Document Composition

To reduce data duplication through document embedding, DADI API allows the use of "Reference" fields which can best be described as pointers to other documents. The referenced document could be in the same collection, another collection in the same database or a collection in a different database.

##### Reference Field Settings

 Property       | Description        |   Example
:----------------|:-------------------|:-------
database | The name of the database that holds the reference data. Can be omitted if the field references data in the same **database** as the referring document. | `"title"`
collection | The name of the collection that holds the reference data. Can be omitted if the field references data in the same **collection** as the referring document. | `"title"`
fields    | An array of fields to return for each referenced document.   | `["firstName", "lastName"]`

##### Example

Consider the following two collections, `books` and `people`. `books` contains a Reference field `author` which is capable of loading documents from the `people` collection. By creating a `book` document and setting the `author` field to the `_id` value of a document from the `people` collection, the application is able to resolve this reference and return the `author` document within a result set for a `books` query.

#### Books `(collection.books.json)`

```json
{
  "fields": {
    "title": {
      "type": "String",
      "required": true
    },
    "author": {
      "type": "Reference",
      "settings": {
        "collection": "people",
        "fields": ["firstName", "lastName"]
      }
    },
    "booksInSeries": {
      "type": "Reference"
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "sort": "title",
    "sortOrder": 1
  }
}
```

#### People `(collection.people.json)`

```json
{
  "fields": {
    "name": {
      "type": "String",
      "required": true
    },
    "occupation":	{
      "type": "String",
      "required": false
    },
    "nationality": {
      "type": "String",
      "required": false
    },
    "education": {
      "type": "String",
      "required": false
    },
    "spouse": {
      "type": "Reference"
    }
  },
  "settings": {
    "cache": true,
    "count": 40,
    "sort": "name",
    "sortOrder": 1
  }
}
```


##### Composed

An additional `composed` property is added to the `book` document when it is returned, indicating which fields have been expanded. The property contains the original `_id` value used for the reference field lookup.  

##### Enabling Composition

> Composition is disabled by default.

To return a document with resolved Reference fields at the top level, you may send a parameter either in the querystring of your request or provide it as an option to the collection's `find()` method:

```
GET /1.0/library/books?filter={"_id":"560a5baf320039f7d6a78d3b"}&compose=true
```

```js
var books = model('books')

books.find({ title: "Harry Potter 2" }, { "compose": true }, function (err, result) {
  // do something with result
});
```

This setting will allow the first level of Reference fields to be resolved. To allow
Reference fields to resolve which are nested further within the document, add a `compose` property to the collection specification's settings block:

```json
{
  "fields": {
  },
  "settings": {
    "compose": true
  }
}
```


##### a `book` document

```json
[
  {
    "_id": "daf35614-918f-11e5-8994-feff819cdc9f",
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "7602d576-9190-11e5-8994-feff819cdc9f",
    "booksInSeries": [
      "daf35998-918f-11e5-8994-feff819cdc9f",
      "daf35b82-918f-11e5-8994-feff819cdc9f",
      "daf35f88-918f-11e5-8994-feff819cdc9f",
      "daf36172-918f-11e5-8994-feff819cdc9f",
      "daf363c0-918f-11e5-8994-feff819cdc9f",
      "daf3658c-918f-11e5-8994-feff819cdc9f"
    ]
  }
]
```

##### A `people` document

```json
[
  {
    "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
    "name": "J. K. Rowling",
    "occupation": "Novelist",
    "nationality": "British",
    "education": "Bachelor of Arts",
    "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
  },
  {
    "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
    "name": "Neil Murray"
  }
]
```


##### Query result: The result of a query for the above `book` document

```json
{
  "_id": "daf35614-918f-11e5-8994-feff819cdc9f",
  "title": "Harry Potter and the Philosopher's Stone",
  "author": {
    "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
    "name": "J. K. Rowling",
    "occupation": "Novelist",
    "nationality": "British",
    "education": "Bachelor of Arts",
    "spouse": {
      "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
      "name": "Neil Murray"
    },
    "composed": {
      "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
    }
  },
  "booksInSeries": [
    {
      "_id": "daf35998-918f-11e5-8994-feff819cdc9f",
      "title": "Harry Potter and the Chamber of Secrets",
      "author": {
        "_id": "7602d576-9190-11e5-8994-feff819cdc9f",
        "name": "J. K. Rowling",
        "occupation": "Novelist",
        "nationality": "British",
        "education": "Bachelor of Arts",
        "spouse": {
          "_id": "7602d472-9190-11e5-8994-feff819cdc9f",
          "name": "Neil Murray"
        },
        "composed": {
          "spouse": "7602d472-9190-11e5-8994-feff819cdc9f"
        }
      }
    }
  ],
  "composed": {
    "author": "7602d576-9190-11e5-8994-feff819cdc9f",
    "booksInSeries": [
      "daf35998-918f-11e5-8994-feff819cdc9f"
    ]
  }
}
```


## Collection Statistics

Collection statistics from MongoDB can be retrieved by sending a GET request to a collection's `/stats` endpoint.

An example request:

```http
GET /1.0/library/books/stats HTTP/1.1
Host: api.example.com
Content-Type: application/json
Cache-Control: no-cache
```

An example response:

```json
{
  "count": 2,
  "size": 480,
  "averageObjectSize": 240,
  "storageSize": 8192,
  "indexes": 1,
  "totalIndexSize": 8176,
  "indexSizes": { "_id_": 8176 }
}
```

## Available Collections

A document containing information about the available collections can be retrieved by sending a GET request to the API's `/api/collections` endpoint.

**Example request**

```http
GET /api/collections HTTP/1.1
Host: api.example.com
Content-Type: application/json
Cache-Control: no-cache
```

**Example response**

```json
{
  "collections": [
    {
      "version": "1.0",
      "database": "library",
      "name": "books",
      "slug": "books",
      "path": "/1.0/library/books"
    },
    {
      "version": "1.0",
      "database": "library",
      "name": "user",
      "slug": "user",
      "path": "/1.0/library/users"
    },
    {
      "version": "1.0",
      "database": "library",
      "name": "author",
      "slug": "author",
      "path": "/1.0/library/authors"
    }
  ]
}
```
