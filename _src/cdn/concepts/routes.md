---
title: Delivery Routes
---

Routes allow CDN to make a decision about which [Delivery Recipe](/cdn/concepts/recipes/) to use for the current request, based on a set of configurable conditions.

Conditions can include the type of device being used, the network type, user location and language.

## Creating a Route

A route is defined in JSON format and added to a directory in your CDN installation. The default location for route files is `workspace/routes`, but this is [configurable](/web/getting-started/configuration/).

You can create route files in a text editor and manually copy them to the routes folder, or you can send a `POST` request to CDN with the route content and have CDN create it for you.

### POSTing to CDN

Send a `POST` request to the routes endpoint with the request body containing the route content.

**An example using cURL**

```
curl -i -H "Content-Type: application/json" -X POST "http://cdn.example.com/api/routes" -d '{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail"
    }
  ]
}'
```
**Response Codes**

Status Code | Description | Response
----|------|--------
200 | Route saved successfully | `{ success: true }`
400 | No request body sent | `{ success: false,  errors: ['Bad Request'] } `
400 | Route validation failed | `{ success: false, errors: validationErrors }`
400 | A route with the same name already exists | `{ success: false, errors: ['Route already exists'] }`
400 | An error occurred when saving | `{ success: false, errors: ['Error when saving route'] }`

## Route Basics

A route must contain a `name` property, as well as an array of `branches` which contain the conditions that must be true for CDN to select the route.

At a minimum, a route must take the following form. The `branches` array below contains a single branch with no conditions, representing the default recipe to use.

```json
{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail"
    }
  ]
}
```

## Branches

Each branch within the `branches` array should contain two properties, `recipe` and `condition`.

* `recipe` (string) - the name of the [Delivery Recipe](/cdn/concepts/recipes/) to use when all specified conditions are met

* `condition` (object) - contains properties that correspond to test types

```json
{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail-120",
      "condition": {
        "device": "desktop"
      }
    },
    {
      "recipe": "thumbnail-50"
    }
  ]
}
```

### Branch Evaluation

Branches are evaluated in the order they appear in the route. If a branch condition is not met, the branch is skipped and the next one evaluated.

The default case (where none of the conditions are met) is handled by a branch with a `recipe` but no `condition`, which is matched immediately. This branch must be last in the array, otherwise it may be used when you don't intend it to be.

## Conditions

### Device

The `device` condition matches the user's device type, based on the user-agent header sent in the request.

Possible values:

- `console`
- `desktop`
- `embedded`
- `mobile`
- `smarttv`
- `tablet`
- `wearable`

The `device` condition can test against a single device type:

```json
"condition": {
  "device": "mobile"
}
```

...or multiple device types:

```json
"condition": {
  "device": ["tablet", "smarttv"]
}
```

#### Default value

If a device type is specified that doesn't match one of the possible values above, CDN uses `desktop` in its place.


### Location

The `location` condition uses the IP address from the request and performs a GeoLocation lookup to obtain the user's approximate location.

CDN can perform the GeoLocation lookup using the [Maxmind GeoIP](http://dev.maxmind.com/geoip/) database (bundled with the application), or by making a request to any remote address (such as the DADI GeoLocation API).

#### Configuring CDN to use the Maxmind GeoIP database

To use the Maxmind GeoIP database CDN's main configuration file should contain the following block:

```json
"geolocation": {
  "enabled": true,
  "method": "maxmind",
  "countryDbPath": "vendor/maxmind-country.mmdb"
}
```

If no value is provided for `countryDbPath` it defaults to the one shown in the above example.

#### Configuring CDN for remote lookup

To use a remote lookup service, the `geolocation` block in CDN's main configuration file should specify a remote URI.

The URI format uses placeholders (shown below with curly braces) to indicate where CDN should insert the parameters required for the lookup.

**Placeholders**

* `{ip}` - the IP address to lookup
* `{key}` - *(optional)* an API key required to access the remote service
* `{secret}` - *(optional)* a secret key required to access the remote service

`{key}` and `{secret}` can be set either in the configuration file or as environment variables. Set the environment variables `GEOLOCATION_REMOTE_KEY` and `GEOLOCATION_REMOTE_SECRET` to enable CDN to read these values from the environment.

```json
"geolocation": {
  "enabled": true,
  "method": "remote",
  "url": "https://api.example.com/location/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r"
}
```

**Response format**

By default CDN expects a response from the remote service in the format used by the DADI GeoLocation service, where the path for the country code within the response is `location.country.isoCode`.

If the response format for the service you use differs (and it probably does), you can tell CDN where to find the country code in the response by adding a `path` property to the `geolocation` configuration block.

```json
"geolocation": {
  "enabled": true,
  "method": "remote",
  "url": "https://api.other-service.com/location/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r",
  "path": "results.address.country"
}
```

### Language

The `language` condition is based on the `Accept-Language` headers sent in the request. Values are ISO 639-1 language codes.

The following condition will be met if the request contains the header `Accept-Language: en`

```json
"condition": {
  "language": "en"
}
```

Language detection has support for [quality values](https://tools.ietf.org/html/rfc2616#section-14.4), which represent an estimate of the user's preference for multiple languages. By default only the main language (`quality = 1`) is used, but this can be changed by adding an optional `languageMinQuality` property to the condition, which adjusts the threshold.


```json
"condition": {
  "language": ["en", "pt"],
  "languageMinQuality": 0.5
}
```

### Network

Specifying the `network` condition in a route performs a remote lookup on a network connectivity API to determine the type of connection being used.

> **Note:** This condition tests for a *connection type* (e.g. `cable` or `mobile`) and not *connection speed*.

The condition can be specified as a single connection type:

```json
"condition": {
  "network": "cable"
}
```

...or as an array of multiple connection types:

```json
"condition": {
  "network": ["cable", "dsl"]
}
```

#### Configuration

The configuration block required for network connectivity lookups is similar to that used for GeoLocation.

```json
"network": {
  "url": "https://api.example.com/connectivity/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r"
}
```

The URI format uses placeholders (shown below with curly braces) to indicate where CDN should insert the parameters required for the lookup.

**Placeholders**

* `{ip}` - the IP address to lookup
* `{key}` - *(optional)* an API key required to access the remote service
* `{secret}` - *(optional)* a secret key required to access the remote service

`{key}` and `{secret}` can be set either in the configuration file or as environment variables. Set the environment variables `NETWORK_REMOTE_KEY` and `NETWORK_REMOTE_SECRET` to enable CDN to read these values from the environment.

**Response format**

By default CDN expects a response from the remote service in the format used by the DADI Network Connectivity service, where the path for the connection type within the response is `speed.connectionType`.

If the response format for the service you use differs (and it probably does), you can tell CDN where to find the connection type in the response by adding a `path` property to the `network` configuration block.

```json
"network": {
  "url": "https://api.other-service.com/connectivity/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r",
  "path": "results.connection.type"
}
```

## Caching

Caching is automatically enabled for routes. Depending on what's defined in the config, it uses Redis or the local filesystem.

## Example route

```json
{
  "route": "sample-route",
  "branches": [
    {
      "recipe": "thumbnail",
      "condition": {
        "device": "desktop",
        "language": "en",
        "country": [
          "GB",
          "US"
        ],
        "network": "cable"
      }
    },
    {
      "recipe": "thumbnail-lo-res",
      "condition": {
        "device": [
          "mobile",
          "tablet"
        ],
        "language": [
          "en",
          "pt"
        ],
        "country": "GB",
        "network": [
          "cable",
          "dsl"
        ]
      }
    },
    {
      "recipe": "default-recipe"
    }
  ]
}
```