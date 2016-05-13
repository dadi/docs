# DADI CDN

## Overview

CDN is built on Node.JS, with support for S3 and Redis. It is a high performance, just-in-time asset manipulation and delivery layer designed as a modern content distribution solution.

You can consider a full installation of DADI CDN as being analogous to a traditional CDN (Content Distribution Network) such as Akamai or Limelight. It is designed to carry the processing and delivery load associated with image manipulation and asset delivery (CSS/JS/fonts). It acts autonomously as a layer on top of your core product.

It has full support for caching, header control, image manipulation, image compression and image format conversation. An authenticated API allows for fine grained cache control in the form of content invalidation on an individual file or collective path basis.

CDN is part of DADI, a suite of components covering the full development stack, built for performance and scale.

## Contents

* Overview (this document)
* [Requirements](./requirements.md)
* Setup, installation and use
	* [Setup and installation](./setupAndInstallation.md)
	* [Configuration](./configuration.md)
	* [Configuration notes](./configurationNotes.md)
	* [Complete guide: Ubuntu](./installGuide.ubuntu.md)
* Images
	* [Working with images](./workingWithImages.md)
	* [Image manipulation examples](./examples.imageManipulation.md)
	* [Image data](./imageData.md)
	* [Available filters](./availableFilters.md)
	* [Compression](./compression.md)
* JavaScript and CSS
	* [Working with JavaScript and CSS](./workingWithJavascriptAndCss.md)
	* [JavaScript and CSS examples](./examples.javascriptAndCss.md)
* [Delivery recipes](./deliveryRecipes.md)
* [Multi-domain support](./multiDomainSupport.md)
* [Invalidation API](./invalidationApi.md)
* [Response testing](./responseTesting.md)

## Core contributors

* Carl Buelow
* James Lambie
* Arthur Mingard
* Joseph Denne