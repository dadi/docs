# DADI Track

## Overview

DADI Track is a real time data visualisation layer built around the concept of events. It makes use of Node's non-blocking architecture to present a 1:1 view of tracked activity within a platform.

Events can be sent to DADI Track from a client device or from within the Bantam stack.

DADI Track is deliberately lightweight: it is not intended as a long term data storage solution or as a replacement to existing tracking tools such as Google Analytics or the wider DADI+ platform; rather it is designed to facilitate real time data dash boarding.

## Contents

* Overview (this document)
* [Requirements](https://github.com/dadi/track/blob/docs/docs/requirements.md)
* [Architectural overview](https://github.com/dadi/track/blob/docs/docs/architecturalOverview.md)
* Setup, installation and use
	* [Setup and installation](https://github.com/dadi/track/blob/docs/docs/setupAndInstallation.md)
	* [Configuration](https://github.com/dadi/track/blob/docs/docs/configuration.md)
	* [Complete guide: Ubuntu](https://github.com/dadi/track/blob/docs/docs/installGuide.ubuntu.md)
	* [Data stores](https://github.com/dadi/track/blob/docs/docs/dataStores.md)
	* [Deployment](https://github.com/dadi/track/blob/docs/docs/deployment)
* Customisation
	* [Logging customisation](https://github.com/dadi/track/blob/docs/docs/loggingCustomisation.md)
	* [Display customisation](https://github.com/dadi/track/blob/docs/docs/displayCustomisation.md)
* [Tracking](https://github.com/dadi/track/blob/docs/docs/tracking.md)

## Development

DADI is based on an original concept by Joseph Denne.

DADI API was conceived, developed and is maintained by the engineering team at DADI+ ([https://dadi.co](https://dadi.co)).

Core contributors:

* Joe Wagner
* Joseph Denne

Feel free to contact the DADI core development team on team@dadi.tech with questions.

### Roadmap

We use the issues log in Github for roadmapping. If you have anything to contribute in terms of future direction, please add as an feature request within [issues](https://github.com/dadi/api/issues).

### Versioning

Semantic Versioning 2.0.0

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

_Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format._