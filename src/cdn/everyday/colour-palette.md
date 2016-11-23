---
title: Retrieving a colour palette
---

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

![input image](/cdn/assets/palette-source.jpg)

![generated palette](/cdn/assets/palette-output.png)