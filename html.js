/*
	structure - html
	---------------------------------
	key value
	key: value
	key: value;value; value
	
	body text here
	---------------------------------
	---------------------------------
	structure - json
	---------------------------------
	{
		headers:[
			["key", "value"],
			["key:", "value"],
			["key:", "value;value; value"]
		],
		body:"text"
	}
*/

var arrFunc;
module.exports = {
	split : split,
	parseHeader : parseHeader,
	parseBody : parseBody,
	eol : EOL_use
};

function split(txt){
	var eol  = EOL_use(txt);
	return [txt.slice(0, txt.indexOf(eol+eol)), txt.slice(txt.indexOf(eol+eol) + (eol+eol).length)];
}
function parseHeader(head){
	var eol  = EOL_use(txt);
	return head.split(eol);
}
function parseBody(body){
	return {
		byTextPlain : function(){
			var eol = EOL_use(body);
			var spl = body.split(eol);
			var dt = {};
			for(i=0;i<spl.length;i++){
				dt[spl[i].slice(0, spl[i].indexOf("="))] = spl[i].slice(spl[i].indexOf("=") + 1);
			}
			return dt;
		},
		byURLEncoded : function(){
			var spl = body.split("&");
			var dt = {};
			for(i=0;i<spl.length;i++){
				dt[spl[i].slice(0, spl[i].indexOf("="))] = spl[i].slice(spl[i].indexOf("=") + 1);
			}
			return dt;
		},
		byBoundary : function(bound){
			var eol = EOL_use(body);
			var spl = body.split(bound);
			for(i=0;i<spl.length;i++){
				if(spl[i].slice(0, eol.length) == eol) spl[i] = spl[i].slice(spl[i].indexOf(eol) + 1);
				if(spl[i].slice(spl[i].length - eol.length) == eol) spl[i] = spl[i].slice(0, spl[i].length - eol.length);
				if(spl[i] == "--") break;
				var dt = spl[i].split(eol+eol);
				spl[i] = {value:dt[1]};
				dt[0] = dt[0].replace(/(\r\n|\n)/ig, "; ").replace(/: /ig, "=");
				dt[0] = dt[0].split("; ");
				for(i=0;i<dt[0].length;i++){
					spl[i][ dt[0][i].slice(0, dt[0][i].indexOf("=")) ] = dt[0][i].slice(dt[0][i].indexOf("=") + 1)
				}
			}
		}
	}
}
function EOL_use(txt){
	var r = txt.indexOf("\r"), n = txt.indexOf("\n");
	return (r > -1 ? (n > -1 ? (r < n ? "\r" : "\n") : "\r" ) : "" ) + (n > -1 ? (r > -1 ? (n < r ? "\r" : "\n") : "\n" ) : "" );
}