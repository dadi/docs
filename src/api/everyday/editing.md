---
title: Editing
---

**URL Format:** `http(s)://{url}/{version}/{database}/{collection}/{:id}`

**Example:** `http://api.example.com/1.0/library/books/560a44b33a4d7de29f168ce4`

Updates an existing record with the id of `{:id}` in the `{database}` database abd `{collection}` collection.

If the record passes validation it will be updated.

The following additional fields are added or updated:

* `last_modified_at`: timestamp of modification
* `last_modified_by`: user id of updater