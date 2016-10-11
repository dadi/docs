---
title: API Reference
layout: default
---

| Parameter     | Type          | Description |
| :------------ | :------------ | :---------- |
| trim | Boolean | Default: 0. Trims edges that are the background color |
| trimFuzz | Float | 0-1, default: 0. Trimmed color distance to edge color, 0 is exact |

| filter | String | Default: 0 (interpreted as 'none'). Resize filter. E.g. 'Lagrange', 'Lanczos'. See docs below for full list of filters |
| strip | Boolean | Default: 0. Strips comments out from image |
| rotate | Integer | Default: 0. Rotates an image. Degrees |

| devicePixelRatio | Integer | Default: 0. Zoom In/Out of Image |

### Parameters

#### [format](url/format)
Convert between image formats

#### [quality](url/quality)
Image compression level

#### [sharpen](url/sharpen)
Add sharpness to an image

#### [saturate](url/saturate)
Increase or decrease an image's saturation

#### [rotate](url/rotate)

#### [flip](url/flip)

#### [filter](url/filter)

#### [blur](url/blur)

### Size

#### [width](url/size/w)

#### [height](url/size/h)

#### [crop](url/size/crop)


### Quick Reference

Parameter|Abbreviated|Default| Options
----|-----------|-------|-------
format| fmt| | jpg, gif, png, json
quality| q| 75 | 0-100
sharpen| sh| 5 | 0-100
saturate| sat| 0.1 | -1-10
width| w| |
height| h| |
ratio| rx| |
cropX| cx| |
cropY| cy| |
crop| | |
resizeStyle| resize| 'aspectfill' | 'crop', 'fill', aspectfit, 'aspectfill', 'entropy'
devicePixelRatio| dpr| 1|
gravity| g| 'None' |
filter| f| 'lanczos' |
trim| t| |
trimFuzz| tf| |
blur| b| | 0-100
strip| s| |
rotate| r| |
flip| fl| | x, y, xy
