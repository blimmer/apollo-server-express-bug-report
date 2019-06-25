# Apollo Express Cache Control Bug

This example repo shows an issue with the latest version of apollo-server-express
where, when the `cacheControl` extension is enabled, it does not set the
Cache-Control HTTP headers. When it's not enabled, they are set.

## Repro Steps

1. Run the server

```console
git clone https://github.com/blimmer/apollo-server-express-bug-report.git
cd apollo-server-express-bug-report
npm install
./bin/www
```

2. By default, the `cacheControl` extension is enabled. If you `curl` the
endpoint, you'll see that the `Cache-Control` HTTP headers are not set:

```console
> curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -i --data '{ "query": "{ hello }" }'
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json
Content-Length: 120
Date: Tue, 25 Jun 2019 15:40:34 GMT
Connection: keep-alive

{"data":{"hello":"Hello world!"},"extensions":{"cacheControl":{"version":1,"hints":[{"path":["hello"],"maxAge":900}]}}}
```

However, if you comment out the `cacheControl` setting
[in app.js](https://github.com/blimmer/apollo-server-express-bug-report/blob/cac418f13a6a3734d3a1f81e68e4aa1f4da00902/app.js#L27),
you'll see that the expected `Cache-Control` HTTP headers are set:

```console
curl -X POST http://localhost:3000/graphql -H "Content-Type: application/json" -i --data '{ "query": "{ hello }" }'
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json
cache-control: max-age=900, public
Content-Length: 34
Date: Tue, 25 Jun 2019 15:40:23 GMT
Connection: keep-alive

{"data":{"hello":"Hello world!"}}
```
