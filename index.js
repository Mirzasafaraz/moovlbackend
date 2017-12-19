var express = require("express");
var bP = require("./bodyParse.js");
var util = require("util");

var app = express();
app.listen(process.env.PORT);

app.all("/*", bP, function(req,res,next){
	res.send(util.inspect(req));
});
