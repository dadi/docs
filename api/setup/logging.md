---
title: Installation guide – Logging
permalink: /api/setup/logging/
---

## Overview

## Configuration

```
	"logging": {
		"enabled": true,
		"path": "./log",
		"filename": "dadi-api",
		"extension": "log"
	}
```

## Example Usage

```
var Log = require('dadi-api').Log;

var logger = Log.get().child({module: 'your module name'});
logger.info('your log message');
```
