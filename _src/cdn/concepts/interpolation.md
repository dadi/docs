---
title: Interpolation filter
excerpt: Choose the interpolation method when resizing images
order: 100
---

> **URL parameter:** `filter`, `f`

This parameter allows you to specify the interpolation method to use when resizing images. If not specified, the default is `lanczos`.

When reducing the size of an image (or downsampling), some image data is simply discarded. However when increasing image dimensions, the image is expanded and gaps must be "filled in". Each interpolation filter uses a different algorithm for determining how to fill the gaps.

Possible values:
 - `lanczos` (default)
 - `nearest-neighbor`
 - `linear`
 - `cubic`
 - `grid`
 - `moving-average`

## Example

```http
https://cdn.somedomain.tech/images/dog.jpg?width=600&height=400&resize=aspectfill&filter=linear
```

## Filters

### nearest-neighbor

The simplest approach to interpolation. Rather than calculating an average value by some weighting criteria or generating an intermediate value based on complicated rules, this method simply determines the "nearest" neighbouring pixel, and assumes the intensity value of it.

### linear

Considers the closest two pixels and takes a weighted average to arrive at its final interpolated value. Results in a much smoother image than `nearest-neighbor`.

### cubic

Images resampled with cubic interpolation are smoother and have fewer interpolation artifacts, but processing is slower than with `linear` or `nearest-neighbor`.

### lanczos

Tends to reduce aliasing artifacts and preserve sharp edges. [It has been considered the "best compromise"](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.116.7898) among several simple filters for this purpose.