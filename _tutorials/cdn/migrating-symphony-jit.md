---
title: 'Migrating from Symphony JIT'
path: /cdn/
layout: default
product: DADI CDN
---

## Migration from Symphony JIT Image Service to DADI CDN

Sample images from:

* https://monocle.com/magazine/the-escapist/2016/sea-change/
* https://monocle.com/magazine/the-forecast/

### Crop and resize


**Existing**
https://images.monocle.com/5/2776/1561/0/746/549/309/uploads/image/article/_rc16026-57850acda818c.jpg

**New**
https://images.monocle.com/uploads/image/article/_rc16026-57850acda818c.jpg?resize=crop&crop=0,746,2776,2307&w=549&h=309

#### Formula for crop coordinates
* l: left
* t: top
* r: right
* b: bottom
* w: width to resize to, after crop
* h: height to resize to, after crop

```
lt---------+
|          |
|          |
|          |
+----------rb
```

https://images.monocle.com/5/r/b/l/t/w/h/uploads/image/article/_rc16026-57850acda818c.jpg
https://images.monocle.com/uploads/image/article/_rc16026-57850acda818c.jpg?resize=crop&crop=l,t,l+r,t+b&w=w&h=h

### Height specified only

**Existing**
https://images.monocle.com/1/0/800/uploads/image/gallery/cp-lima-0293.jpg

**New**
https://images.monocle.com/uploads/image/gallery/cp-lima-0293.jpg?w=0&h=800&resize=aspectfit

### Width specified only

**Existing**
https://images.monocle.com/1/446/0/uploads/image/issue/forecast-2016-566aaa651889c.jpg

**New**
https://images.monocle.com/uploads/image/issue/forecast-2016-566aaa651889c.jpg?w=446&resize=aspectfit

### Responsive Srcset

**Existing**

```html
<img
  src="//images.monocle.com/5/2014/1133/0/481/832/468/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg"
  srcset="
    //images.monocle.com/5/2014/1133/0/481/832/468/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg 1x,
    //images.monocle.com/5/2014/1133/0/481/1664/936/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg 2x,
    //images.monocle.com/5/2014/1133/0/481/2496/1404/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg 3x,
    //images.monocle.com/5/2014/1133/0/481/832/468/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg 320w,
    //images.monocle.com/5/2014/1133/0/481/832/468/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg 640w,
  ">
```
**New**

* **1x:** https:images.monocle.com/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg?resize=crop&crop=0,481,2014,1614&w=832&h=468&dpr=1
* **2x:** https:images.monocle.com/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg?resize=crop&crop=0,481,2014,1614&w=832&h=468&dpr=2
* **3x:** https:images.monocle.com/uploads/image/article/08rooftop-5669a6d5ae7d1.jpg?resize=crop&crop=0,481,2014,1614&w=832&h=468&dpr=3

### Width & height + crop position

**Width**
https://images.monocle.com/2/408/230/5/uploads/image/gallery/1384388_574158039304872_1023095887_n.jpg

**New**
https://images.monocle.com/uploads/image/gallery/1384388_574158039304872_1023095887_n.jpg?w=408&h=230&gravity=Center

#### Crop position translation

```
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 7 | 8 | 9 |
+---+---+---+
```
* 1: gravity=NorthWest
* 2: gravity=North
* 3: gravity=NorthEast
* 4: gravity=West
* 5: gravity=Center
* 6: gravity=East
* 7: gravity=SouthWest
* 8: gravity=South
* 9: gravity=SouthEast
