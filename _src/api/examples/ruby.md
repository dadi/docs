---
title: Ruby
---

## Authentication

Every request to DADI API requires a `bearer` token which should be passed as a header.
Obtain a token by sending a POST request to API's `/token` endpoint, passing your client credentials in the body of the request.

```bash
gem install rest-client
```

```ruby
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest-client'

credentials = '{
  "clientId": "your-client-id",
  "secret": "your-client-secret"
}'

headers = {
  :content_type => 'application/json'
}

response = RestClient.post 'http://api.example.com/token', credentials, headers
puts response
```


## Querying a collection

Once you have a token, each request to the API should include an `authorization` header containing the token.

```ruby
require 'rubygems' if RUBY_VERSION < '1.9'
require 'rest-client'

headers = {
  :authorization => 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
  :content_type => 'application/json'
}

response = RestClient.get 'http://api.example.com/1.0/example-database/example-collection', headers
puts response
```