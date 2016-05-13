# DADI Web

## Template Helpers

DADI Web includes the [common-dustjs-helpers](https://www.npmjs.com/package/common-dustjs-helpers) library and provides a set of built-in helpers for use in your page and partial templates.

In addition to the built-in helpers you can add custom filters and helpers to your application. See [Dust Template Helpers & Filters](https://github.com/dadi/web/blob/docs/docs/views.md#dust-template-helpers--filters) for more information.

### Common Dust Helpers

Follow the links below for detailed documentation of each helper.

 * [@count](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#count)
 * [@deorphan](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#deorphan)
 * [@downcase](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#downcase)
 * [@even](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#even)
 * [@filter](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#filter)
 * [@first](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#first)
 * [@idx](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#idx)
 * [@if](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#if)
 * [@index](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#index)
 * [@last](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#last)
 * [@odd](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#odd)
 * [@repeat](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#repeat)
 * [@sep](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#sep)
 * [@titlecase](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#titlecase)
 * [@unless](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#unless)
 * [@upcase](https://github.com/rodw/common-dustjs-helpers/blob/master/docs/helpers.md#upcase)

### DADI Web Helpers

#### Truncate

Returns the supplied 'data' parameter truncated using the supplied 'length' parameter

**Usage**

```
{@Truncate data="{body}" length="250" ellipsis="true"/}
```

#### Trim

Returns the supplied 'data' parameter trimmed of whitespace on both left and right sides

**Usage**
```
{@Trim data="{body}"/}
```

#### formatDate

Returns the supplied 'data' parameter formatted using the supplied 'format' parameter
Pass a unix epoch time (expects milliseconds) in the 'unix' parameter. For seconds use 'unix_sec'

**Usage**

```
{@formatDate data="{body}" [unix="{lastModifiedAt}"] format="YYYY-MM-DDTh:mm:ss+01:00"/}
```

#### markdown

Returns the markdown content formatted as HTML

#### soberMarkdown

Returns the markdown content formatted as HTML, but without `<p>` wrappers

#### forceRender

Returns the supplied 'str' parameter with any instances of {...} resolved to {vartoreplace}

**Usage**

```
{@forceRender str="{body}" value="{vartoreplace}" /}
```

#### iter

Iterates over `items`, much like using `{#items}{/items}`,
but with the possiblity to loop over a subset, and in any direction

**Usage**

```
{@iter items=arrayOfItems from=0 to=12}
  run for each item, with the item as context
{/iter}
```

#### htmlstrip

Strips HTML from passed content. See https://github.com/zaro/node-htmlstrip-native for usage.


#### defaultParam

Default values for partials

#### numberCommas

Numbers with commas

#### plural

pluralise


#### htmlEncode

Encode html to json valid

#### url

Generate URLs based on routes by sending in page names & parameters

**Usage**

```
{@url page="pagename" param="val" otherparam=variableval/}
```

#### slugify

Use the Underscore.JS `slugify()` method to generate a URL friendly string

**Usage**

```
{@slugify}{title}{/slugify}
```

#### replace

Performs a global search and replace within a string.
In the following example, we replace all periods in the
message string with dashes.

**Usage**

```
{@replace str="{message}" search="." replace="-" /}
```

#### paginate

Paginate pages

**Usage**

```
{@paginate page=currentPageNumber totalPages=totalPageCount}
  <a href="{path}">{n}</a>
{:current}
  <a href="{path}">Current page {n}</a>
{:prev}
  <a href="{path}">Prev</a>
{:next}
  <a href="{path}">Next</a>
{/paginate}
```

#### findWhere

Get the first item matching the sent in params. Replaces iteration+eq combos.

For arrays of objects each object has its property at key checked for a match with the provided value, much like underscore's `findWhere`

**Usage**
```

{@findWhere list=aList key="id" value=id}
{.}
{/findWhere}
```
You can also supply the `list` with `props`, which is a loosely parsed
JSON object in a string. This makes it possible to combine multiple filters.

```
{@findWhere list=aList props="{attr: "{strvalue}", other: {numericalId}}"}
{.}
{/findWhere}
```
