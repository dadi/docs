---
title: Configuration
---

## Configuration

### cookie_secret

`String`, Required
This is the secret used to sign the session ID cookie for viewing the dashboard.
TODO: this should only be required if the [`dashboard_authentication`](#dashboard_authentication) option is set to `true`

### demo_mode

`Boolean`, default: `false`
This simulates application traffic to get an idea of what Sebright
looks like.  Only used for development and demostration.  Change this to `false` when you're ready to actually use
Sebright in production.

### dashboard_port

`Number` || `Boolean`
Port where the dashboard will be shown.  Change it to false to disable
the dashboard. (you might do this if you were integrating
Sebright into an existing admin interface)

### dashboard_secure

`Boolean`
Set to true if you want the dashboard to be served over https and wss

### dashboard_authentication

`Boolean`
Set to true if you want to limit access to the dashboard to authenticated users
Note: you must add credentials for authenticated users.  An there is an example script for this [here](https://github.com/bantam-framework/sebright/blob/master/scripts/createuser.js)

### https_options

`Object`
if [`dashboard_secure`](#dashboard_secure) is set to true this specifies the path to the ssl certificate and key.  If this option is used both the `key` and `cert` properties are required.

Example:

    "https_options": {
        "key": __dirname + '/../server.key',
        "cert": __dirname + '/../server.crt'
    },

### session_db

`String`, Required
a MongoDB [connection string](http://docs.mongodb.org/manual/reference/connection-string/) to be used with the [`connect-mongo`](https://github.com/kcbanner/connect-mongo) module

Example:

    "session_db": "mongodb://localhost:27017/sebright/session"

### data_store

`Object`, Required
configuration for the data store that will be used for the aggregation data.  A complete example is available in [config.example.js](https://github.com/bantam-framework/sebright/blob/master/config/config.example.js)

#### Properties

  - `name`, This correspondes to a folder name in the [`datastore` directory](https://github.com/bantam-framework/sebright/tree/master/lib/datastore) (required)
  - `host`, the host for the data store connection (`String`, required)
  - `port`, the port for the data store connection (`Number`, required)
  - `database`, the database name for the data store connection (`String`, Required)
  - `secure`, should underlying transport be secure (`Boolean`, default: `false`)
  - `username`, only used if credentials are required to connect to data store (`String`)
  - `password`, only used if credentials are required to connect to data store (`String`)
  - `tracking_port`, If you want to have the tracking pixel listen on a different port than the dashboard, for instance in order to password-protect your dashboard, you can specify the port to listen on.  Set to `false` or leave undefined to listen on the same port as the dashboard (`Number`  || `Boolean`)
  - `tracking_port_secure`,  If you want to serve the tracking pixel over https you can listen for those connections on this port, e.g. 443.  This needs to be different than the `tracking_port` option (`Number`)
  - `udp_tracking_port`, Allow stats to be sent over UDP instead of HTTP.  This works best for sending stats from backend servers within the same datacenter as Sebright. Change to `false` or leave undefined to disable (`Number` || `Boolean`)
  - `udp_trackin_address`, Interface to bind the UDP listener to, e.g. use `"127.0.0.1"` to only allow other apps on your machine to connect, or `"0.0.0.0"` to bind to all interfaces and allow any machine to connect (`String`)

#### Serama store options

if the serama store is used these options are all required, and should correspond to the config for the serama instance being used

  - `token_path`, The url to get a token for access to the serama instance (`String`, Required)
  - `version`, Version of the serama schema to be used (`String`, Required)
