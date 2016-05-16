---
title: Network performance fingerprint
---

## Network performance fingerprint

The network performance fingerprint is generated within the applicaiton itself using IP>network detection provided by [MaxMind](https://www.maxmind.com).

### Fingerprint example

The network performance fingerprint is created using [MurmurHash3](https://en.wikipedia.org/wiki/MurmurHash).

Output:

	-438796388

### Database persistence

DADI Identity does nothing with the network performance data returned other than generate a fingerprint. As this fingerprint is used for confidence scoring when calculating UUID matches over time, the database itself must not change. It is therefore kept consistent in the Identity repository.

Any updates to the dataset will have the effect of invalidating all historical UUIDs within your implementation, so handle with care.

### Future revisions

An internally generated throughput fingerprint is planned and will either replace, or be used in addition to, this fingerprint.
