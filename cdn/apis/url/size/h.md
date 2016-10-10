---
title: Height
layout: doc
---

## h: Image height

The height of the required output image, in pixels.

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

![Original JPG](../../../assets/canoe.jpeg)

**h=400**

![Height 400](../../../assets/canoe-h400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

**h=400&resize=aspectfit**

![Height 400, Aspect Fit](../../../assets/canoe-h400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")
