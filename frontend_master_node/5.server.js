var ASQ = require("asynquence");

function handleHTTP(req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-type": "text/plain" });
      ASQ(function(done) {
        setTimeout(function () {
          console.log("first");
          var num = Math.random();
          done(num)
        }, 1000);
      }).then(function(done, num) {
        setTimeout(function () {
          console.log("second");
          done("Hello Server: " + num);
        }, 1000)
      }).val(function (msg) {
          res.end(msg);
      });
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
