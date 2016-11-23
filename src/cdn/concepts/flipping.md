---
title: Flip
---
## flip: Flip Axis

Flips the image horizontally, vertically or both. Valid values are `x`, `y` and `xy`. The default value is `0`, which means it is not set.

> The `flip` parameter can be added to the querystring as either `fl` or `flip`

`https://cdn.example.com/images/dog.jpg?flip=x`

![Dog flipped on the X axis](../../assets/dog-w600-flip-x.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

`https://cdn.example.com/images/dog.jpg?flip=y`

![Dog flipped on the Y axis](../../assets/dog-w600-flip-y.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

`https://cdn.example.com/images/dog.jpg?flip=xy`

![Dog flipped on both axes](../../assets/dog-w600-flip-xy.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")


### Other Rotation Methods

<ul class="api-methods">
  <li class="api-method">
    <a href="/apis/url/dpr">
      <h4>rotate</h4>
      <p>Rotation</p>
    </a>
  </li>
</ul>

<style>
.api-methods {
    margin-left: 0;
    margin-top: 18px;
}

.api-methods li {
    list-style: none;
    display: inline-block;
    width: 140px;
    margin: 12px 6px 0 0;
}

.api-methods li a {
    padding: 12px 15px;
    background: #eef0f2;
    border-radius: 6px;
    border: 1px solid #D0D7DD;
    display: block;
    text-decoration: none;
}

.api-methods li a:hover {
    background: #475F72;
    border-color: #475F72;
}

a {
    color: #0099c7;
    text-decoration: none;
    position: relative;
}

.api-methods li h4 {
    color: #496070;
    margin-top: 0;
    font-size: 20px;
    font-weight: bold;
}

.api-methods li p {
    margin-top: 6px;
    font-size: 12px;
    color: #496070;
}

.api-methods li h4, .api-methods li p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
