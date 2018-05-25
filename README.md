<img src="./workspace/public/dadi-colour.svg" width="200">

# Documentation

## Install

`$ npm install`

## Start

`$ npm start`

## Edit

All markdown source files are in `/docs/`

## Server

The website is using `pm2` to manage the process and service.

Commands:

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

