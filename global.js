module.exports = function(){
	global.selectRX = function(text, _case, _else){
		if(typeof text != "string") throw new Error("text(var1) should a string");
		if(typeof _case != "object") throw new Error("_case(var2) should an object {}");
		if(_case.constructor != Object) throw new Error("_case(var2) should an object {}");
		
		var k = Object.keys(_case);
		for(i=0;i<k.length;i++){
			if(text.search(RegExp(k[i]))){
				return _case[k[i]];
				break;
			}
		}
		return _else
	}
	global.addMime = function(ext, type){
		global.mimeTypes.types[ext] = type;
		if(typeof global.mimeTypes.extensions[type] == "undefined") global.mimeTypes.extensions[type] = [];
		global.mimeTypes.extensions[type].push(ext);
	}
}