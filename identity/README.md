---
title: Identity
---

| Github   | [https://github.com/dadi/identity](https://github.com/dadi/identity) |
| NPM      | [npm install @dadi/identity](https://www.npmjs.com/package/@dadi/identity) |

## Overview

DADI Identity is a session-based platform that provides and gaurentees the fact of an individual, issuing and persisting UUIDs over multiple product-level sessions, over long durations of time and across multiple products (it is a multi-tenancy application).

DADI Identity is only interested in the fact of an individual. It does not track interactions or otherwise make use of the UUIDs generated.

It works exclusively in the anonymous space and does not handle personally identifiable information.

DADI Identity is designed to work in tandem with other products, both from DADI and third parties. The UUIDs produced can be used to synchronise data from the anonymous space; to create and maintain user records from the point of first contact; to carry anonymous user data over to the known space when paired with a Single Sign On service; to facilitate programmatic advertising and to provide and enhance analytics.

## Contents

* Overview (this document)
* [Requirements](./requirements.md)
* Setup, installation and use
	* [Setup and installation](./setupAndInstallation.md)
	* [Configuration](./configuration.md)
	* [Configuration notes](./configurationNotes.md)
	* [Complete guide: Ubuntu](./installGuide.ubuntu.md)
	* [In browser UUID provision](./inBroswer.md)
	* [In app UUID provision](./inApp.md)
	* [Record lookup](./recordLookup.md)
* Theory and practice
	* [What constitutes an indvidual?](./theIndividual.md)
	* [Collision probability](./collisionProbability.md)
	* [Issuing process](./issuingProcess.md)
	* [Session persistence](./sessionPersistence.md)
	* [UUID generation](./uuidGeneration.md)
	* [UUID matching](./uuidMatching.md)
	* [Confidence scoring](./confidenceScoring.md)
	* [The anonymous record](./anonymousRecord.md)
* Approach to fingerprinting
	* [Device level fingerprints](./deviceFingerprint.md)
	* [Geo fingerprinting](./geoFingerprint.md)
	* [Network performance fingerprinting](./networkFingerprint.md)
	* [ISP fingerprinting](./ispFingerprint.md)
	* [Langauge fingerprinting](./languageFingerprint.md)
	* [Browser-Agent fingerprinting](./browserAgentFingerprint.md)
	* [IP matching](./ipMatching.md)
* [Testing](./testing.md)
* [Benchmarking](./benchmarking.md)

## Core contributors

* James Lambie
* Joe Wagner
* Viktor Fero
* Joseph Denne