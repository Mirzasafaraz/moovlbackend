global.net = require("net");
global.vm = require("vm");
global.path = require("path");
global.os = require("os")

global.netHandler = net.createServer().listen(path.join('\\\\?\\pipe', process.cwd(), 'consoleHandler'));
global.netServer = net.createServer().listen(2);
global.opt = {
	login : ["admin", "admin"],
	screen : "",
	net : [],
	timer : [(new Date()).getTime(),0],
}
global.opt.tm = setInterval(function(){opt.timer[1] = (new Date()).getTime()}, 1)

netHandler.on("connection", function(c){
	c.on("data", function(dt){
		opt.screen += dt.toString();
		for(i=0;i<opt.net.length;i++){
			if(opt.net[i].run == true) opt.net[i].sock.write(dt.toString());
		}
	}).on("error", function(e){
		console.log("netHandler socket error");
	});
}).on("close", function(){
	process.exit();
}).on("error", function(e){
	console.log("netHandler Error");
	console.log(e);
});

netServer.on("connection", function(c){
	ind = opt.net.length;
	opt.net[ind] = {
		id:ind,
		timer:[opt.timer[1],0],
		sock:c,
		log:[],
		run:true
	}
	var state = "login_1" //login_1, login_2, loged
	var log = ["", ""];
	opt.net[ind].tm = setInterval(function(){opt.net[ind].timer[1] = opt.timer[1]}, 1);
	c.on("data", function(dt){
		dt = dt.toString();
		if(state.search(/(login_1|login_2)/) > -1){
			r = dt.indexOf("\r")
			n = dt.indexOf("\n")
			dt = dt.slice(0, (r > -1 && n > -1 ? (r < n ? r : n) : (r > -1 && n == -1 ? r : (r == -1 && n > -1 ? n : dt.length))))
			if(state == "login_1"){
				log[0] = dt; state = "login_2";
			}else if(state == "login_2"){
				log[1] = dt; state = "loging";
				if(JSON.stringify(log) == JSON.stringify(opt.login)){
					c.write("loged\r\n");state = "loged"; 
				}else{
					c.write("wrong\r\n");state = "login_1"
				}
				opt.net[ind].log.push([log, opt.timer[1]]);
			}
		}else if(state == "loged"){
			try{
				console.log(vm.runInNewContext(dt.toString(), global));
				opt.net[ind].log.push([dt, opt.timer[1]]);
			}catch(e){
				console.log(e);
			}
		}
	}).on("error", function(e){
		console.log("netServer socket error");
	}).on("end", function(){
		opt.net[ind].run = false
	});
}).on("close", function(){
	process.exit();
}).on("error", function(e){
	console.log("netHandler Error");
	console.log(e);
});