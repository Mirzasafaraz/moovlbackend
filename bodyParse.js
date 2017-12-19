module.exports = function(req, res, next){
	var eol;
	var dt_full = "";
	req.on("data", function(dt){
		dt_full += dt.toString();
		if(req.rawHeaders.indexOf("Content-Length") > -1){
			eol = EOL_use(dt_full);
			var body = dt_full.split(eol+eol)[1];
		}
	}).on("end", function(){
		if(req.rawHeaders.indexOf("Content-Length") > -1){
			req.body = {
				raw:dt_full,
				"content-type":req.rawHeaders.indexOf("Content-Type") > -1 ? req.rawHeaders[req.rawHeaders.indexOf("Content-Type") + 1] : undefined,
				data:{}
			};
			switch(req.body["content-type"].split(" ")[0]){
				case "application/x-www-form-urlencoded":
					req.body.data = parseUrlEncode(req.body.raw);
					break;
				case "multipart/form-data;":
					var b = req.body["content-type"].split(" ")[1];
					b = b.slice(b.indexOf("=") + 1);
					console.log(b);
					req.body.data = parseBoundary(req.body.raw, b);
					break;
			}
			next();
		}else{
			next();
		}
	});
}

function EOL_use(txt){
	var r = txt.indexOf("\r"), n = txt.indexOf("\n");
	return (r > -1 ? (n > -1 ? (r < n ? "\r" : "\n") : "\r" ) : "" ) + (n > -1 ? (r > -1 ? (n < r ? "\r" : "\n") : "\n" ) : "" );
}
function parseUrlEncode(data){
	data = data.split("&");
	var x = {};
	for(i=0; i<data.split(); i++){
		x[data.split("=")[0]] = data.split("=")[1];
	}
	return x
}
function parseBoundary(data, bound){
	var eol = EOL_use(data);
	data = data.split(bound + "--")[0];
	data = data.split(bound);
	var arr = [];
	console.log(data.length);
	for(i=1;i<data.length;i++){
		var dt = {};
		data[i] = data[i].slice(eol.length, data[i].length - eol.length);
		var h = data[i].slice(0, data[i].indexOf(eol+eol));
		dt.val = data[i].slice(data[i].indexOf(eol+eol) + (eol+eol).length);
		h = h.split(eol);
		for(x=0;x<h.length;x++){
			h[x] = h[x].replace(": ", "=");
		}
		h = h.join("; ");
		console.log(h);
		h = h.split("; ");
		for(x=0;x<h.length;x++){
			dt[h[x].slice(0, h[x].indexOf("="))] = h[x].slice(h[x].indexOf("=") + 1);
		}
		arr.push(dt);
	}
	return arr;
}