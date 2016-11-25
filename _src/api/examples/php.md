---
title: PHP
---

## Authentication

Every request to DADI API requires a `bearer` token which should be passed as a header.
Obtain a token by sending a POST request to API's `/token` endpoint, passing your client credentials in the body of the request:

```php
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://api.example.com/token");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_POST, TRUE);

curl_setopt($ch, CURLOPT_POSTFIELDS, "{
  \"clientId\": \"your-client-id\",
  \"secret\": \"your-client-secret\"
}");

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Content-Type: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
```

## Querying a collection

Once you have a token, each request to the API should include an `authorization` header containing the token.


```php
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://api.example.com/1.0/example-database/example-collection");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6",
  "Content-Type: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

var_dump($response);
```