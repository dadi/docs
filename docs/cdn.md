---
title: CDN
order: 3
---

## Installation

### Sqwish CSS Compressor

```bash
$ sudo npm install -g sqwish
```

### Upgrade GCC++ Compiler

```bash
$ sudo add-apt-repository ppa:ubuntu-toolchain-r/test
$ sudo apt-get update -y
$ sudo apt-get install gcc-4.9 g++-4.9
$ sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.9 60 --slave /usr/bin/g++ g++ /usr/bin/g++-4.9
```

### NPM

All our platform microservices are available from [NPM](https://www.npmjs.com/). To install *CDN*:

``` console
$ npm install @dadi/cdn
```

### Manual install

If you do not want to use NPM, you can grab the latest [release](https://github.com/dadi/cdn/releases). Then you can install:

``` console
$ cd ./release-download-location/
$ npm install
```

### Forever (optional)

As with most Node.js applications, to run the app in the background you will need to install install [Forever](https://github.com/nodejitsu/forever) and [Forever-service](https://github.com/zapty/forever-service):

``` console
$ [sudo] npm install forever -g
$ [sudo] npm install -g forever-service
```

Install DADI CDN as a service and ensure it loads on boot:

``` console
$ [sudo] forever-service install -s main.js -e NODE_ENV=production cdn --start
```

**Note** the environment variable `NODE_ENV=production` must be set to target the required config version.

You can then interact with the service using the following command:

``` console
$ [sudo] service cdn start
$ [sudo] service cdn stop
$ [sudo] service cdn status 
$ [sudo] service cdn restart
```

## Configuration

All the core platform services are configured using environment specific configuration files, the default being `development`. For more advanced users this can also load based on the `hostname` i.e., it will also look for `config." + req.headers.host + ".json`

A very basic `config.development.json` file looks like this:

```json
{
  "server": {
    "host": "localhost",
    "port": 3001
  },
  "images": {
    "directory": {
      "enabled": true,
      "path": "./path-to-images"
    }
  }
}
```

## Advanced configuration

### Example Configuration File

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8001
  },
  "logging": {
    "enabled": true,
    "level": "info",
    "path": "./log",
    "filename": "cdn",
    "extension": "log"
  },
  "notFound": {
    "statusCode": 410,
    "images": {
      "enabled": false,
      "path": "./images/missing.png"
    }
  },
  "images": {
    "directory": {
      "enabled": true,
      "path": "./test/images"
    },
    "s3": {
      "enabled": false,
      "accessKey": "",
      "secretKey": "",
      "bucketName": "",
      "region": ""
    },
    "remote": {
      "enabled": false,
      "path": ""
    }
  },
  "assets": {
    "directory": {
      "enabled": true,
      "path": "./public"
    },
    "s3": {
      "enabled": false,
      "accessKey": "",
      "secretKey": "",
      "bucketName": "",
      "region": ""
    },
    "remote": {
      "enabled": false,
      "path": ""
    }
  },
  "caching": {
    "ttl": 3600,
    "directory": {
      "enabled": false,
      "path": "./cache/"
    },
    "redis": {
      "enabled": false,
      "host": "127.0.0.1",
      "port": 6379
    }
  },
  "security": {
    "maxWidth": 10048,
    "maxHeight": 5024
  },
  "auth": {
    "clientId":"webClient",
    "secret":"secretSquirrel"
  },
  "upload": {
    "enabled": true,
    "requireAuthentication": true,
    "pathFormat": "sha1/4"
  },
  "cloudfront": {
    "accessKey": "",
    "secretKey": "",
    "distribution": ""
  },
  "headers": {
    "useGzipCompression": true,
    "cacheControl": {
      "default": "public, max-age=3600",
      "paths": [],
      "mimetypes": [
        { "image/jpeg": "public, max-age=86400" },
        { "text/css": "public, max-age=86400" },
        { "text/javascript": "public, max-age=86400" },
        { "application/javascript": "public, max-age=86400" }
      ]
    }
  }
}
```


## Defining sources

Before you can serve assets or images you need to tell CDN where your files are located. CDN can serve your files from three types of source:

* [Amazon S3](#-amazon-s3-https-aws-amazon-com-s3-) - retrieve files from existing Amazon S3 buckets
* [Remote server](#remote-server) - retrieve files from a remote web server
* [Local filesystem](#local-filesystem) - retrieve files from the same server as CDN

You’re not limited to choosing one source, either. If you’ve elected to use the [Querystring URL scheme](#cdn/querystring-url-scheme) then you can use all configured sources at the same time.

> **Using the legacy path scheme**
> 
> If you're _not_ using the [Querystring URL scheme](#cdn/querystring-url-scheme), that is, you're using the legacy [Path URL scheme](#cdn/path-url-scheme), then *only one source* can be configured at a time.
> -- advice

## Configuring sources

### [Amazon S3](https://aws.amazon.com/s3/)

> **Security Note**
> 
> We **strongly** recommend creating an Amazon IAM account specifically for accessing your S3 buckets.
> -- warning

#### Using the configuration file

The [configuration file](/cdn/getting-started/configuration/) contains two sections for configuring an Amazon S3 source. One section is for images and the other is for assets. Specifying image and asset settings separately allows you to use different Amazon credentials for each one.

> **Security Note:** We **strongly** recommend that Amazon credentials **are not** stored in your configuration file if that file could be viewed by the public (for example, committed to a public GitHub repository). A better solution is to use [Environment Variables](#using-environment-variables) when configuring an Amazon S3 source.

**Configuration for an Amazon S3 image source**
```js
"images": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  }
}
```

**Configuration for an Amazon S3 asset source**
```js
"assets": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Amazon S3 image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": true,
    "accessKey": "your-access-key",
    "secretKey": "your-secret",
    "bucketName": "your-bucket",
    "region": "your-region"
  },
  "remote": {
    "enabled": false
  },
  "directory": {
    "enabled": false
  }
}
```

It was mentioned earlier that if using the [Querystring URL scheme](serving-assets.md#querystring-url-scheme) then you can use all configured sources at the same time, regardless of the value of the `enabled` property.

##### Using environment variables

One easy way to set environment variables is to specify them on the command line when you launch CDN:

```
$ AWS_S3_IMAGES_ACCESS_KEY=your-access-key AWS_S3_IMAGES_SECRET_KEY=your-secret node main.js
```

See the documentation for your operating system for details on setting environment variables. A useful guide for Linux users can be found here https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps.

### Remote server

The Remote Server source connects CDN to any publicly available URL where you are hosting your assets and images.

The [configuration file](/cdn/getting-started/configuration/) contains two sections for configuring a Remote Server source. One section is for images and the other is for assets. This makes it possible to store your images and assets in different locations on a remote server, or even use different servers for each.

**Configuration for a Remote Server image source**
```js
"images": {
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/images"
  }
}
```

**Configuration for a Remote Server asset source**
```js
"assets": {
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/assets"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Remote Server image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": false
  },
  "remote": {
    "enabled": true,
    "path": "http://media.example.com/public/images"
  },
  "directory": {
    "enabled": false
  }
}
```

### Local filesystem

The [configuration file](/cdn/getting-started/configuration/) contains two sections for configuring a Local Filesystem source. One section is for images and the other is for assets. Specifying image and asset settings separately allows you to use different filesystem locations for each one.

**Configuration for a Local Filesystem image source**
```js
"images": {
  "directory": {
    "enabled": true,
    "path": "path/to/your/images"
  }
}
```

**Configuration for a Local Filesystem asset source**
```js
"assets": {
  "directory": {
    "enabled": true,
    "path": "path/to/your/assets"
  }
}
```

> Setting the `enabled` property is essential only when you're using the legacy Path URL scheme. In that case, only one of the source types can be configured for use at any one time, by setting it's `enabled` property to `true`.

**A full Local Filesystem image source configuration, using the Path URL scheme**
```js
"images": {
  "s3": {
    "enabled": false
  },
  "remote": {
    "enabled": false
  },
  "directory": {
    "enabled": true,
    "path": "path/to/your/images"
  }
}
```

## URL Parameters

### Image compression & quality
> Reduce file size by applying compression to images

Applies compression to the image, reducing file size. Accepts any number from 1-100. If not specified, the default is 75.

> The `quality` parameter can be added to the querystring as either `q` or `quality`

The best results for quality and file size can be found around 40-60%, where we've found generated images to be visually indistinguishable from the source image.

> The original image and all quality variations below are 2048 × 1024 pixels.

`https://cdn.somedomain.tech/images/vegetables.jpg?q=50`

**Original image, 4.7MB**

![Original JPG](/assets/cdn/vegetables.jpg)

| x | x 
|:--|:--
| ![Quality 100](/assets/cdn/vegetables-full-quality-100.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)") **Quality = 100%, 1.3MB** | ![Quality 75](/assets/cdn/vegetables-full-quality-75.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)") **Quality = 75%, 180kB**
| ![Quality 50](/assets/cdn/vegetables-full-quality-50.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)") **Quality = 50%, 119kB** | ![Quality 25](/assets/cdn/vegetables-full-quality-25.jpg "Image credit: Webvilla (https://unsplash.com/@webvilla)") **Quality = 25%, 82kB**

### Resize
> Specify new image dimensions

**Original image**

![Original JPG](/assets/cdn/canoe.jpeg)


#### Width

The width (`w`) of the required output image, in pixels.

If only `w` is specified, the `h (height)` dimension will be _set to the height of the original image_. If you'd like to ensure the output image retains the aspect ratio of the original image, please ensure `resize=aspectfit` is specified.

If both width and height are omitted, the original image’s dimensions are used.

> **Security Note:** The maximum output image size can be specified in the configuration file.

The `security` setting allows you to set a maximum width and height for generated images. This prevents the potential for a DOS attack based on the repeated generation of large images which could push your platform offline by exhausting CPU and/or available memory.

You should set this to the maximum size required for images in your application.

```json
"security": {
  "maxWidth": 2048,
  "maxHeight": 1024
}
```

**Example**

`https://cdn.somedomain.tech/images/canoe.jpg?w=400&resize=aspectfit`

| **w=400** | **w=400&resize=aspectfit** 
|:--|:--
| ![Width 400](/assets/cdn/canoe-w400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)") | ![Width 400, Aspect Fit](/assets/cdn/canoe-w400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)") 


#### Height

The height (`h`) of the required output image, in pixels.

If only `h` is specified, the `w (width)` dimension will be _set to the width of the original image_. If you'd like to ensure the output image retains the aspect ratio of the original image, please ensure `resize=aspectfit` is specified.

If both width and height are omitted, the original image’s dimensions are used.

> **Security Note:** The maximum output image size can be specified in the configuration file.

The `security` setting allows you to set a maximum width and height for generated images. This prevents the potential for a DOS attack based on the repeated generation of large images which could push your platform offline by exhausting CPU and/or available memory.

You should set this to the maximum size required for images in your application.

```json
"security": {
  "maxWidth": 2048,
  "maxHeight": 1024
}
```

**Example**

`https://cdn.somedomain.tech/images/canoe.jpg?h=400&resize=aspectfit`

| **h=400** | **h=400&resize=aspectfit** 
|:--|:--
| ![Height 400](/assets/cdn/canoe-h400.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)") | ![Height 400, Aspect Fit](/assets/cdn/canoe-h400-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")


#### Aspect ratio

A width (`w`) or (`h`) can be provided with the addition of the variable `ratio` to give back a cropped version of the image to the specificed ratio. [Resize styles](/cdn/concepts/cropping/) are respected.

```bash
https://cdn.somedomain.tech/images/canoe.jpg?h=400&amp;ratio=16-9
```

### Rotation
> Rotating an image

#### rotate

Rotates the image according to the value specified in degrees. Valid values are in the range 0 - 359. The default value is 0 which leaves the image unchanged. The image will be zoomed so that it covers the entire area after rotation.

### Blur
> Add blur to an image

Adds blur to an image, using any value above zero.

> The `blur` parameter can be added to the querystring as either `b` or `blur`

`https://cdn.somedomain.tech/images/dog.jpg?b=5`

| x | x | x
|:--|:--|:--
| ![Original JPG](/assets/cdn/dog-w600.jpeg) **Original image** | ![Blur 1](/assets/cdn/dog-w600-blur-1.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)") **Blur amount = 1** | ![Blur 5](/assets/cdn/dog-w600-blur-5.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)") **Blur amount = 5**
| ![Blur 10](/assets/cdn/dog-w600-blur-10.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)") **Blur amount = 10** | ![Blur 20](/assets/cdn/dog-w600-blur-20.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)") **Blur amount = 20** | ![Blur 20](/assets/cdn/dog-w600-blur-100.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)") **Blur amount = 100**


### Cropping an image
> Crop and resize images using fill, fit &amp; stretch

#### resize

##### aspectfill

Keeps the aspect ratio of the original image and generates an output image of the specified width and height.

> **Note:** The output image may be cropped, however by specifying the `gravity` parameter you can tell CDN which part of the image should be retained.

##### gravity

Used to position the crop area. Available options (case sensitive): `northwest`, `north`, `northeast`, `west`, `center`, `east`, `southWest`, `south`, `southeast`, `none`

**Example**

**Original image**

![](/assets/cdn/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

> In each example, the output image is 400 x 300 pixels.

`https://cdn.somedomain.tech/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=North`
`https://cdn.somedomain.tech/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=Center`
`https://cdn.somedomain.tech/images/med-portrait.jpg?w=400&h=300&resize=aspectfit&g=South`

| x | x | x
|:--|:--|:--
| ![](/assets/cdn/med-portrait-north.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)") **g=North** | ![](/assets/cdn/med-portrait-center.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)") **g=Center** | ![](/assets/cdn/med-portrait-south.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)") **g=South**

##### aspectfit

Keeps the aspect ratio of the original image and generates an output image with the maximum dimensions that fit inside the specified width and height.

**Example**

`https://cdn.somedomain.tech/images/canoe.jpg?w=400&h=300&resize=aspectfit`

The output image is 400 x 267 pixels.

![](/assets/cdn/canoe-w400-h300-aspectfit.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

##### fill

Ignores the aspect ratio of the original image and generates an output image with specified width and height. _The output image may appear squashed or stretched._

**Example**

`https://cdn.somedomain.tech/images/canoe.jpg?w=400&h=300&resize=fill`

The output image is 400 x 300 pixels.

![](/assets/cdn/canoe-w400-h300-fill.jpeg "Image credit: Roberto Nickson (https://unsplash.com/@rpnickson)")

##### entropy

Crops the image using a technique that determines the most important areas. Areas of higher contrast are considered more important, and images are often cropped to remove large areas of static color.

**Example**

**Original image**

![](/assets/cdn/med-portrait.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

`https://cdn.somedomain.tech/images/med-portrait.jpg?w=400&h=300&resize=entropy`

![](/assets/cdn/med-portrait-entropy.jpeg "Image credit: Anthony DELANOIX (https://unsplash.com/@anthonydelanoix)")

##### crop

| crop-x | Integer | Default: 0. X position of crop area |
| crop-y | Integer | Default: 0. Y position of crop area |

When `resize=crop` an additional `crop` parameter must be used to specify the coordinates of the crop rectangle. There are two ways to pass the crop rectangle coordinates:

**Specify only the top left corner of the rectangle**

`?resize=crop&crop=10,15`

**Specify the top left corner and the bottom right corner of the rectangle**

`?resize=crop&crop=10,15,200,300`

### Flipping an image
> Flip images horizontally, vertically or both

Flips the image horizontally, vertically or both. Valid values are `x`, `y` and `xy`. The default value is `0`, which means it is not set.

> The `flip` parameter can be added to the querystring as either `fl` or `flip`

#### Flip horizontally

`https://cdn.somedomain.tech/images/dog.jpg?flip=x`

![Dog flipped on the X axis](/assets/cdn/dog-w600-flip-x.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

#### Flip vertically

`https://cdn.somedomain.tech/images/dog.jpg?flip=y`

![Dog flipped on the Y axis](/assets/cdn/dog-w600-flip-y.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

#### Flip horizontally and vertically

`https://cdn.somedomain.tech/images/dog.jpg?flip=xy`

![Dog flipped on both axes](/assets/cdn/dog-w600-flip-xy.jpeg "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

### Adjusting saturation
> Increase or reduce colour saturation, or convert to black and white

> **URL parameter:** `saturate`, `sat`

Increase or decrease an image's colour saturation. To desaturate (convert to black and white), use `-1`. If not specified, the default value is `0.1`.

```http
http://cdn.somedomain.tech/images/beach.jpg?saturate=2.5
```

**Default amount = 0.1**

![Saturate 0.1](/assets/cdn/beach-sat-01.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

**Saturate amount = -1**

![Saturate -1](/assets/cdn/beach-sat--1.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

**Saturate amount = 0.5**

![Saturate 0.5](/assets/cdn/beach-sat-05.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

**Saturate amount = 1**

![Saturate 1](/assets/cdn/beach-sat-1.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

### Sharpen images
> Sharpen images

> **URL parameter:** `sharpen`, `sh`

Add sharpness to an image. If not specified, the default value is `5`.

**Example**

```http
http://cdn.somedomain.tech/images/beach.jpg?sharpen=25
```

**Default amount = 5**

![Sharpen 5](/assets/cdn/beach-sharp-5.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

**Sharpen amount = 20**

![Sharpen 20](/assets/cdn/beach-sharp-20.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

**Sharpen amount = 80**

![Sharpen 80](/assets/cdn/beach-sharp-80.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")


### Image formats
> Converting between formats

> **URL parameter:** `format`, `fmt`

#### From JPG

**Original JPG Image**

![Original JPG](/assets/cdn/dog-w600.jpeg)

**JPG to PNG**

`https://cdn.somedomain.tech/images/dog.jpg?format=png`

![PNG](/assets/cdn/dog-w600.png "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

**JPG to GIF**

`https://cdn.somedomain.tech/images/dog.jpg?format=gif`

![GIF](/assets/cdn/dog-w600.gif "Image credit: Yamon Figurs (https://unsplash.com/@yamonf16)")

#### From GIF

**Original GIF Image**

![Original GIF](/assets/cdn/giphy.gif)

**GIF to JPG**

`https://cdn.somedomain.tech/images/giphy.gif?format=jpg`

![JPG](/assets/cdn/giphy.jpeg)

**GIF to PNG**

`https://cdn.somedomain.tech/images/giphy.gif?format=png`

![PNG](/assets/cdn/giphy.png)

#### From PNG

**Original PNG Image**

![Original PNG](/assets/cdn/landscape.png)

**PNG to JPG**

`https://cdn.somedomain.tech/images/landscape.png?format=jpg`

![JPG](/assets/cdn/landscape.jpeg)

**PNG to GIF**

`https://cdn.somedomain.tech/images/landscape.png?format=gif`

![GIF](/assets/cdn/landscape.gif)

### Interpolation filter
> Choose the interpolation method when resizing images

> **URL parameter:** `filter`, `f`

This parameter allows you to specify the interpolation method to use when resizing images. If not specified, the default is `lanczos`.

When reducing the size of an image (or downsampling), some image data is simply discarded. However when increasing image dimensions, the image is expanded and gaps must be "filled in". Each interpolation filter uses a different algorithm for determining how to fill the gaps.

Possible values:
 - `lanczos` (default)
 - `nearest-neighbor`
 - `linear`
 - `cubic`
 - `grid`
 - `moving-average`

**Example**

```http
https://cdn.somedomain.tech/images/dog.jpg?width=600&height=400&resize=aspectfill&filter=linear
```

## Filters

### nearest-neighbor

The simplest approach to interpolation. Rather than calculating an average value by some weighting criteria or generating an intermediate value based on complicated rules, this method simply determines the "nearest" neighbouring pixel, and assumes the intensity value of it.

### linear

Considers the closest two pixels and takes a weighted average to arrive at its final interpolated value. Results in a much smoother image than `nearest-neighbor`.

### cubic

Images resampled with cubic interpolation are smoother and have fewer interpolation artifacts, but processing is slower than with `linear` or `nearest-neighbor`.

### lanczos

Tends to reduce aliasing artifacts and preserve sharp edges. [It has been considered the "best compromise"](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.116.7898) among several simple filters for this purpose.

## Layout Processor
> Combining images with the layout processor

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

```
http://cdn.somedomain.tech/layout/i:test.jpg,
  h_300,w_200,x_0,y_0 |
  c:01ee88,h_300,w_200,x_200,y_0 |
  i:original.jpeg,h_300,w_200,x_400,y_0 |
  o:output.jpg,h_300,w_600
```

![Output image](/assets/cdn/layout-output.jpg)

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


## Pre-signed URLs
> Allow access to private S3 objects

A pre-signed URL allows you to give one-off access to users who may not have direct access to the file.
Pre-signing generates a valid URL signed with your credentials that any user can access.

### Generating a pre-signed URL

To generate a simple pre-signed URL that allows any user to view the contents of a private object in a bucket you own,
you can use the following call to `getSignedUrl`:

```js
var AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: '<your-access-key-id>',
  secretAccessKey: '<your-secret-access-key>'
})

var params = {
  Bucket: '<your-bucket-name>',
  Key: '<your-filename>'
}

var s3 = new AWS.S3()

s3.getSignedUrl('getObject', params, function (err, url) {
  console.log("The URL is", url)
})
```

The above should result in a response similar to this:

```bash
The URL is https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D
```

### Controlling `Expires` time

The default `Expires` time is 15 minutes. This can be modified by passing a value in the
params that are passed to the `getSignedUrl` method. The following example will cause the
signed URL to expire after 60 seconds.

```js
var params = {
  Bucket: 'myBucket',
  Key: 'myKey',
  Expires: 60 // expire time, in seconds
}
```

### Accessing via CDN

http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D

### Adding image manipulation parameters

When requesting images from external URLs it is possible they have an existing querystring. To
add CDN image manipulation parameters to an external URL, they must be added to the existing querystring.

The following example uses the above URL, adding `width` and `height` parameters.

> Notice that we've added the parameters as part of the existing querystring by including an ampersand before the CDN querystring begins:

>...W6blQuGQ%3D**&?**width=300&height=300

http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D&?width=300&height=300

### Expired URLs

If a pre-signed URL has already expired at the time of the request, a HTTP 403 Forbidden error will be returned:

```json
{"statusCode":"403","message":"Forbidden: http://cdn.somedomain.tech/https://your-bucket-name.s3.amazonaws.com/your-filename?AWSAccessKeyId=your-access-key-id&Expires=1490052681&Signature=VzHKnHucNgKPG7lDbnzW6blQuGQ%3D"}
```

## Delivery Recipes
> Create a "recipe" of image manipulation parameters to apply to images at runtime

A Delivery Recipe is a predefined set of image manipulation parameters stored in a JSON file and applied to images at the time of request.

Let's use the image from our magazine example.

`https://cdn.somedomain.tech/thumbnail/images/man-walking-on-beach.jpg`

`https://cdn.somedomain.tech/images/man-walking-on-beach.jpg?width=100&height=100&resizeStyle=entropy`

![Thumbnail image, 100 × 100 px, 9kB](/assets/cdn/thumbnail-100x100.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

Recipes are defined in JSON files held in the `/workspace/recipes` folder.

### Example recipe

```json
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

### Using a recipe

Making use of a recipe is simple: call your image via the recipe name defined in the recipe JSON.

For example:

`http://cdn.somedomain.tech/thumbnail/image-filename.png`

## Delivery Routes
> Let CDN choose the recipe based on device, network, location or language


Routes allow CDN to make a decision about which [Delivery Recipe](/cdn/concepts/recipes/) to use for the current request, based on a set of configurable conditions.

Conditions can include the type of device being used, the network type, user location and language.

### Creating a Route

A route is defined in JSON format and added to a directory in your CDN installation. The default location for route files is `workspace/routes`, but this is [configurable](/web/getting-started/configuration/).

You can create route files in a text editor and manually copy them to the routes folder, or you can send a `POST` request to CDN with the route content and have CDN create it for you.

### POSTing to CDN

Send a `POST` request to the routes endpoint with the request body containing the route content.

**An example using cURL**

```
curl -i -H "Content-Type: application/json" -X POST "http://cdn.somedomain.tech/api/routes" -d '{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail"
    }
  ]
}'
```
**Response Codes**

Status Code | Description | Response
----|------|--------
200 | Route saved successfully | `{ success: true }`
400 | No request body sent | `{ success: false,  errors: ['Bad Request'] } `
400 | Route validation failed | `{ success: false, errors: validationErrors }`
400 | A route with the same name already exists | `{ success: false, errors: ['Route already exists'] }`
400 | An error occurred when saving | `{ success: false, errors: ['Error when saving route'] }`

### Route Basics

A route must contain a `name` property, as well as an array of `branches` which contain the conditions that must be true for CDN to select the route.

At a minimum, a route must take the following form. The `branches` array below contains a single branch with no conditions, representing the default recipe to use.

```json
{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail"
    }
  ]
}
```

### Branches

Each branch within the `branches` array should contain two properties, `recipe` and `condition`.

* `recipe` (string) - the name of the [Delivery Recipe](/cdn/concepts/recipes/) to use when all specified conditions are met

* `condition` (object) - contains properties that correspond to test types

```json
{
  "route": "example-route",
  "branches": [
    {
      "recipe": "thumbnail-120",
      "condition": {
        "device": "desktop"
      }
    },
    {
      "recipe": "thumbnail-50"
    }
  ]
}
```

### Branch Evaluation

Branches are evaluated in the order they appear in the route. If a branch condition is not met, the branch is skipped and the next one evaluated.

The default case (where none of the conditions are met) is handled by a branch with a `recipe` but no `condition`, which is matched immediately. This branch must be last in the array, otherwise it may be used when you don't intend it to be.

### Conditions

#### Device

The `device` condition matches the user's device type, based on the user-agent header sent in the request.

Possible values:

- `console`
- `desktop`
- `embedded`
- `mobile`
- `smarttv`
- `tablet`
- `wearable`

The `device` condition can test against a single device type:

```json
"condition": {
  "device": "mobile"
}
```

...or multiple device types:

```json
"condition": {
  "device": ["tablet", "smarttv"]
}
```

##### Default value

If a device type is specified that doesn't match one of the possible values above, CDN uses `desktop` in its place.


#### Location

The `location` condition uses the IP address from the request and performs a GeoLocation lookup to obtain the user's approximate location.

CDN can perform the GeoLocation lookup using the [Maxmind GeoIP](http://dev.maxmind.com/geoip/) database (bundled with the application), or by making a request to any remote address (such as the DADI GeoLocation API).

##### Configuring CDN to use the Maxmind GeoIP database

To use the Maxmind GeoIP database CDN's main configuration file should contain the following block:

```json
"geolocation": {
  "enabled": true,
  "method": "maxmind",
  "countryDbPath": "vendor/maxmind-country.mmdb"
}
```

If no value is provided for `countryDbPath` it defaults to the one shown in the above example.

##### Configuring CDN for remote lookup

To use a remote lookup service, the `geolocation` block in CDN's main configuration file should specify a remote URI.

The URI format uses placeholders (shown below with curly braces) to indicate where CDN should insert the parameters required for the lookup.

**Placeholders**

* `{ip}` - the IP address to lookup
* `{key}` - *(optional)* an API key required to access the remote service
* `{secret}` - *(optional)* a secret key required to access the remote service

`{key}` and `{secret}` can be set either in the configuration file or as environment variables. Set the environment variables `GEOLOCATION_REMOTE_KEY` and `GEOLOCATION_REMOTE_SECRET` to enable CDN to read these values from the environment.

```json
"geolocation": {
  "enabled": true,
  "method": "remote",
  "url": "https://api.example.com/location/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r"
}
```

**Response format**

By default CDN expects a response from the remote service in the format used by the DADI GeoLocation service, where the path for the country code within the response is `location.country.isoCode`.

If the response format for the service you use differs (and it probably does), you can tell CDN where to find the country code in the response by adding a `path` property to the `geolocation` configuration block.

```json
"geolocation": {
  "enabled": true,
  "method": "remote",
  "url": "https://api.other-service.com/location/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r",
  "path": "results.address.country"
}
```

#### Language

The `language` condition is based on the `Accept-Language` headers sent in the request. Values are ISO 639-1 language codes.

The following condition will be met if the request contains the header `Accept-Language: en`

```json
"condition": {
  "language": "en"
}
```

Language detection has support for [quality values](https://tools.ietf.org/html/rfc2616#section-14.4), which represent an estimate of the user's preference for multiple languages. By default only the main language (`quality = 1`) is used, but this can be changed by adding an optional `languageMinQuality` property to the condition, which adjusts the threshold.


```json
"condition": {
  "language": ["en", "pt"],
  "languageMinQuality": 0.5
}
```

#### Network

Specifying the `network` condition in a route performs a remote lookup on a network connectivity API to determine the type of connection being used.

> **Note:** This condition tests for a *connection type* (e.g. `cable` or `mobile`) and not *connection speed*.

The condition can be specified as a single connection type:

```json
"condition": {
  "network": "cable"
}
```

...or as an array of multiple connection types:

```json
"condition": {
  "network": ["cable", "dsl"]
}
```

##### Configuration

The configuration block required for network connectivity lookups is similar to that used for GeoLocation.

```json
"network": {
  "url": "https://api.example.com/connectivity/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r"
}
```

The URI format uses placeholders (shown below with curly braces) to indicate where CDN should insert the parameters required for the lookup.

**Placeholders**

* `{ip}` - the IP address to lookup
* `{key}` - *(optional)* an API key required to access the remote service
* `{secret}` - *(optional)* a secret key required to access the remote service

`{key}` and `{secret}` can be set either in the configuration file or as environment variables. Set the environment variables `NETWORK_REMOTE_KEY` and `NETWORK_REMOTE_SECRET` to enable CDN to read these values from the environment.

**Response format**

By default CDN expects a response from the remote service in the format used by the DADI Network Connectivity service, where the path for the connection type within the response is `speed.connectionType`.

If the response format for the service you use differs (and it probably does), you can tell CDN where to find the connection type in the response by adding a `path` property to the `network` configuration block.

```json
"network": {
  "url": "https://api.other-service.com/connectivity/?key={key}&secret={secret}&ip={ip}",
  "key": "1234567",
  "secret": "1q2w3e4r",
  "path": "results.connection.type"
}
```

### Caching

Caching is automatically enabled for routes. Depending on what's defined in the config, it uses Redis or the local filesystem.

**Example route**

```json
{
  "route": "sample-route",
  "branches": [
    {
      "recipe": "thumbnail",
      "condition": {
        "device": "desktop",
        "language": "en",
        "country": [
          "GB",
          "US"
        ],
        "network": "cable"
      }
    },
    {
      "recipe": "thumbnail-lo-res",
      "condition": {
        "device": [
          "mobile",
          "tablet"
        ],
        "language": [
          "en",
          "pt"
        ],
        "country": "GB",
        "network": [
          "cable",
          "dsl"
        ]
      }
    },
    {
      "recipe": "default-recipe"
    }
  ]
}
```

## Retrieving a colour palette

Each image stored in _CDN_ can be returned as a json object with information on how the image was generated. Within that object there is the `primaryColor` and `palette` nodes which contains information about the colour of the image.

Request URL:

```
http://cdn.yourdomain.com/disk/test.jpg?format=json
```

Response JSON:

```json
"primaryColor": "#434234",
  "palette": {
    "rgb": [
      [
        237,
        231,
        224
      ], [
        67,
        66,
        52
      ], [
        148,
        142,
        83
      ], [
        147,
        95,
        81
      ], [
        150,
        150,
        138
      ], [
        88,
        201,
        232
      ]
    ],
    "hex": [
      "#ede7e0",
      "#434234",
      "#948e53",
      "#935f51",
      "#96968a",
      "#58c9e8"
    ]
  },
 ```

![input image](/assets/cdn/palette-source.jpg)

![generated palette](/assets/cdn/palette-output.png)

## Dealing with pixel ratios

When dealing with mulitiple device pixel ratios, you can 'multiply' the outputted size of the image by adding the variable name `?devicePixelRatio=[0-9]`.

For example a `100px x 100px` image with the variable `devicePixelRatio=2` will return an image of `200px x 200px` in size. You can then scale down the image in your front-end output e.g.,

```html
<img src="https://cdn.somedomain.tech/images/dog.jpg?w=200&height=200&devicePixelRatio=2" width="100">
```

## Serving Images and Assets

With your [sources](/cdn/getting-started/defining-sources/) configured so that CDN knows where to find them, you can start sending requests for your assets and images.

CDN currently responds to two types of URL scheme. One, the Path URL scheme, is a legacy format and exists for backwards compatibility with early-adoption client applications. The other, the Querystring URL scheme, is succinct, flexible and robust.

> The Querystring URL scheme is the preferred format and is where future development efforts will be focused. In the event that new image manipulation parameters are added to CDN, the Querystring URL scheme will be the only format that supports them.  

### The URL schemes

While the Querystring URL scheme is preferred for new applications, both are documented here. If you don't need details about the Path URL scheme, [jump right to the Querystring URL scheme](#querystring-url-scheme).

> For a complete guide to the image and asset manipulation parameters, see the [URL API Guide](x).


#### Path URL scheme

Version 1.0.0-Beta of CDN used the URL path for specifying parameters. In this scheme, there are 17 parameters that can be used to manipulate images and 1 parameter for assets.

**Serving Images via the Path URL**
<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDNa domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>jpg</code>
    <span class="definition">format</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>80</code>
    <span class="definition">quality</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>0</code>
    <span class="definition">trim</span>
  </span>
  <code>/</code>
  <span class="callout stagger">
    <code>0</code>
    <span class="definition">trimFuzz</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>640</code>
    <span class="definition">width</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>480</code>
    <span class="definition">height</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>10</code>
    <span class="definition">crop-x</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>10</code>
    <span class="definition">crop-y</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>16-9</code>
    <span class="definition">ratio</span>
  </span>
  <code>/</code>
  <span class="callout stagger">
    <code>1</code>
    <span class="definition">devicePixelRatio</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>aspectfill</code>
    <span class="definition">crop</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>[North](x)</code>
    <span class="definition">gravity</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>lanczos</code>
    <span class="definition">filter</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>3</code>
    <span class="definition">blur</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>0</code>
    <span class="definition">strip</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>45</code>
    <span class="definition">rotate</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>x</code>
    <span class="definition">flip</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
</div>

**Serving Assets via the Path URL**

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>css</code>
    <span class="definition">format</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>0</code>
    <span class="definition">compress</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>styles/main.css</code>
    <span class="definition">path</span>
  </span>
</div>

#### Querystring URL scheme

Version 1.0.0 of CDN introduced this URL format for specifying parameters. You only need to supply the parameters you want to use, specifying as many or as few as you want.

> **Note:** The differentiation between the Path and Querystring URL schemes is the inclusion of a querystring (i.e. everything following the `?` in the URL). If you need to serve an image in it's original, unmodified state, add a dummy querystring to the request to tell CDN you're using the Querystring URL scheme. For example: `https://cdn.somedomain.tech/cars/aston-martin.jpg?v2`

**Serving Images via the Querystring URL**

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>w=600&amp;h=400</code>
    <span class="definition">querystring parameters</span>
  </span>
</div>

**Serving Assets via the Querystring URL**

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>styles/main.css</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>compress=0</code>
    <span class="definition">querystring parameters</span>
  </span>
</div>

#### Locating Files

There is one common piece to the URL schemes: the `path` segment that CDN uses to locate the file to be served. In the Path URL scheme it comes after all the parameters and in the Querystring URL scheme it's between the [dynamic source parameter](#dynamic-sources) (if used) and the querystring.

Ignoring the parameters for a moment, the following sections explain how CDN locates your files for each source.

##### Amazon S3 source

When you connect CDN to an Amazon S3 source, the `path` in the URL is used to locate the file within the S3 bucket you specified in the configuration file.

Depending on the region in your configuration, CDN might construct a URL similar to one the following:

* region `us-east-1`: http://bucket.s3.amazonaws.com
* any other region: http://bucket.s3-aws-region.amazonaws.com

In the following example CDN will attempt to load the image from the `S3 URL` shown in the final column:

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>...</code>
    <span class="definition">parameters omitted</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
</div>

|Bucket|Region|URL|S3 URL|
|--|--|--|
|`my-images`|`eu-west-1`|`cars/aston-martin.jpg`|`http://my-images.s3-eu-west-1.amazonaws.com/cars/aston-martin.jpg`|

##### Remote Server source

When you connect CDN to a Remote Server source, the `path` in the URL is added to the `path` you specified in the configuration file, resulting in a remote URL (which must be publicly accessible).

In the following example CDN will attempt to load the image from the `Remote Location` shown in the final column:

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>...</code>
    <span class="definition">parameters omitted</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
</div>

|Configuration|URL|Remote Location|
|--|--|--|
|`"path": "http://media.example.com/public/images"`|`cars/aston-martin.jpg`|`http://media.example.com/public/images/cars/aston-martin.jpg`|

##### Local Filesystem source

When you connect CDN to a Local Filesystem source, the `path` in the URL is relative to the `path` you specified in the configuration file.

In the following example CDN will look in the `File Location` shown in the final column:

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>...</code>
    <span class="definition">parameters omitted</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
</div>

|Configuration|URL|File Location|
|--|--|--|
|`"path": "/data/media/images"`|`cars/aston-martin.jpg`|`/data/media/images/cars/aston-martin.jpg`|


### Dynamic Sources

Adding a `source` parameter to the request URL allows you to specify which connected source CDN serves your asset or image from. This feature allows you to store assets and images in multiple places and serve them all from a single CDN installation.

When you add a `source` parameter CDN reads the standard configuration block for that source, but ignores the `enabled` property. By specifying it in the URL you're essentially saying "it's enabled".

> **Note:** Sources can only be specified in the URL if using the Querystring URL scheme. When using the Path URL scheme a single source can be configured for use at any one time.

For each of the below source types, refer to the [Locating Files](#locating-files) section above to understand how CDN interprets the path to your files.

#### Specifying an Amazon S3 source in the URL

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>s3</code>
    <span class="definition">source</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>images</code>
    <span class="definition">bucket</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>width=600&amp;height=400</code>
    <span class="definition">querystring</span>
  </span>
</div>

#### Specifying a Remote Server source in the URL

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>http</code>
    <span class="definition">source</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>width=600&amp;height=400</code>
    <span class="definition">querystring</span>
  </span>
</div>

#### Specifying a Local Filesystem source in the URL

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>disk</code>
    <span class="definition">source</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>cars/aston-martin.jpg</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>width=600&amp;height=400</code>
    <span class="definition">querystring</span>
  </span>
</div>

### Serving Assets

#### CSS

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>css</code>
    <span class="definition">format</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>0</code>
    <span class="definition">compress</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>styles/main.css</code>
    <span class="definition">path</span>
  </span>
</div>

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>styles/main.css</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>compress=0</code>
    <span class="definition">querystring</span>
  </span>
</div>

#### Javascript

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>js</code>
    <span class="definition">format</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>0</code>
    <span class="definition">compress</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>js/main.js</code>
    <span class="definition">path</span>
  </span>
</div>

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>js/main.js</code>
    <span class="definition">path</span>
  </span>
  <code>?</code>
  <span class="callout">
    <code>compress=0</code>
    <span class="definition">querystring</span>
  </span>
</div>

#### Fonts

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.somedomain.tech</code>
    <span class="definition">CDN domain</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>fonts</code>
    <span class="definition">format</span>
  </span>
  <code>/</code>
  <span class="callout">
    <code>site/museo-sans.ttf</code>
    <span class="definition">path</span>
  </span>
</div>

## Applying Parameters to Images

Now that you have your [sources](x) configured and have decided on the URL scheme you're going to use, you can start applying parameters to manipulate your images.

We’ll show a basic example, then it's over to you to experiment with the parameters to match your requirements. For a full list of available parameters, see the [URL API Guide](x).

### Basic Parameter Example

For this example we're going to imagine you have a magazine-style website with a list of articles on the homepage and an article page. We'll start with the following image, which your editor wants to use as the main article image.

`https://cdn.somedomain.tech/images/man-walking-on-beach.jpg`

**Original image, 5616 × 3744 px, 4MB**

![Original image, 5616 × 3744 px, 4MB](/assets/cdn/original.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

This is a large image, and it's not going to fit easily into the two spaces we have available for it. Unfortunately, no one in the department knows how to use Adobe Photoshop to make appropriately sized images. Fortunately, CDN can handle this task for you.

#### Resizing and Cropping

On the article page, let’s assume your main image spot is a 500×300 pixel container. It's an odd size, but illustrates this concept well. To fit the base image into that container, we’ll need to change the dimensions and crop some data from the top and bottom.

To adjust the image we need to specify the new width and height, as well as tell CDN how we want to crop the image.

`https://cdn.somedomain.tech/images/man-walking-on-beach.jpg?w=500&h=300&crop=entropy`

* `width=500&height=300`: Sets the width and height to fit the container.

* `crop=entropy`: Tells CDN how to determine the crop area. `entropy` is a smart cropping feature that adjusts the crop area to ensure the important part of your image is retained. It uses areas of high contrast to set the crop area.

**Resized image, 500 × 300 px, 98kB**

![Resized image, 500 × 300 px, 98kB](/assets/cdn/entropy-500x300.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

Now, on the homepage page, let’s assume each feature article has an image container that is 200×200 pixels. With the main subject of the image so close to the right, we'll once again need to tell CDN how we want the image cropped.

`https://cdn.somedomain.tech/images/man-walking-on-beach.jpg?w=200&h=200&crop=entropy`

**Resized image, 200 × 200 px, 29kB**

![Resized image, 200 × 200 px, 29kB](/assets/cdn/entropy-200x200.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

If we don't specify `entropy` as the `crop` parameter, CDN defaults to using `aspectfill` and our image would look a little different, with the main subject almost excluded from the image.

`https://cdn.somedomain.tech/images/man-walking-on-beach.jpg?w=200&h=200`

![Aspectfill, 200 × 200 px, 29kB](/assets/cdn/aspectfill-200x200.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

## Next Steps

Resizing and cropping are just the beginning. CDN helps you to serve assets and images to your customers easier and faster, giving you complete control over how they are served.
cdn.somedomain.tech
* API URL Guide
* Recipes - Setting default parameters
* Tutorials
