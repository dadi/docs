---
title: Session persistence
---

## Session persistence

DADI Identity can be thought of a session management platform. It generates absolutely unique UUIDs, and persists these for long timeframes in order to facilitate session-related tasks, such as user tracking, single sign on, programmatic advertising and machine learning.

UUIDs are capable of being persisted cross product, meaning that a signle organisation can take a multi-tennacy approach to tracking and CRM facilitated by DADI Identity.

Sessions are persisted through the use of multiple vectors:

* Cookies
* Local storage
* Etags

And they are enhanced through record matching using multiple fingerprints:

* [Device-level fingerprint](https://github.com/dadi/identity/blob/docs/docs/deviceFingerprint.md)
* [Geo fingerprint](https://github.com/dadi/identity/blob/docs/docs/geoFingerprint.md)
* [Network performance fingerprint](https://github.com/dadi/identity/blob/docs/docs/networkFingerprint.md)
* [ISP fingerprint](github.com/dadi/identity/blob/docs/docs/ispFingerprint.md)
* [Language fingerprint](https://github.com/dadi/identity/blob/docs/docs/languageFingerprint.md)
* [Browser agenct fingerprint](https://github.com/dadi/identity/blob/docs/docs/browserAgentFingerprint.md)
* [Protocol fingerprint](https://github.com/dadi/identity/blob/docs/docs/ipMatching.md)
