# DADI Identity / Documentation

![Build Status](http://img.shields.io/badge/Release-0.2.1-green.svg?style=flat-square)&nbsp;![Coverage](https://img.shields.io/badge/Coverage-100%-yellow.svg?style=flat-square)

## Overview

DADI Identity is a session-based platform that provides and gaurentees the fact of an individual, issuing and persisting UUIDs over multiple product-level sessions, over long durations of time and across multiple products (it is a multi-tenancy application).

DADI Identity is only interested in the fact of an individual. It does not track interactions or otherwise make use of the UUIDs generated.

It works exclusively in the anonymous space and does not handle personally identifiable information.

DADI Identity is designed to work in tandem with other products, both from DADI and third parties. The UUIDs produced can be used to synchronise data from the anonymous space; to create and maintain user records from the point of first contact; to carry anonymous user data over to the known space when paired with a Single Sign On service; to facilitate programmatic advertising and to provide and enhance analytics.

## Contents

* Overview (this document)
* [Requirements](https://github.com/dadi/identity/blob/docs/docs/requirements.md)
* Setup, installation and use
	* [Setup and installation](https://github.com/dadi/identity/blob/docs/docs/setupAndInstallation.md)
	* [Configuration](https://github.com/dadi/identity/blob/docs/docs/configuration.md)
	* [Configuration notes](https://github.com/dadi/identity/blob/docs/docs/configurationNotes.md)
	* [Complete guide: Ubuntu](https://github.com/dadi/identity/blob/docs/docs/installGuide.ubuntu.md)
	* [In browser UUID provision](https://github.com/dadi/identity/blob/docs/docs/inBroswer.md)
	* [In app UUID provision](https://github.com/dadi/identity/blob/docs/docs/inApp.md)
	* [Record lookup](https://github.com/dadi/identity/blob/docs/docs/recordLookup.md)
* Theory and practice
	* [What constitutes an indvidual?](https://github.com/dadi/identity/blob/docs/docs/theIndividual.md)
	* [Collision probability](https://github.com/dadi/identity/blob/docs/docs/collisionProbability.md)
	* [Issuing process](https://github.com/dadi/identity/blob/docs/docs/issuingProcess.md)
	* [Session persistence](https://github.com/dadi/identity/blob/docs/docs/sessionPersistence.md)
	* [UUID generation](https://github.com/dadi/identity/blob/docs/docs/uuidGeneration.md)
	* [UUID matching](https://github.com/dadi/identity/blob/docs/docs/uuidMatching.md)
	* [Confidence scoring](https://github.com/dadi/identity/blob/docs/docs/confidenceScoring.md)
	* [The anonymous record](https://github.com/dadi/identity/blob/docs/docs/anonymousRecord.md)
* Approach to fingerprinting
	* [Device level fingerprints](https://github.com/dadi/identity/blob/docs/docs/deviceFingerprint.md)
	* [Geo fingerprinting](https://github.com/dadi/identity/blob/docs/docs/geoFingerprint.md)
	* [Network performance fingerprinting](https://github.com/dadi/identity/blob/docs/docs/networkFingerprint.md)
	* [ISP fingerprinting](https://github.com/dadi/identity/blob/docs/docs/ispFingerprint.md)
	* [Langauge fingerprinting](https://github.com/dadi/identity/blob/docs/docs/languageFingerprint.md)
	* [Browser-Agent fingerprinting](https://github.com/dadi/identity/blob/docs/docs/browserAgentFingerprint.md)
	* [IP matching](https://github.com/dadi/identity/blob/docs/docs/ipMatching.md)
* [Testing](https://github.com/dadi/identity/blob/docs/docs/testing.md)
* [Benchmarking](https://github.com/dadi/identity/blob/docs/docs/benchmarking.md)
* [Development](https://github.com/dadi/identity/blob/docs/docs/development.md)
* [Contributing](https://github.com/dadi/docs/blob/master/CONTRIBUTING.md)
* [License](https://github.com/dadi/identity/blob/docs/docs/license.md)
