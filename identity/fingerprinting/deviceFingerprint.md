---
title: Device fingerprint
---

The device-level fingerprint is generated from a broad array of available data wihtin a browser context and through the use of a drop-in library for mobile apps.

DADI Identity fingerprints at browser level currently have a uniqueness of 87.44%. Fingerprints at app level have a uniqueness of 100%.

## Browser based

## Fingerprint example

	dfe3327991a9e4521980986a02cb3071

### Usage

	new deviceId().get(function(result, components){
	  console.log(result); // A hash, representing your device fingerprint
	  console.log(components); // an array of FP components
	});

#### You can pass an object with options (all of which are optional):

	var options = { excludeUserAgent: true, excludeLanguage: true };
	new Fingerprint2(options).get(function(result){
	  console.log(result);
	});

#### Options

JS font enumeration can be used by to return a list of available fonts, but performance as been found to be slow in many cases, especially on sites making heavy use of JavaScript. For this reason font dectection is disabled in the standard package.

To enable JS enumeration, simple remove:

	excludeJsFonts: true

...within the main dadi.js file and then reminify it before pushing to live.

Full option list:

| Option | Description |
|--------|-------------|
| swfContainerId | Specifies the dom element ID to be used for swf embedding. `dadiSwf` by default |
| excludeUserAgent | [User agent](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) should not take part in FP calculation |
| excludeLanguage | [Browser language](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language) |
| excludeColorDepth | [Colour depth](https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth) |
| excludeScreenResolution | Screen resolution |
| excludeTimezoneOffset | User time zone |
| excludeSessionStorage | User browser support of session storage |
| excludeIndexedDB | User browser support of IndexedDB |
| excludeAddBehavior | IE specific 'AddBehavior' method detection |
| excludeOpenDatabase | User browser support of OpenDatabase |
| excludeCpuClass | Detection of CPU class |
| excludePlatform | Detection of OS platform |
| excludeDoNotTrack | is DoNotTrack set |
| excludeCanvas | Skip canvas fingerprinting entirely (you will most likely not need to set this to true) |
| excludeWebGL | Skip WebGL fingerprinting |
| excludeAdBlock | Skip AdBlock detection |
| excludeHasLiedLanguages | Skip check if user is trying to hide his browser language |
| excludeHasLiedResolution | Skip check if user is trying to hide his screen resolution |
| excludeHasLiedOs | Skip check if user is trying to hide his OS info |
| excludeHasLiedBrowser | Skip check if user is trying to hide his browser information |
| excludeJsFonts | Skip font detection with CSS "side channel" (disabled by default) |
| excludePlugins | Skip plugin enumeration/detection |
| excludeTouchSupport | Skip touch screen specific info fingerprinting |

_Note: `detectScreenOrientation` option is `true` by default to ensure consistent fingerprints when users rotate their mobile
devices_

_Note: all fingerprinting sources are enabled by default, i.e. you don't need to explicitly configure the library to include them_

Example usage:

	new deviceId().get(function(result, components){
	  // this will use all available fingerprinting sources
	  console.log(result);
	  // components is an array of all fingerprinting components used
	  console.log(components);
	});

#### List of fingerprinting sources

1. UserAgent
2. Language
3. Color Depth
4. Screen Resolution
5. Timezone
6. Has session storage or not
7. Has local storage or not
8. Has indexed DB
9. Has IE specific 'AddBehavior'
10. Has open DB
11. CPU class
12. Platform
13. DoNotTrack or not
14. Full list of installed fonts (maintaining their order, which increases the entropy), implemented with Flash.
15. A list of installed fonts, detected with JS/CSS (side-channel technique) - can detect up to 500 installed fonts without flash
16. Canvas fingerprinting
17. WebGL fingerprinting
18. Plugins (IE included)
19. Is AdBlock installed or not
20. Has the user tampered with its languages <sup>[1](https://github.com/Valve/fingerprintjs2/wiki/Browser-tampering)</sup>
21. Has the user tampered with its screen resolution <sup>[1](https://github.com/Valve/fingerprintjs2/wiki/Browser-tampering)</sup>
22. Has the user tampered with its OS <sup>[1](https://github.com/Valve/fingerprintjs2/wiki/Browser-tampering)</sup>
23. Has the user tampered with its browser <sup>[1](https://github.com/Valve/fingerprintjs2/wiki/Browser-tampering)</sup>
24. Touch screen detection and capabilities

By default, JS font detection will only detect up to 65 installed fonts. If you want to improve the font detection,
you can pass `extendedFontList: true` option. This will increase the number of detectable fonts to ~500.

### Performance

In testing the default FP process takes about 80-100ms. If you enable JS enurmeration for fonts and use the `extendedFontList` option this time will increase up to 200-600ms.

This option can incur even more overhead on mobile Firefox browsers, which is much slower in font detection, so use it with caution.

-

## App based

### iOS

### Android

### Windows phone
