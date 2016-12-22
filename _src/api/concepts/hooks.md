---
title: Hooks
excerpt: Let CDN choose the recipe based on device, network, location or language
order: 9
---

## Introduction ##

In its essence, a hook is simply a function that intercepts a document/query before it's executed, having the option to modify it before returning it back to the model.

A hook is stored as an individual file on a `hooks` directory (defaulting to `/workspace/hooks`) and can be used by being attached to a `create`, `update` or `delete` operation in the `settings` section of the schema definition.

*collections.user.json*:

```
"settings": {
  "hooks": {
    "create": ["myhook1", "myhook2"]
  }
}
```

This means that whenever a new user is created, the document that is about to be inserted will be passed to `myhook1`, its return value will then be passed on to `myhook2` and so on. After all the hooks finish executing, the final document will be returned to the model to be inserted in the database.

The order in which hooks are executed is defined by the order of the items in the array.

## Anatomy of a hook

- one
* two
+ three

A hook always receives 3 arguments:

1. `obj`: The main object, which the hook is able to modify. It must always return it back. It can be a document (on `create`) or a query (on `update` or `delete`);
2. `type`: The type of hook. Can be `0` (`create`), `1` (`update`) or `2` (`delete`);
3. `data`: Object that passed additional data, such as the `options` object that may be declared with the hook, or other objects depending on the type of hook (e.g. `updatedDocs` will be passed if it's a `update` hook).

A simple hook can be defined as following:

```js
module.exports = function (doc, type, data) {
  doc.name = 'Modified by the hook'
  return doc
}
```

This particular hook will receive a document, change a property (`name`) and return it back. So if attached to the `create` event, it will make all the created documents have `name` set to `Modified by the hook`.

However, this logic ties the hook to the schema — what happens if we want to modify a property other than `name`? Hooks are supposed to be able to add functionality to a document, and should be approached as interchangeable building blocks rather than pieces of functionality tightly coupled with a schema.

For that reason, developers might have the need to pass extra information to the hook — e.g. inform the hook the name of the properties that should be modified. As such, in addition to the syntax shown above for declaring a hook (an array of strings), an alternative one allows data to be passed through a `options` object.

```json
"settings": {
  "hooks": {
    "create": [
      {
        "hook": "slugify",
        "options": {
          "from": "title",
          "to": "slug"
        }
      }
    ]
  }
}
```

In this example we implement a hook that populates a field (`slug`) with a URL-friendly version of another field (`title`). The hook is created in such a way that the properties it reads from and writes to are dynamic, passed through as `from` and `to` inside `options`. The `slugify` hook could then be written as follows:

```js
// Example hook: Creates a URL-friendly version (slug) of a field
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

module.exports = function (obj, type, data) {
  // We use the options object to know what field to use as the source
  // and what field to populate with the slug
  obj[data.options.to] = slugify(obj[data.options.from])
  return obj
}
```

## Use cases

- Creating variations of a field, such as creating a slug (example above);
- Validating fields with complex conditions, when a regular expression might not be enough;
- Converting different types of data to a unique format, such as Unixon timestamp;
- Triggering an action, notification or external command when a record is modified


## Before and After Hooks

*Before* hooks are always fired, whereas *after* hooks only fire after and if an operation is successful.

### Overview

The following data is passed to each type of hook:

- `beforeCreate`:
   - `obj`: Fields sent in the request
   - `data`:
      - `options`: Hook options
- `afterCreate`:
   - `obj`: Document created in the database
   - `data`:
      - `options`: Hook options
- `beforeUpdate`:
   - `obj`: Update query sent in the request
   - `data`:
      - `options`: Hook options
      - `updatedDocs`: Documents affected by the update
- `afterUpdate`:
   - `obj`: Updated documents
   - `data`:
      - `options`: Hook options
- `beforeDelete`:
   - `obj`: Delete query sent in the request
   - `data`:
      - `options`: Hook options
- `afterDelete`:
   - `obj`: Delete query sent in the request
   - `data`:
      - `options`: Hook options

# Testing

The following hook may be useful to get a better idea of when exactly each hook type is fired and what data it receives, as it logs to the console its internals every time it gets called:

*workspace/hooks/showInfo.js*

```js
module.exports = function (obj, type, data) {
  console.log('')
  console.log('**** HOOK ***')
  console.log('Type:', type)
  console.log('Payload:', obj)
  console.log('Additional data:', data)
  console.log('')

  return obj
}
```

And then enable it in a model:

*workspace/collections/vjoin/testdb/collection.users.json*

```js
"hooks": {
  "beforeCreate": ["showInfo"],
  "afterCreate": ["showInfo"],
  "beforeUpdate": ["showInfo"],
  "afterUpdate": ["showInfo"],
  "beforeDelete": ["showInfo"],
  "afterDelete": ["showInfo"]
}
```