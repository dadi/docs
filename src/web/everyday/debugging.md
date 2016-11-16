---
title: Debugging
layout: default.html
---

# Debug mode

If enabled in the config `"allowJsonView": true` you can append `?json=true` to any page in the browser get back the JSON data structure of the given page.

# Context dump

A handy feature of [Dust.js](http://www.dustjs.com/guides/dust-helpers/) is the ability to perform a `{@contextDump/}`.

You can use this to output the JSON, similarly to the debug url feature above, but with the added benefit of it being inline with the HTML output.

Some examples, added to `page.dust` files:

```js
{@contextDump/}
```

In a context:

```js
{#people}
  {@contextDump/}
{/people}
```