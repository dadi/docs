---
title: Delivery Recipes
layout: default.html
---

## Introduction

A Delivery Recipe is a predefined set of image manipulation parameters stored in a JSON file and applied to images at the time of request.

Let's use the image from our magazine example.
`https://cdn.example.com/thumbnail/images/man-walking-on-beach.jpg`

`https://cdn.example.com/images/man-walking-on-beach.jpg?width=100&height=100&resizeStyle=entropy`

![Thumbnail image, 100 × 100 px, 9kB](assets/thumbnail-100x100.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")


Recipes are defined in JSON files held in the `/workspace/recipes` folder.

**Example recipe**

```js
{
  "recipe": "thumbnail",
  "settings": {
    "format": "jpg",
    "quality": "80",
    "width": "100",
    "height": "100",
    "resizeStyle": "entropy"
  }
}
```

## Using a recipe

Making use of a recipe is simple: call your image via the recipe name defined in the recipe JSON.

For example:

`http://cdn.example.com/thumbnail/image-filename.png`
