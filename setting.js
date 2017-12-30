/*
var opt = {
		port : 80,
		root : "public\web",
		err : "public\web\error"
	}
*/
var path = require("path");
var fun = function(/* add args here */){
	//write function here
}

var opt = {
	//write options here
	port : process.env.PORT,
	root : path.join(__dirname, "web/pub"),
	err : path.join(__dirname, "web/err"),
	timeout:{
		njs : 500
	},
	block : [
		//by session : ["type", #data, time_end]; type = session, ip, isp, city, region, country, id
	]
}

//-----------engine-----------
var full = fun;

var k = Object.keys(opt);
for(i=0; i<k.length;i++){
	full[k[i]] = opt[k[i]];
}

module.exports = full;
