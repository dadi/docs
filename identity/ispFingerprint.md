---
title: ISP fingerprint
---

The ISP fingerprint is generated within the applicaiton itself using IP>ISP detection provided by [MaxMind](https://www.maxmind.com).

## Fingerprint example

The ISP fingerprint is created using [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash).

Output:

	-728495832

## Database persistence

DADI Identity does nothing with the ISP data returned other than generate a fingerprint. As this fingerprint is used for confidence scoring when calculating UUID matches over time, the database itself must not change. It is therefore kept consistent in the Identity repository.

Any updates to the dataset will have the effect of invalidating all historical UUIDs within your implementation, so handle with care.
