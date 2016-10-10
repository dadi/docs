---
title: HTTP Status codes
layout: default
---

## Overview

[TODO]

### Success Codes

Status Code       | Description        |  
:----------------|:------------
200 OK | Returned for all successful requests. A query that returns no data will still return `200 OK`. |  
201 Created |  |
204 No Content | Returned following a successful DELETE request, provided the `feedback` configuration setting is `false`. |


### Error Codes

Status Code       | Description        |  
:----------------|:------------
400 Bad Request | Returned if a query contains a `$where` operator, or if a request fails validation according to the rules specified in the collection schema.  |
401 Unauthorized | Returned in response to a missing Authorization header, or an invalid or expired token. |
404 Not Found | The resource was not found at the specified URL. |


### Failure Codes

Status Code       | Description        |  
:----------------|:------------
500 Internal Server Error |  |
