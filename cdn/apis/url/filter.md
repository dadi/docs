---
title: Filter
---
## filter

Specify the interpolation method to use when resizing images. If not specified, the default is "lanczos".

> The `filter` parameter can be added to the querystring as either `f` or `filter`

`https://cdn.example.com/images/dog.jpg?width=600&height=400&resize=aspectfill&filter=linear`

Possible values:
 - "nearest-neighbor"
 - "moving-average"
 - "linear"
 - "grid"
 - "cubic"
 - "lanczos"
