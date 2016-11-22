---
title: The "Hello World" App
layout: default.html
---

# Introduction

This is a brief outline of the minimum files you might need to an app to say "hello world". The folder structure looks like:

```
/your-project
│
│__/web
│  |  package.json
│  |  main.js
│  |  /config
│  |  |  config.development.json
│  |  |
│  |  /workspace  
│  |  |__/datasources
│  |  |  greeting.json
│  |  |
│  |  |__/pages
│  |  |  index.json
│  |  |  index.dust
│  |  |
│  |  |__/partials
│  |  |  header.dust
│  |  |  footer.dust
│  |  |
│  |  |__/public
│  |  |  styles.css
│  |  |
│  |  /node_modules # Location of Web after installing
│
|__/api
│
|__/cdn
```

## package.json

This is where we manage the _Web_ dependency and also tell _Node.js_ how to run our app when we `$ npm start`.

```json
{
  "name": "your-project",
  "version": "0.0.1",
  "author": "Your Name <hello@example.com>"
  "description": "Just me getting started with DADI Web.",
  "main": "main.js",
  "scripts": {
    "start": "NODE_ENV=development node main.js"
  },
  "dependencies": {
    "@dadi/web": "^v1.7.0"
  },
  "engines": {
    "node": ">=4.6.0",
    "npm": ">3.0.0"
  }
}
```

`main.js`

This is where we reference the installation of _Web_ for booting.

```javascript
require('@dadi/web')
```

`/config/config.development.json`

See [configuration](/web/configuration/) for full information.

## /workspace/

This is the heart of the project lives. We can organise this how we like in time - the `config.json` can be updated to let it know where to find the core files it needs to run. We can also store our front-end assets in here.

### /workspace/datasources/greeting.json

You can read more about datasources later, but for now we are using a static datasource to keep things simple.

```json
{
  "datasource": {
    "key": "greeting",
    "name": "A statically loaded greeting.",
    "source": {
      "type": "static",
      "data": [
        "message": "hello world!"
      ]
    }
  }
}
```

### /workspace/pages/index.json

This is how we define a page (or section) of our project. Again, you can read more about advanced configuration options later.

Notice we are referencing the datasource we created by its assigned `key`.

```json
{
  "page": {
    "key": "Homepage"
  },
  "datasources": {
    "greeting"
  },
  "routes": [
    {
      "path": "/"
    }
  ]
}
```

### /workspace/pages/index.dust

_Web_ uses [Dust.js](http://www.dustjs.com/) as it's templating language

```js
{<"partials/header" /}

<h1>All being well we should see "Hello world!" below:</h1>
<p><em>{greeting.message}</em></p>

{<"partials/footer" /}
```

### /workspace/partials/header.dust

This is a typical Dust.js partial.

```html
<!DOCTYPE html>
<html>
<head>
  <title>DADI Web saying hi!</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
```

### /workspace/partials/footer.dust

Finishing what we started.

```html
</body>
</html>
```

### /workspace/public/styles.css

Giving it all a lick of paint:

```css
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: #fff;
}
h1 {
  color: red;
}
```