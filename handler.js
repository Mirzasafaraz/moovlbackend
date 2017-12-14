var cp = require("child_process");
var net = require("net");;
var path = require("path");
var os = require("os")

global.c = cp.spawn("node", ["console.js"]);

setTimeout(function(){
	global.s = net.createConnection(path.join('\\\\?\\pipe', process.cwd(), 'consoleHandler'));
	s.on("error", function(e){
		console.log(`error : ${os.EOL}${e}`)
	}).on("connect", function(){
		console.log("connected");
	});
	c.stdout.on("data", function(dt){
		dt = dt.toString();
		s.write(dt);
		console.log(dt)
	});
},1000);
c.on("exit", function(){
	global.c = cp.spawn("node", ["console.js"]);
	setTimeout(function(){
		global.s = net.createConnection(path.join('\\\\?\\pipe', process.cwd(), 'consoleHandler'));
		s.on("error", function(e){
			console.log(`error : ${os.EOL}${e}`)
		}).on("connect", function(){
			console.log("connected");
		});
	},1000);

	c.stdout.on("data", function(dt){
		dt = dt.toString();
		s.write(dt);
		process.stdout.write(dt);
	});
})
