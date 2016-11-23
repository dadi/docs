---
title: Width
---
## w: Image Width

The width of the required output image, in pixels.

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

![Original JPG](../../../assets/canoe.jpeg)

**w=400**

![Width 400](../../../assets/canoe-w400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

**w=400&resize=aspectfit**

![Width 400, Aspect Fit](../../../assets/canoe-w400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")
