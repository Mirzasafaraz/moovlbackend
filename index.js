var net = require("net");

var c = net.createServer().listen(80);

c.on("connection", function(c){
  c.write("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nContent-Type: text/html\r\n\r\n<h1>Hello world!</h1>");
  c.on("error", function(e){
    console.log(e);
  });
}).on("error", function(e){
  console.log(e)
});
