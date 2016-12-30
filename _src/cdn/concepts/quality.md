---
title: Image compression quality
excerpt: Reduce file size by applying compression to images
order: 100
---

Applies compression to the image, reducing file size. Accepts any number from 1-100. If not specified, the default is 75.

> The `quality` parameter can be added to the querystring as either `q` or `quality`

The best results for quality and file size can be found around 40-60%, where we've found generated images to be visually indistinguishable from the source image.

> The original image and all quality variations below are 2048 × 1024 pixels.

`https://cdn.example.com/images/vegetables.jpg?q=50`

**Original image, 4.7MB**

![Original JPG](/assets/cdn/vegetables.jpg)

**Quality = 100%, 1.3MB**

![Quality 100](/assets/cdn/vegetables-full-quality-100.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)")

**Quality = 75%, 180kB**

![Quality 75](/assets/cdn/vegetables-full-quality-75.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)")

**Quality = 50%, 119kB**

![Quality 50](/assets/cdn/vegetables-full-quality-50.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)")

**Quality = 25%, 82kB**

![Quality 25](/assets/cdn/vegetables-full-quality-25.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)")

