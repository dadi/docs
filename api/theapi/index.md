---
title: REST API Specification
---

DADI API accepts GET, POST, PUT, PATCH and DELETE requests.

## GET

### GET Resource Collection

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}`

**Example:** `http://api.example.com/1.0/library/books`

Returns a JSON object with all results from the `{database}` database and `{collection}` collection. The result set will be paginated and limited to a number of records as defined as the default view in the collection schema file in *./workspace/collections/{version number}/{database name}/collection.{collection name}.json*.

Default views can be overridden using parameters at the point of API request.

You can read more about this and about the collection schema [here](https://github.com/dadi/api/blob/master/docs/endpoints.md).

### GET Single Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Returns the record with the id of `{:id}` in the `{database}` database and `{collection}` collection.

## POST

### Create New Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}`

**Example:** `http://api.example.com/1.0/library/books`

Adds a new record to the `{collection}` collection in the `{database}` database.

If the record passes validation it is inserted into the collection.

The following additional fields are added to every record:

* `created_at`: timestamp of creation
* `created_by`: user id of creator
* `api_version`: API version number passed in the URL as `{version}`, e.g. `1.0`

### Update Existing Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Updates an existing record with the id of `{:id}` in the `{database}` database abd `{collection}` collection.

If the record passes validation it will be updated.

The following additional fields are added or updated:

* `last_modified_at`: timestamp of modification
* `last_modified_by`: user id of updater

## DELETE

### Delete Existing Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Deletes the record with the id of `{:id}` from the `{collection}` collection in `{database}` database.

# Custom Endpoints

**URL Format:** `http(s)://{url}/{version}/{endpoint}`

**Example:** `http://api.example.com/1.0/new-books`

Returns a JSON object. Parameters and return are completely customisable. The output is generated using the file:
