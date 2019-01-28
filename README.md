<img src="./workspace/public/dadi-colour.svg" width="200">

# Documentation

## Install

`$ npm install`

## Start

`$ npm start`

## Edit

All markdown source files are in `/docs/`

## Deploying

After deploying new or updated documentation to the server, you must run the build script to generate HTML files from the Markdown files in `/docs`.

```
$ npm run build

Processing file /Users/james/projects/dadi/product/docs/docs/api-wrapper/2.0.md
Done.
Processing file /Users/james/projects/dadi/product/docs/docs/api-wrapper/3.0.md
Done.
Processing file /Users/james/projects/dadi/product/docs/docs/cli/2.1.md
Done.
```

## Server

The website is using `pm2` to manage the service. Restart the service after generating the HTML files:

* `pm2 log docs` - view logs
* `pm2 show docs` - view status
* `pm2 restart docs` - restart app
* `pm2 monit` - monitor all pm2 processes


## Style

### Blockquotes

To add blockquotes that stand out, for tips/tricks/warnings, use the following format. Available types are `advice`, `warning` and `danger`.

```
> **Security Note**
> 
> We **strongly** recommend creating an Amazon IAM account specifically for accessing your S3 buckets.
> -- warning
```

## Rendering static HTML files

A Dust helper `@html` is available that loads the specified file from the file system:

```
{#version.results}
  <div class="docs docs--{attributes.product}">
    {@html app=attributes.product file=attributes._loc}{/html}
  </div>
{/version.results}
```


