# DADI Identity

## Overview

DADI Identity is a session-based platform that provides and gaurentees the fact of an individual, issuing and persisting UUIDs over multiple product-level sessions, over long durations of time and across multiple products (it is a multi-tenancy application).

DADI Identity is only interested in the fact of an individual. It does not track interactions or otherwise make use of the UUIDs generated.

It works exclusively in the anonymous space and does not handle personally identifiable information.

DADI Identity is designed to work in tandem with other products, both from DADI and third parties. The UUIDs produced can be used to synchronise data from the anonymous space; to create and maintain user records from the point of first contact; to carry anonymous user data over to the known space when paired with a Single Sign On service; to facilitate programmatic advertising and to provide and enhance analytics.

## Contents

* Overview (this document)
* [Requirements](./docs/requirements.md)
* Setup, installation and use
	* [Setup and installation](./docs/setupAndInstallation.md)
	* [Configuration](./docs/configuration.md)
	* [Configuration notes](./docs/configurationNotes.md)
	* [Complete guide: Ubuntu](./docs/installGuide.ubuntu.md)
	* [In browser UUID provision](./docs/inBroswer.md)
	* [In app UUID provision](./docs/inApp.md)
	* [Record lookup](./docs/recordLookup.md)
* Theory and practice
	* [What constitutes an indvidual?](./docs/theIndividual.md)
	* [Collision probability](./docs/collisionProbability.md)
	* [Issuing process](./docs/issuingProcess.md)
	* [Session persistence](./docs/sessionPersistence.md)
	* [UUID generation](./docs/uuidGeneration.md)
	* [UUID matching](./docs/uuidMatching.md)
	* [Confidence scoring](./docs/confidenceScoring.md)
	* [The anonymous record](./docs/anonymousRecord.md)
* Approach to fingerprinting
	* [Device level fingerprints](./docs/deviceFingerprint.md)
	* [Geo fingerprinting](./docs/geoFingerprint.md)
	* [Network performance fingerprinting](./docs/networkFingerprint.md)
	* [ISP fingerprinting](./docs/ispFingerprint.md)
	* [Langauge fingerprinting](./docs/languageFingerprint.md)
	* [Browser-Agent fingerprinting](./docs/browserAgentFingerprint.md)
	* [IP matching](./docs/ipMatching.md)
* [Testing](./docs/testing.md)
* [Benchmarking](./docs/benchmarking.md)

## Core contributors

* James Lambie
* Joe Wagner
* Viktor Fero
* Joseph Denne