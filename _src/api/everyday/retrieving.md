---
title: Retrieving
---

# `GET`

## GET Resource Collection

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}`

**Example:** `http://api.example.com/1.0/library/books`

Returns a JSON object with all results from the `{database}` database and `{collection}` collection. The result set will be paginated and limited to a number of records as defined as the default view in the collection schema file in *./workspace/collections/{version number}/{database name}/collection.{collection name}.json*.

Default views can be overridden using parameters at the point of API request.

You can read more about this and about the collection schema [here](./endpoints/endpointsCollections).

## GET Single Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Returns the record with the id of `{:id}` in the `{database}` database and `{collection}` collection.