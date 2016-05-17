---
title: UUID generation
---

The focus of UUID generation in DADI Identity is the simple, fast generation of cryptographically strong - random # generation `crypto.randomBytes(n)` - [RFC 4122](http://www.ietf.org/rfc/rfc4122.txt) identifiers.

We use [node-uuid](https://github.com/broofa/node-uuid) (`uuid.v4 ()`) of the generation of RFC 4122 identifiers.

# Usage

	// Generate a v4 (random) id
	uuid.v4() // -> '143a5fb2-445d-482d-a674-34caa7e7e67e'

# API

## uuid.v4([`options` [, `buffer` [, `offset`]]])

Generate and return a RFC4122 v4 UUID.

* `options` - (Object) Optional uuid state to apply. Properties may include:
  * `random` - (Number[16]) Array of 16 numbers (0-255) to use in place of randomly generated values
  * `rng` - (Function) Random # generator to use.  Set to one of the built-in generators - `uuid.mathRNG` (all platforms), `uuid.nodeRNG` (node.js only), `uuid.whatwgRNG` (WebKit only) - or a custom function that returns an array[16] of byte values.
* `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written.
* `offset` - (Number) Starting index in `buffer` at which to begin writing.

Returns `buffer`, if specified, otherwise the string form of the UUID

Example: Generate string UUID with fully-specified options

	uuid.v4({
	  random: [
	    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea,
	    0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36
	  ]
	})
	// -> "109156be-c4fb-41ea-b1b4-efe1671c5836"

Example: Generate two IDs in a single buffer

	var buffer = new Buffer
	uuid.v4(null, buffer, 0)
	uuid.v4(null, buffer, 16)

## uuid.parse(id[, buffer[, offset]]) / uuid.unparse(buffer[, offset])

Parse and unparse UUIDs:

  * `id` - (String) UUID(-like) string
  * `buffer` - (Array | Buffer) Array or buffer where UUID bytes are to be written. Default: A new Array or Buffer is used
  * `offset` - (Number) Starting index in `buffer` at which to begin writing. Default: 0

Example parsing and unparsing a UUID string

	var bytes = uuid.parse('797ff043-11eb-11e1-80d6-510998755d10') // -> <Buffer 79 7f f0 43 11 eb 11 e1 80 d6 51 09 98 75 5d 10>
	var string = uuid.unparse(bytes) // -> '797ff043-11eb-11e1-80d6-510998755d10'
