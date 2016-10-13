---
title: Preload
layout: default
---

## Preload

### Preloading data

Configure Web to preload some data. Add a block to the [main configuration](configuration.md) file like the example below, using your datasource names in place of "channels":

```
"data": {
  "preload": [
    "channels"
  ]
}
```

### Accessing preloaded data

```js
var Preload = require('@dadi/web').Preload
var data = Preload().get('key')
```
