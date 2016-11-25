---
title: Resizing an image
---

## Width

The width (`w`) of the required output image, in pixels.

If only `w` is specified, the `h (height)` dimension will be _set to the height of the original image_. If you'd like to ensure the output image retains the aspect ratio of the original image, please ensure `resize=aspectfit` is specified.

If both width and height are omitted, the original image’s dimensions are used.

> **Security Note:** The maximum output image size can be specified in the configuration file.

The `security` setting allows you to set a maximum width and height for generated images. This prevents the potential for a DOS attack based on the repeated generation of large images which could push your platform offline by exhausting CPU and/or available memory.

You should set this to the maximum size required for images in your application.

```js
"security": {
  "maxWidth": 2048,
  "maxHeight": 1024
}
```

### Example

`https://cdn.example.com/images/canoe.jpg?w=400&resize=aspectfit`

**Original image**

![Original JPG](/cdn/assets/canoe.jpeg)

**w=400**

![Width 400](/cdn/assets/canoe-w400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

**w=400&resize=aspectfit**

![Width 400, Aspect Fit](/cdn/assets/canoe-w400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")


## Height

The height (`h`) of the required output image, in pixels.

If only `h` is specified, the `w (width)` dimension will be _set to the width of the original image_. If you'd like to ensure the output image retains the aspect ratio of the original image, please ensure `resize=aspectfit` is specified.

If both width and height are omitted, the original image’s dimensions are used.

> **Security Note:** The maximum output image size can be specified in the configuration file.

The `security` setting allows you to set a maximum width and height for generated images. This prevents the potential for a DOS attack based on the repeated generation of large images which could push your platform offline by exhausting CPU and/or available memory.

You should set this to the maximum size required for images in your application.

```js
"security": {
  "maxWidth": 2048,
  "maxHeight": 1024
}
```

### Example

`https://cdn.example.com/images/canoe.jpg?h=400&resize=aspectfit`

**Original image**

![Original JPG](/cdn/assets/canoe.jpeg)

**h=400**

![Height 400](/cdn/assets/canoe-h400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

**h=400&resize=aspectfit**

![Height 400, Aspect Fit](/cdn/assets/canoe-h400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

## Aspect ratio

A width (`w`) or (`h`) can be provided with the addition of the variable `ratio` to give back a cropped version of the image to the specificed ratio. [Resize styles](/cdn/concepts/cropping/) are respected.

```bash
https://cdn.example.com/images/canoe.jpg?h=400&amp;ratio=16-9
```