# DADI Web

## Views

### Overview

DADI Web.

  * [Data](#data)
  * [Dust](#dust)
  * [Page Templates](#page-templates)
  * [Partial Templates](#partial-templates)
  * [Master Pages/Layouts](#layouts)
  * [Helpers](#helpers)
  * [Filters](#filters)

A `page` on your website consists of two files within your application's file structure: a Page Specification and a Template.

Template files are stored in the same folder as the JSON page specifications and have a `.dust` extension. The default folder for pages is `app/pages`, although this is configurable using the main application configuration (see [Configuration](https://github.com/dadi/web/blob/docs/docs/configuration_full.md)).

> **Note:** Unless the page specification contains an explicit `template` property, the template name should match the page specification name.

```
my-web/
  app/
    datasources/      
    events/           
    pages/            # page specifications, layouts and templates        
      layout.dust     # a layout file
      people.dust     # page template file
      people.json     # page specification file
    partials/         # partial/include templates
      header.dust     # partial template file
```

#### Data

```
{
  "title": "films",
  "debug": false,
  "host": "www.example.com",
  "params": {},
  "pathname": "/films",
  "films": [
    {
      "_id": "4b80c5bf-cd48-41e5-9e57-29a6dcafab1c",
      "title": "Dallas Buyers Club",
      "director": "Jean-Marc Vallée",
      "length": "2h 10min",
      "score": "87%"
    },
    {
      "_id": "3ff5b730-3544-4d77-9213-93ea87ef5acf",
      "title": "Interstellar",
      "director": "Christopher Nolan",
      "length": "2h 40min",
      "score": "87%"
    }
  ]
}
```

##### Global Config

```
{
  "title": "films",
  "host": "www.example.com",
  "global" : {
    "mediaBaseUrl": "http://media.example.com"
  },
  "films": []
}
```

#### Dust

Dust is a Javascript templating engine.

 * http://www.dustjs.com/
 * http://akdubya.github.io/dustjs/

#### Page Templates

**An example template: app/pages/films.dust**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Film Index</title>
  </head>
  <body>
    <main class="main">
      <section class="grid grid--gutter push-4">
      {#films}
        <div class="col w-7">
          <h1>{title}</h1>
          {>"partials/details"/}
        </div>
      {/films}
      </section>
    </main>
  </body>
</html>
```

#### Partial Templates

Partials are reusable Dust templates that may be referenced from the main page templates. As for the page templates, partials also have access to the data loaded by datasources and events.

In the example below the `details` partial is referenced by relative path within the template:

```html
<div class="col w-7">
  <h1>{title}</h1>
  {>"partials/details"/}
</div>
```

**An example partial: app/partials/details.dust**

```html
 <dl class="t">
  <dt>Score</dt>
  <dd>{score}</dd>
  <dt>Director</dt>
  <dd>{director}</dd>
  <dt>Length</dt>
  <dd>{length}</dd>
</dl>
```

**An example template: app/pages/films.dust**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Film Index</title>
  </head>
  <body>
  <main class="main">
    <section class="grid grid--gutter push-4">
    {#films}
      <div class="col w-7">
        <h1>{title}</h1>
        {>"partials/details"/}
      </div>
    {/films}
    </section>
  </main>
  </body>
</html>
```

#### Layouts

Dust allows you to use "master page" or "layouts" so that only the content varies within the pages templates.

A layout file might contain a static header and footer, for example. These would appear on every page that references the layout, without requiring the same markup in every template. Layout files are stored in the `pages` folder.

**An example layout: app/pages/layout.dust**

This layout defines two blocks, `title` and `content`. Child pages that reference this layout can supply content to populate these blocks using the syntax shown in the next section.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{+title/}</title>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
    {+content/}
    <footer>
      <div class="container">
        <p>&copy; Copyright 2016. DADI+</p>
      </div>
    </footer>
  </body>
</html>
```

**Example Page: app/pages/films.dust**

Content within the `{<content}{/content}` block in the below template will be injected in to the layout where the `{+content/}` block is defined.

```html
{>layout/}

{<title}
Film Index
{/title}

{<content}
<main class="main">
  <section class="grid grid--gutter push-4">
    <h1 class="kilo col w-12">Popular films in the last week</a></div></h1>
    <ul></ul>
  </section>
</main>
{/content}
```

#### Dust Template Helpers & Filters

A number of Dust template helpers are built in to DADI Web. A guide to these can be found [here](https://github.com/dadi/web/blob/docs/docs/dust_helpers.md).

Custom helpers and filters can be added to your application by including them within  Javascript files in the configured `helpers` and `filters` folders. The default location is `app/utils/helpers` and `app/utils/filters`.

You can either create one file containing all your helpers and one file containing all your filters or add them to the application as individual files.

```
my-web/
  app/
    utils/      
    helpers/          # Dust helpers
      helpers.js      # a file containing all helpers for the application
    filters/          # Dust filters
      wookie.js       # a single filter
      unicorns.js     # a single filter
```

Whether you use one file or many, DADI Web will ensure all your helpers and filters are loaded at application startup.

##### Dust Helpers

The following example helper returns the contents of the block wrapped in an HTML `<pre>` tag.

**Helper**

```js
// first get a reference to the `dust` instance
var dust = require('dustjs-linkedin');

/**
 * Return the provided content wrapped in an HTML <pre> tag
 */
dust.helpers.code = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end('<pre>' + string + '</pre>');
    });
  }
  return chunk;
}
```

**Usage within a template**

```html
<h1>Code Helper Example</h1>
{@code}
alert('Hello World');
{/code}
```

**Rendered output**

```html
<h1>Code Helper Example</h1>
<pre>alert('Hello World');</pre>
```

##### Dust Filters

The following example filter returns the data with the first instance of "unicorn" replaced with "horse".

**Filter**

```js
// first get a reference to the `dust` instance
var dust = require('dustjs-linkedin');

/**
 * Return the data with the first instance of "unicorn" replaced with "horse"
 * @param {string} value - the input value to apply the filter to
 * @returns {string}
 */
dust.filters.unicorn = function(value) {
 if (typeof value === 'string') {
    return value.replace('unicorn', 'horse');
  }
  return value;
}
```

**Usage within a template**

```html
<h1>Unicorns to Horses</h1>
<p>{"I love unicorns"|unicorn}</p>
```

**Rendered output**

```html
<h1>Unicorns to Horses</h1>
<p>I love horses</p>
```
