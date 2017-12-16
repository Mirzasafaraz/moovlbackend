var net = require("net");
var cp = require("child_process");
var html = require("./html.js");
var njs = require("./njs.js");

var log = []; //[dt[, s], time, type]; type=object[_event]

var c = net.createServer().listen(process.opt.PORT);

log.push([process.opt.PORT, (new Date()).getTime(), "serv_listen"]);

s.on("connection", function(c){
	log.push(["", c, (new Date()).getTime(), "conn"]);
	c.on("data", function(dt){
		log.push([dt, c, (new Date()).getTime(), "conn_req"]);
	}).on("end", function(){
		log.push(["", c, (new Date()).getTime(), "conn_end"]);
	}).on("error", function(e){
		log.push([e, c, (new Date()).getTime(), "conn_err"]);
	});
}).on("error", function(e){
	log.push([e, (new Date()).getTime(), "serv_err"]);
});
