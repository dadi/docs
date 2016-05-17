---
title: In browser UUID provision
---

UUIDs are issued in browser through the use of first-party client-side JavaScript (dadi.min.js). The first party JavaScript loads in additional components from DADI Identity, including a one-time password (OTP) for aithentication back to the `touch` endpoint (used for maintaining the `count` metric within the UUID record.

The client-side JavaScript:

1. Generates a device fingerprint
2. Checks for an existing UUID in the browser's cookie and local stores
3. Requests a UUID from DADI Identity when an existing UUID is not found
4. Sends a request to the `touch` endpoint to increment the UUID records count metric

## dadi.min.js

`dadi.min.js` must be served under the domain of the product/website as first party JavaScript.

You can access the minified JavaScript [here](https://github.com/dadi/identity/blob/client-js/min/dadi.min.js). The unpacked JavaScript can be fond [here](https://github.com/dadi/identity/blob/client-js/dadi.js).

Minification is handled with Closure Compiler.

## Loading the JavaScript

`dadi.min.js` is loading using a [simple loader](https://github.com/dadi/identity/blob/client-js/loader.html) that should be embedded before the closign `body` tag on every page of the product/website.

### Loader JavaScript

    <!-- Start DADI+ -->
    <script type="text/javascript">
      var _dq = _dq || [];
      (function() {

        // Path to dadi.min.js
        _dq.push(['_location', 'min/dadi.min.js']);

        // Do not edit below this line
        var dadi = document.createElement('script'); dadi.type = 'text/javascript'; dadi.async = true;
        dadi.src = ('file:' == document.location.protocol ? _dq[0][1] :
        ('https:' == document.location.protocol ? 'https://' : 'http://') + document.location.host + '/' + _dq[0][1]);
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(dadi, s);
      })();
    </script>
    <!-- End DADI+ -->

Make sure that `_dq.push(['_location', 'min/dadi.min.js']);` contains the location of the `dadi.min.js` on your server.

## Additional JavaScript components

`dadi.min.js` laods in additional components for the handling of device-level fingerprinting and local storage. These are loaded from DADI Identity directly:

`/{VERSION}/components/{SET}`

Components are delviered minified. Minification is handled with Closure Compiler.

### Fingerprinting

Called from `/{VERSION}/components/_set1`. For example: [https://id.dadi.tech/v1/components/_set1](https://id.dadi.tech/v1/components/_set1)

The source for `_set1` can be found [here](https://github.com/dadi/identity/blob/master/src/_set1.js)

### Local storage

Called from `/{VERSION}/components/_set2`. For example: [https://id.dadi.tech/v1/components/_set1](https://id.dadi.tech/v1/components/_set2)

The source for `_set2` can be found [here](https://github.com/dadi/identity/blob/master/src/_set2.js)

## Debug mode

`dadi.js` includes a debug option which when set to `true` will output state information via the browsers console.

## Performance

DADI Identity typically loads and returns a UUID within 0.250ms.
