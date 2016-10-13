```js
var req = request.post(url, (err, resp, body) => {
  if (err) {
    console.log('Error!')
  } else {
    console.log('URL: ' + body)
  }
})

var form = req.form()
form.append('file', '<FILE_DATA>', {
  filename: 'myfile.txt',
  contentType: 'text/plain'
})
```

but if you want to post some existing file from your file system, then you may simply pass it as a readable stream:

```js
form.append('file', fs.createReadStream(filepath))
```

```
curl -i -X POST -H "Content-Type: application/json" --data '{"clientId": "testClientId","secret": "testSecret"}' "http://cdn.example.com/token"
```

```
HTTP/1.1 200 OK
Server: DADI (CDN)
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache
Date: Mon, 10 Oct 2016 03:11:11 GMT
Connection: keep-alive
Content-Length: 92

{"accessToken":"8df4a823-1e1e-4bc4-800c-97bb480ccbbe","tokenType":"Bearer","expiresIn":1800}
```

```
curl -i -X POST -F "data=@test.jpg" http://cdn.example.com/api/upload -H "Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbbe"
```

```
HTTP/1.1 201 Created
Server: DADI (CDN)
Content-Type: application/json
Content-Length: 290
Date: Mon, 10 Oct 2016 03:15:35 GMT
Connection: keep-alive

{"ETag":"\"25bdabbcaeffdba81ed006f720042222\"","message":"File uploaded","path":"8307a11d/9c0006c8/78d84b43/7b2044fb/ca1d31b1/test.jpg","awsUrl":"https://bucket.s3.amazonaws.com/8307a11d/9c0006c8/78d84b43/7b2044fb/ca1d31b1/test.jpg"}
```

```
curl -i -X POST -F "data=@test.jpg" http://cdn.example.com/api/upload -H "Authorization: Bearer 8df4a823-1e1e-4bc4-800c-97bb480ccbb1"
```

```
HTTP/1.1 401 Unauthorized
Server: DADI (CDN)
WWW-Authenticate: Bearer, error="invalid_token", error_description="Invalid or expired access token"
Cache-Control: private, no-cache, no-store, must-revalidate
Content-Type: application/json
Expires: -1
Date: Mon, 10 Oct 2016 03:15:44 GMT
Connection: keep-alive
Content-Length: 33

{"Error":"HTTP 401 Unauthorized"}
```

```
curl -i -X POST -F "data=@test.jpg" http://cdn.example.com/api/upload
```

```
HTTP/1.1 401 Unauthorized
Server: DADI (CDN)
WWW-Authenticate: Bearer, error="no_token", error_description="No access token supplied"
Cache-Control: private, no-cache, no-store, must-revalidate
Content-Type: application/json
Expires: -1
Date: Mon, 10 Oct 2016 03:15:58 GMT
Connection: keep-alive
Content-Length: 33

{"Error":"HTTP 401 Unauthorized"}
```
