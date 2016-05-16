---
title: Definition of individual
---

## What constitutes an indvidual?

DADI Identity is a session-based platform that issues and persists UUIDs over multiple product-level sessions and over a long duration of time (our standard persistence window is six months). It is also capable of persisting UUIDs over multiple products.

DADI Identity is only interested in the fact of an individual. It does not track interactions or otherwise make use of the UUIDs generated.

DADI Identity works exclusively in the anonymous space. It does not handle personally identifable information.

It is designed to work in tandom with other products, both from DADI and third parties. The UUIDs produced can be used to synchonise data form the anonymous space; to create and maintain user records from the point of first contact; and to carry anonymous user data over to the known space when paired with a Single Sign On service.

Issued UUIDs are always unique: a gauretee is proivded through through the us of [RFC 4122 v4](https://tools.ietf.org/html/rfc4122) along with a shared Redis layer in clustered environments.

For a probability asessment of collisions in issued UUIDs, see the [collision probably](LINK) document.

For a breakdown of our RFC 4122 v4 generator, see the [UUID generation](LINK) document.

DADI Identity _issues forwards_, meaning that if there is any doubt as to the fact of an individual, we simply issue a new UUID. When this happens, any previous match with a confidence score below 100% - in practice this means all previous matches - is linked as a child along with the confidence metric. This approach allows for the interrogation of a deeper data set in those cases where a UUID is not persisted over term, although our confidence in this data will be lower.
