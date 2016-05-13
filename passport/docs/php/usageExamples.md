# DADI Passport

## Usage examples

Passport will expose a single method (`get()`), which will return different things based on the arity of its call. If there is only one argument, the return value will be a string with a bearer token.

*Getting a bearer token:*

```php
$options = array(
    'issuer' => array(
        'uri' => 'http://my-api.dadi.tech',
        'port' => 80, // Optional. Defaults to 80
        'endpoint' => '/token' // Optional. Defaults to '/token'
    ),
    'credentials' => array(
        'clientId' => 'johndoe',
        'secret' => 'f00b4r'
    ),
    'wallet' => '\dadi\PassportFileWallet',
    'walletOptions' => array(
        'path' => 'token.txt'
    )
);

$bearerToken = \dadi\Passport::get($options);
```

If a function is passed as a second argument, Passport will return an instance of a class capable of making an HTTP request, with the authorisation headers automatically injected. At present, only [cURL](http://php.net/manual/en/book.curl.php) is supported, but other implementations can be added in the future.

*Using request injection option with cURL:*

```php
$options = array(
    'issuer' => array(
        'uri' => 'http://my-api.dadi.tech',
        'port' => 80, // Optional. Defaults to 80
        'endpoint' => '/token' // Optional. Defaults to '/token'
    ),
    'credentials' => array(
        'clientId' => 'johndoe',
        'secret' => 'f00b4r'
    ),
    'wallet' => '\dadi\PassportFileWallet',
    'walletOptions' => array(
        'path' => 'token.txt'
    )
);

$request = \dadi\Passport::get($options, 'curl');

// Making an API call with the cURL instance
curl_setopt($request, CURLOPT_URL, "http://my-api.dadi.tech/v1/test/collection");
curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

print($response);
```
