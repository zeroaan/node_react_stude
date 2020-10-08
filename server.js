var http = require("http");

var server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello node.js!!");
});

server.listen(8080, () => {
  console.log("Server is running...");
});
