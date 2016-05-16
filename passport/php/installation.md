---
title: PHP - Installation
---

## PHP

### Installation

1. Install with [Composer](https://getcomposer.org/):

	```
	composer require dadi/passport:dev-master
	```

	Or include in `composer.json`:

	```
	"require": {
		"dadi/passport": "dev-master"
	}
	```

2. Require via autoloading:
	
	```php
	require 'vendor/autoload.php';

	$options = array(
		'issuer' => array(
			'uri' => 'http://my-api.dadi.tech',
			'port' => 80,
			'endpoint' => '/token'
		),
		'credentials' => array(
			'clientId' => 'johndoe',
			'secret' => 'f00b4r'
		),
		'wallet' => '\dadi\PassportFileWallet',
		'walletOptions' => array(
			'path' => 'token.txt'
		)
	);

	$bearerToken = \dadi\Passport::get($options);
	```

For more examples, see [usageExamples.md](Usage examples).
