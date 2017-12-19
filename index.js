var express = require("express");
var bP = require("./bodyParse.js");
var util = require("util");

var app = express();
app.listen(80);

app.all("/*", bP, function(req,res,next){
	
});