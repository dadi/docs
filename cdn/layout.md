---
title: Layout Processor
layout: default
---

## Layout Processor

The layout processor provides a way to generate a new image by combining existing images accessible by CDN.

A request to CDN specifying the processor name of "layout" and including a set of input images (or colour tiles) along with a size and position for each, will result in a new image being rendered as the response.

Each part of the request must be separated by a pipe character: `|`

**Example request**

The following request contains the following:

* Inputs:
  * the image `test.jpg`, resized to 200 pixels wide by 300 pixels high, positioned at 0,0 in the output image
  * a tile with the colour `#01EE88`, 200 pixels wide by 300 pixels high, positioned at 0,200 in the output image
  * the image `original.jpeg`, resized to 200 pixels wide by 300 pixels high, positioned at 0,400 in the output image
* Output: an image 600 pixels wide by 300 pixels high, in JPEG format

http://cdn.example.com/layout/i:test.jpg,h_300,w_200,x_0,y_0|c:01ee88,h_300,w_200,x_200,y_0|i:original.jpeg,h_300,w_200,x_400,y_0|o:output.jpg,h_300,w_600

![Output image](assets/layout-output.jpg)

### Input Images

An input image is specified in the request using the format `i:IMAGE_URL,h_HEIGHT,w_WIDTH,x_HORIZONTAL,y_VERTICAL`

* `IMAGE_URL`: the path to an existing image accessible by the CDN
* `h_HEIGHT`: the height the input image should be resized to, in pixels
* `w_WIDTH`: the width the input image should be resized to, in pixels

`x_HORIZONTAL` and `y_VERTICAL` control the position of the input image inside the output image, specifying where the top left corner of the image should be placed.

**Example:** `i:path/to/image.jpg,w_640,h_480,x_0,y_0`

### Colour tiles

A colour tile can be used as an input image by using the format `c:COLOUR,h_HEIGHT,w_WIDTH,x_HORIZONTAL,y_VERTICAL`

* `COLOUR`: a colour in hexadecimal format, for example `F3EACD`
* `h_HEIGHT`: the height the tile should be on the output image, in pixels
* `w_WIDTH`: the width the tile should be on the output image, in pixels

`x_HORIZONTAL` and `y_VERTICAL` control the position of the tile inside the output image, specifying where the top left corner should be placed.

**Example:** `c:F3EACD,w_320,h_480,x_320,y_0`

### Output Image

The format and dimensions of the output image are controlled using the output image portion of the request, using the format `o:IMAGE_URL,h_HEIGHT,w_WIDTH`

* `IMAGE_URL`: an image name and extension - used to determine the output format. For example `test.jpg` will return an image encoded as JPEG.
* `h_HEIGHT`: the desired height of the output image, in pixels
* `w_WIDTH`:  the desired width of the output image, in pixels

**Example:** `o:test.png,w_640,h_480`
