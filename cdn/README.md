# DADI CDN

## Overview

CDN is built on Node.JS, with support for S3 and Redis. It is a high performance, just-in-time asset manipulation and delivery layer designed as a modern content distribution solution.

You can consider a full installation of DADI CDN as being analogous to a traditional CDN (Content Distribution Network) such as Akamai or Limelight. It is designed to carry the processing and delivery load associated with image manipulation and asset delivery (CSS/JS/fonts). It acts autonomously as a layer on top of your core product.

It has full support for caching, header control, image manipulation, image compression and image format conversation. An authenticated API allows for fine grained cache control in the form of content invalidation on an individual file or collective path basis.

CDN is part of DADI, a suite of components covering the full development stack, built for performance and scale.

## Contents

* Overview (this document)
* [Requirements](https://github.com/dadi/cdn/blob/docs/docs/requirements.md)
* Setup, installation and use
	* [Setup and installation](https://github.com/dadi/cdn/blob/docs/docs/setupAndInstallation.md)
	* [Configuration](https://github.com/dadi/cdn/blob/docs/docs/configuration.md)
	* [Configuration notes](https://github.com/dadi/cdn/blob/docs/docs/configurationNotes.md)
	* [Complete guide: Ubuntu](https://github.com/dadi/cdn/blob/docs/docs/installGuide.ubuntu.md)
* Images
	* [Working with images](https://github.com/dadi/cdn/blob/docs/docs/workingWithImages.md)
	* [Image manipulation examples](https://github.com/dadi/cdn/blob/docs/docs/examples.imageManipulation.md)
	* [Image data](https://github.com/dadi/cdn/blob/docs/docs/imageData.md)
	* [Available filters](https://github.com/dadi/cdn/blob/docs/docs/availableFilters.md)
	* [Compression](https://github.com/dadi/cdn/blob/docs/docs/compression.md)
* JavaScript and CSS
	* [Working with JavaScript and CSS](https://github.com/dadi/cdn/blob/docs/docs/workingWithJavascriptAndCss.md)
	* [JavaScript and CSS examples](https://github.com/dadi/cdn/blob/docs/docs/examples.javascriptAndCss.md)
* [Delivery recipes](https://github.com/dadi/cdn/blob/docs/docs/deliveryRecipes.md)
* [Multi-domain support](https://github.com/dadi/cdn/blob/docs/docs/multiDomainSupport.md)
* [Invalidation API](https://github.com/dadi/cdn/blob/docs/docs/invalidationApi.md)
* [Response testing](https://github.com/dadi/cdn/blob/docs/docs/responseTesting.md)

## Development

DADI is based on an original concept by Joseph Denne.

DADI CDN was conceived, developed and is maintained by the engineering team at DADI+ ([https://dadi.co](https://dadi.co)).

Core contributors:

* Carl Buelow
* James Lambie
* Arthur Mingard
* Joseph Denne

Feel free to contact the DADI core development team on team@dadi.tech with questions.

### Roadmap

We use the issues log in Github for roadmapping. If you have anything to contribute in terms of future direction, please add as an feature request within [issues](https://github.com/dadi/cdn/issues).

### Versioning

Semantic Versioning 2.0.0

Given a version number MAJOR.MINOR.PATCH, increment the:

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

_Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format._