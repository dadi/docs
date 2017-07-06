---
title: Dealing with pixel ratios
---

When dealing with mulitiple device pixel ratios, you can 'multiply' the outputted size of the image by adding the variable name `?devicePixelRatio=[0-9]`.

For example a `100px x 100px` image with the variable `devicePixelRatio=2` will return an image of `200px x 200px` in size. You can then scale down the image in your front-end output e.g.,

```html
<img src="https://cdn.example.com/images/dog.jpg?w=200&height=200&devicePixelRatio=2" width="100">
```