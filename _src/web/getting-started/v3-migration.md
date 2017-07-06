---
title: Migrating from v2 to v3
---

## 1. Install Dust.js dependency

Web 3.0 supports multiple template engines. As a consequence, Dust.js is now decoupled from core and needs to be included as a dependency on projects that want to use it.

```
npm install @dadi/web-dustjs --save
```

## 2. Change bootstrap script

The bootstrap script (which you may be calling `index.js`, `main.js` or `server.js`) now needs to inform Web of the engines it has available and which npm modules implement them.

```js
require('@dadi/web')({
  engines: [
    require('@dadi/web-dustjs')
  ]
})
```

## 3. Update config

The `dust` config block has been moved inside a generic `engines` block.

*Before:*

```
"dust": {
  "cache": true,
  "debug": true,
  "debugLevel": "DEBUG",
  "whitespace": true,
  "paths": {
    "helpers": "workspace/utils/helpers"
  }
}
```

*After:*

```
"engines": {
  "dust": {
    "cache": true,
    "debug": true,
    "debugLevel": "DEBUG",
    "whitespace": true,
    "paths": {
      "helpers": "workspace/utils/helpers"
    }
  }
}
```

## 4. Move partials directory

Before Web 3.0, Dust templates were separated between the `pages` and `partials` directories, with the former being used for templates that generate a page (i.e. have a route) and the latter being used for partials/includes.

In Web 3.0, all templates live under the same directory (`pages`). The distinction between a page and a partial is made purely by whether or not the template has an accompanying JSON schema file.

Also, pages and partials can now be located in sub-directories, nested as deeply as possible.

To migrate an existing project, all you need to do is move the `partials` directory inside `pages` and everything will work as expected.

*Before:*

```
workspace
|_ pages
|_ partials
```

*After:*
```
workspace
|_ pages
  |_ partials
```

```
mv workspace/partials workspace/pages
```

## 5. Update Dust helpers

If your project is using custom helpers, you might need to change the way they access the Dust engine. You should now access the module directly, rather than reference the one from Web.

```js
// Before
var dust = require('@dadi/web').Dust
require('@dadi/dustjs-helpers')(dust.getEngine())

// After
var dust = require('dustjs-linkedin')
require('@dadi/dustjs-helpers')(dust)
```