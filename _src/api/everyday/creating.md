---
title: Creating
---

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}`

**Example:** `http://api.example.com/1.0/library/books`

Adds a new record to the `{collection}` collection in the `{database}` database.

If the record passes validation it is inserted into the collection.

The following additional fields are added to every record:

* `created_at`: timestamp of creation
* `created_by`: user id of creator
* `api_version`: API version number passed in the URL as `{version}`, e.g. `1.0`