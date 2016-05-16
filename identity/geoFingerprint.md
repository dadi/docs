---
title: Geo fingerprint
---

## Geo fingerprint

The geographical fingerprint is generated within the applicaiton itself using IP>location detection provided by [MaxMind](https://www.maxmind.com).

### Fingerprint example

The geo fingerprint is created using [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash).

Output:

	-1284775475

### Database persistence

DADI Identity does nothing with the geo data returned other than generate a fingerprint. As this fingerprint is used for confidence scoring when calculating UUID matches over time, the database itself must not change. It is therefore kept consistent in the Identity repository.

Any updates to the dataset will have the effect of invalidating all historical UUIDs within your implementation, so handle with care.
