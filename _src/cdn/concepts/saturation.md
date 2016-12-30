---
title: Saturation
excerpt: Increase or reduce colour saturation, or convert to black and white
order: 100
---

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