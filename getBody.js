module.exports = function(req, res, next){
	var dt_full = "";
	req.on("data", function(dt){
		dt_full += dt.toString();
	}).on("end", function(){
		req.body = dt_full;
		next();
	});
}