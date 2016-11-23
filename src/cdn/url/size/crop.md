---
title: Crop
---

## crop

* [resize](#resize)
  * [aspectfill](#aspectfill)
    * gravity
  * [aspectfit](#aspectfit)
  * [fill](#fill)
  * [entropy](#entropy)
  * [crop](#crop)
* [ratio](#ratio)

### resize
#### aspectfill

Keeps the aspect ratio of the original image and generates an output image of the specified width and height.

> **Note:** The output image may be cropped, however by specifying the `gravity` parameter you can tell CDN which part of the image should be retained.

##### gravity

Used to position the crop area. Available options: `NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast`, `None`

##### Example

**Original image**

![](../../../assets/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

> In each example, the output image is 400 x 300 pixels.

**g=North**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=North`

![](../../../assets/med-portrait-north.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

**g=Center**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=Center`

![](../../../assets/med-portrait-center.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

**g=South**

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=South`

![](../../../assets/med-portrait-south.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

#### aspectfit

Keeps the aspect ratio of the original image and generates an output image with the maximum dimensions that fit inside the specified width and height.

##### Example

`https://cdn.example.com/images/canoe.jpg?w=400&h=300&resize=aspectfit`

The output image is 400 x 267 pixels.

![](../../../assets/canoe-w400-h300-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

#### fill

Ignores the aspect ratio of the original image and generates an output image with specified width and height.

The output image may appear squashed or stretched.

##### Example

`https://cdn.example.com/images/canoe.jpg?w=400&h=300&resize=fill`

The output image is 400 x 300 pixels.

![](../../../assets/canoe-w400-h300-fill.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

#### entropy

Crops the image using a technique that determines the most important areas. Areas of higher contrast are considered more important, and images are often cropped to remove large areas of static color.

##### Example

**Original image**

![](../../../assets/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

`https://cdn.example.com/images/med-portrait.jpg?w=400&h=300&resize=entropy`

![](../../../assets/med-portrait-entropy.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

#### crop

| crop-x | Integer | Default: 0. X position of crop area |
| crop-y | Integer | Default: 0. Y position of crop area |

#### ratio

xx