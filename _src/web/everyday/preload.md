---
title: Preload
---

# Preloading data

Configure Web to preload some data. Add a block to the [main configuration](configuration.md) file like the example below, using your datasource names in place of "channels":

```json
"data": {
  "preload": [
    "channels"
  ]
}
```

## Accessing preloaded data

```javascript
var Preload = require('@dadi/web').Preload
var data = Preload().get('key')
```