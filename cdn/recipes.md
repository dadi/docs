---
title: Delivery Recipes
layout: default
---

## Delivery recipes

A Delivery Recipe is a predefined set of image manipulation parameters stored in a JSON file. that are applied

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

## Using a recepe

Making use of a recepe is simple: call your image via the recipe name defined in the recepe JSON.

For example:

`http://youdomain.com/example-recipe-name/image-filename.png`
