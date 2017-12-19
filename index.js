var express = require("express");
var bP = require("./bodyParse.js");
var util = require("util");
var fs = require("fs");
var path = require("path");

var app = express();
app.listen(process.env.PORT);

app.all("/*", bP, function(req,res,next){
	if(req.originalUrl.slice(0, ("/test")) == "/test"){
		res.send(util.inspect(req));
	}else{
		var p = path.join("public", req.path);
		if(fs.existsSync(p)){
			var st = fs.stat(p);
			if(st.isDirectory()){
				var d = fs.readdirSync(p);
				for(i=0;i<d.length;i++){
					if(d[i].slice(0, d[i].indexOf(".") == "index"){
					   res.send(fs.readFileSync(p));
					}
				}
			}else{
				res.send(fs.readFileSync(p));
			}
		}else{
			res.send("404 Not Found :(");
		}
	}
});
