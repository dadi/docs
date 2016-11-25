---
title: Security
---

# Redirecting HTTP traffic to HTTPS

If you're using SSL with standard ports then any HTTP traffic to your website will be redirected to the secure HTTPS address instead.

**For example**
https://www.example.com listening on port 443
http://www.example.com listening on port 80

A request to the address http://www.example.com will receive a HTTP 301 response, redirecting the request to https://www.example.com.

### Running on non-standard ports

HTTP to HTTPS via nginx or something similar

#### Configuration for SSL

```js
"server": {
  "host": "127.0.0.1",
  "port": 443,
  "protocol": "https",
  "sslPassphrase": "<your ssl passphrase here>",
  "sslPrivateKeyPath": "<your ssl private key path here>",
  "sslCertificatePath": "<your ssl certificate path here>"
}
```
 Property       | Description                 | Default value  |  Example
:---------------|:----------------------------|:---------------|:--------------
host           | The hostname or IP address to use when starting the Web server   |               | "www.example.com"
port           | The port to bind to when starting the Web server   |               | 3000
protocol | The protocol the web application will use | http | https
sslPassphrase  |  The passphrase of the SSL private key | | secretPassword
sslPrivateKeyPath | The filename of the SSL private key | | /etc/ssl/key.pem
sslCertificatePath | The filename of the SSL certificate | | /etc/ssl/cert.pem
sslIntermediateCertificatePath | The filename of an SSL intermediate certificate, if any | | /etc/ssl/ca.pem
sslIntermediateCertificatePaths | The filenames of SSL intermediate certificates, overrides sslIntermediateCertificate (singular) | [] | [ '/etc/ssl/ca/example.pem', '/etc/ssl/ca/other.pem' ]