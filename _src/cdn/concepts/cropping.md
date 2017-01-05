---
title: Cropping an image
excerpt: Crop and resize images
order: 100
---

xxx

## resize

### aspectfill

Keeps the aspect ratio of the original image and generates an output image of the specified width and height.

> **Note:** The output image may be cropped, however by specifying the `gravity` parameter you can tell CDN which part of the image should be retained.

### gravity

Used to position the crop area. Available options (case sensitive): `northwest`, `north`, `northeast`, `west`, `center`, `east`, `southWest`, `south`, `southeast`, `none`

**Example**

**Original image**

![](/assets/cdn/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

> In each example, the output image is 400 x 300 pixels.

**g=North**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=North`

![](/assets/cdn/med-portrait-north.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

**g=Center**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=Center`

![](/assets/cdn/med-portrait-center.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

**g=South**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=South`

![](/assets/cdn/med-portrait-south.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

### aspectfit

Keeps the aspect ratio of the original image and generates an output image with the maximum dimensions that fit inside the specified width and height.

**Example**

`https://cdn.example.com/images/canoe.jpg?w=400&h=300&resize=aspectfit`

The output image is 400 x 267 pixels.

![](/assets/cdn/canoe-w400-h300-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

### fill

Ignores the aspect ratio of the original image and generates an output image with specified width and height. _The output image may appear squashed or stretched._

**Example**

`https://cdn.example.com/images/canoe.jpg?w=400&h=300&resize=fill`

The output image is 400 x 300 pixels.

![](/assets/cdn/canoe-w400-h300-fill.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

### entropy

Crops the image using a technique that determines the most important areas. Areas of higher contrast are considered more important, and images are often cropped to remove large areas of static color.

**Example**

**Original image**

![](/assets/cdn/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=entropy`

![](/assets/cdn/med-portrait-entropy.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

### crop

| crop-x | Integer | Default: 0. X position of crop area |
| crop-y | Integer | Default: 0. Y position of crop area |

When `resize=crop` an additional `crop` parameter must be used to specify the coordinates of the crop rectangle. There are two ways to pass the crop rectangle coordinates:

#### Specify only the top left corner of the rectangle

`?resize=crop&crop=10,15`


#### Specify the top left corner and the bottom right corner of the rectangle

`?resize=crop&crop=10,15,200,300`

