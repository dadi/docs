---
title: Deleting
---

# `DELETE`

## Delete Existing Resource

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Deletes the record with the id of `{:id}` from the `{collection}` collection in `{database}` database.

## Delete Existing Resource with query body

**Example:** `http://api.example.com/1.0/library/books/`

**Body**
```JSON
{
  "query": {
    "_id": "560a44b33a4d7de29f168ce4"
  }
}
```

Deletes the record(s) that match the results of `query` from the `{collection}` collection in `{database}` database.
