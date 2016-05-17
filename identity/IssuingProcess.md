---
title: Issuing process
---

DADI Identity issues-forward, meaning that a new UUID is provided whenever a request hits the issuing layer within the application.

A request for a UUID is made if local lookups for an existing UUID return false within the requesting browser of app.

Requests for a UUID are made using a device-level fingerprint. This fingerprint is stored in the UUID record, but is not used as part of the issuing process.

DADI Identity responds to UUID requests with a persistant ETag, meaning that a previously issued UUID will be cached in the device. In this eventuality, no new UUID is generated.

If a request for a UUID has not been prviously cached, a new UUID will be generated and a record for the UUID created within Redis.
