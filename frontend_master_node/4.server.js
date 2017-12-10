function handleHTTP(req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end("Hello Server: " + Math.random().toString());
    } else {
      res.writeHead(403);
      res.end("Get outta here!");
    }
  } else {
    res.writeHead(403);
    res.end("Get outta here!");
  }
}

var host = "localhost";
var port = 8006;

var http = require('http');
var http_server = http.createServer(handleHTTP).listen(port, host);
