# DADI Identity

## Record lookup

DADI Identity provides an endpoint for the lookup of a record. This is designed for use with third party services, including [DADI Track](https://github.com/dadi/track).

Looking up a record by UUID will return the full record, including fingerprints, date/time stamps and a count of interactions with DADI Identity for the given UUID.

### Endpoint

The lookup endpoint can be found at `/{VERSION}/lookup/{UUID}`. For example: [https://id.dadi.co/v1/lookup/03d0c446-fb48-487c-b93e-e2fa2b057ae5](https://id.dadi.co/v1/lookup/03d0c446-fb48-487c-b93e-e2fa2b057ae5)

This end point is authenticated.

### Authentication

...

### Expected output

Matched UUID:

	{
		"device": "293a15205a604e0036edb1b5ac898d35",
		"location": "1199649750",
		"network": "228621461",
		"providor": "4045304269",
		"language": "2083890633",
		"agent": "1752690801",
		"protocol": "2491383542",
		"created": "Sat Feb 20 2016 20:02:23 GMT+0000 (GMT)",
		"lastSeen": "Sun Feb 21 2016 09:45:57 GMT+0000 (GMT)",
		"count": "5"
	}

Unmatched UUID:

	{
		"error": "UUID not found"
	}
