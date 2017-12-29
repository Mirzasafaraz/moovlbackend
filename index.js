//basic modules
	global.util = require("util");
	global.fs = require("fs");
	global.path = require("path");
	global.net = require("net");
	global.cp = require("child_process");
	global.http = require("http");
	global.vm = require("vm");

//express modules
	global.express = require("express");
	global.bodyParser = require('body-parser');
	global.multer = require('multer');

//extra modules
	global.ejs = require("ejs");
	global.mimeTypes = require("mime-types");
	global.ws = require("ws"); //winsock
	global.getBody = require("./getBody.js"); //get data from body request
	global.autoRes = require("./autoRes.js"); //auto respond for webFile
	require("./global.js")();

//script begin
	global.s_exp = express(); //server-express
	global.s_read = net.createServer();
	//options
		if(fs.existsSync("setting.js")) global.opt = require("./setting.js"); //for get setting
		
		addMime("njs", "application/x-httpd-njs")
		addMime("nhtml", "application/x-httpd-nhtml")
		addMime("ejs", "application/x-httpd-ejs")
		
		global.upload = multer().array(); // for parsing multipart/form-data
		
		s_exp.set('view engine', 'jade');
		s_exp.use(bodyParser.json()); // for parsing application/json
		s_exp.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	//route script
		s_exp.all("/*", upload, autoRes);

//listening and another end function
	s_exp.listen(opt.port || 80);
	console.log(`listening on ${opt.port || 80}`);