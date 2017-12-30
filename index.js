var cp = require("child_process");

var install = [ 'express', 'multer', 'ejs', 'ws', 'mime-types', 'jade', 'mysql' ];

var proc =  [];//["name", cp, exit]

install.forEach(function(a,b){
	var x = [install[b], cp.spawn("npm", ["install", install[b]]), false, b];
	proc[x[3]] = x;
	console.log("now : " + x[3]);
	proc[b][1].on("exit", function(){
		proc[b][2] = true
		console.log("last : " + b)
		for(j=0;j<proc.length;j++){
			if(!proc[j][2]){
				break;
			}else if(j+1 == proc.length){
				finish();
			}
		}
	});
})

function finish(){
	cp.spawn("node", ["server.js"])
}
