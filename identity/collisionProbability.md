# DADI Identity

## Collision probability

Out of a total of 128 bits, two bits indicate an [RFC 4122](https://tools.ietf.org/html/rfc4122) ("Leach-Salz") UUID and four bits the version (0100 indicating "randomly generated"), so randomly generated UUIDs have 122 random bits.

The chance of two such UUIDs having the same value can be calculated using probability theory (birthday problem).

Using the approximation:

`p(n) \approx 1 - e^{-\frac{n^2}{2*2^x}}`

...these are the probabilities of an accidental clash after calculating n UUIDs, with x = 122:

| _n_ | Probability |
|-----|-------------|
| 68,719,476,736 = 2<sup>36</sup> | 0.0000000000000004 (4 × 10<sup>−16</sup>) |
| 2,199,023,255,552 = 2<sup>41</sup> | 0.0000000000005 (5 × 10<sup>−13</sup>) |
| 70,368,744,177,664 = 2<sup>46</sup> | 0.0000000005 (5 × 10<sup>−10</sup>) |

When the term `n^2/(2*2^x)` is close to zero, the probability of a clash can be accurately approximated by:

`p(n) \approx \frac{n^2}{2*2^x}`

To put these numbers into perspective, the annual risk of a given person being hit by a meteorite is estimated to be one chance in 17 billion<sup>[[source](http://www.dartmouth.edu/~chance/chance_news/recent_news/chance_news_2.21.html)]</sup>, which means the probability is about 0.00000000006 (6 × 10<sup>−11</sup>), equivalent to the odds of creating a few tens of trillions of UUIDs in a year and having just one duplicate.

In other words, only after generating 1 billion UUIDs every second for the next 100 years, the probability of creating just one duplicate would be about 50%.

However, these probabilities only hold when the UUIDs are generated using sufficient entropy. Otherwise, the probability of duplicates could be significantly higher, since the statistical dispersion might be lower.

As such, where unique identifiers are required in a distributed setup, so that UUIDs do not clash even when data from many devices is merged, the randomness of the seeds and generators used on every device must be reliable for the life of the application. To provide this gauntee, we make use of a shared Redis layer for the lookup previously issued UUIDs, and in the event of a match, simply step over and generate UUID.
