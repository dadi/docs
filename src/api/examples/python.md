---
title: Python
---

## Authentication

Every request to DADI API requires a `bearer` token which should be passed as a header.
Obtain a token by sending a POST request to API's `/token` endpoint, passing your client credentials in the body of the request:

```python
from urllib2 import Request, urlopen

credentials = """
  {
    "clientId": "your-client-id",
    "secret": "your-client-secret"
  }
"""

headers = {
  'Content-Type': 'application/json'
}

request = Request('http://api.example.com/1.0/example-database/example-collection', data=credentials, headers=headers)

response_body = urlopen(request).read()
print response_body
```

## Querying a collection

Once you have a token, each request to the API should include an `authorization` header containing the token.

```python
from urllib2 import Request, urlopen

headers = {
  'Authorization': 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
  'Content-Type': 'application/json'
}

request = Request('http://api.example.com/1.0/example-database/example-collection', headers=headers)

response_body = urlopen(request).read()
print response_body
```