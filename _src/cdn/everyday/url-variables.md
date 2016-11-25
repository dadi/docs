---
title: Serving Images and Assets
---

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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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

> **Note:** The differentiation between the Path and Querystring URL schemes is the inclusion of a querystring (i.e. everything following the `?` in the URL). If you need to serve an image in it's original, unmodified state, add a dummy querystring to the request to tell CDN you're using the Querystring URL scheme. For example: `https://cdn.example.com/cars/aston-martin.jpg?v2`

**Serving Images via the Querystring URL**

<div class="code-callout">
  <code>https://</code>
  <span class="callout">
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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
    <code>cdn.example.com</code>
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

`https://cdn.example.com/images/man-walking-on-beach.jpg`

**Original image, 5616 × 3744 px, 4MB**

![Original image, 5616 × 3744 px, 4MB](/cdn/assets/original.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

This is a large image, and it's not going to fit easily into the two spaces we have available for it. Unfortunately, no one in the department knows how to use Adobe Photoshop to make appropriately sized images. Fortunately, CDN can handle this task for you.

#### Resizing and Cropping

On the article page, let’s assume your main image spot is a 500×300 pixel container. It's an odd size, but illustrates this concept well. To fit the base image into that container, we’ll need to change the dimensions and crop some data from the top and bottom.

To adjust the image we need to specify the new width and height, as well as tell CDN how we want to crop the image.

`https://cdn.example.com/images/man-walking-on-beach.jpg?w=500&h=300&crop=entropy`

* `width=500&height=300`: Sets the width and height to fit the container.

* `crop=entropy`: Tells CDN how to determine the crop area. `entropy` is a smart cropping feature that adjusts the crop area to ensure the important part of your image is retained. It uses areas of high contrast to set the crop area.

**Resized image, 500 × 300 px, 98kB**

![Resized image, 500 × 300 px, 98kB](/cdn/assets/entropy-500x300.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

Now, on the homepage page, let’s assume each feature article has an image container that is 200×200 pixels. With the main subject of the image so close to the right, we'll once again need to tell CDN how we want the image cropped.

`https://cdn.example.com/images/man-walking-on-beach.jpg?w=200&h=200&crop=entropy`

**Resized image, 200 × 200 px, 29kB**

![Resized image, 200 × 200 px, 29kB](/cdn/assets/entropy-200x200.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

If we don't specify `entropy` as the `crop` parameter, CDN defaults to using `aspectfill` and our image would look a little different, with the main subject almost excluded from the image.

`https://cdn.example.com/images/man-walking-on-beach.jpg?w=200&h=200`

![Aspectfill, 200 × 200 px, 29kB](/cdn/assets/aspectfill-200x200.jpeg "Image credit: Danielle MacInnes (https://unsplash.com/@dsmacinnes)")

## Next Steps

Resizing and cropping are just the beginning. CDN helps you to serve assets and images to your customers easier and faster, giving you complete control over how they are served.

* API URL Guide
* Recipes - Setting default parameters
* Tutorials