module.exports = autoRes;

function autoRes(req, res, next){
	var p = path.join(opt.root, req.path);
	if(fs.existsSync(p)){
		var st = fs.statSync(p);
		if(st.isDirectory()){
			var d = fs.readdirSync(p);
			for(i=0;i<d.length;i++){
				if(d[i].slice(0, d[i].indexOf(".")) == "index"){
					p = path.join(p, d[i]);
					break;
				}
			}
		}
	}else{
		p = path.join(opt.err, "404.njs");
		res.status(404);
	}

	if(fs.existsSync(p)){
		if(!fs.statSync(p).isDirectory()){
			var ext = path.extname(p); //html, js, css, njs, nhtml, ejs, txt, __img, __video, __audio, __docs, __no_type
			var type = mimeTypes.lookup(p);
			switch(true){
				case (ext == ".njs"):
					var dt = `${fs.readFileSync(p).toString()};`
					var n = (new Date()).getTime() + Math.round(Math.random() * 1000) + ".js";
					fs.writeFileSync(path.join(path.dirname(p), n), dt);
					var njs = cp.spawn("node", [path.join(path.dirname(p), n)]);
					var full = "";
					njs.stdout.on("data", function(dt){
						full += dt.toString();
					});
					var tmo = setTimeout(function(){
						njs.kill();
					}, opt.timeout.njs || 500);
					njs.on("exit", function(){
						clearTimeout(tmo);
						fs.unlinkSync(path.join(path.dirname(p), n));
						res.send(full);
					});
					break;
				case (ext == ".ejs"):
					res.send(ejs.render(fs.readFileSync(p).toString(), {req:req, glo:global}))
					break;
				case ([".", "", ".css", ".html", ".js", ".json", ".xml"].indexOf(ext) > -1):
				case !type:
				case (/(text|javascript|json|xml)/.test(type)) :
					res.type(!type ? "text/plain" : type);
					res.send(fs.readFileSync(p).toString());
					break;
				case true:
					res.sendFile(p);
					break;
			}
			console.log(/(text|javascript|json|xml)/.test(type), ([".", "", ".css", ".ejs", ".html", ".js", ".json", ".xml"].indexOf(ext) > -1), !type, /(text|javascript|json|xml)/.test(type) || ([".", "", ".css", ".ejs", ".html", ".js", ".json", ".xml"].indexOf(ext) > -1) || !type)
		}else{
			var html = `<h2>Directory of ${p}</h2><ul>`;
			var list = fs.readdirSync(p);
			for(i=0;i<list.length;i++){
				html += `<li><a href="${path.join(req.path, list[i])}">${list[i]}</a></li>`
			}
			html += "</ul>"
			res.send(html);
		}
	}else{
		res.status(404);
		res.send("404 Not Found :( <br />Express Server - NodeJS");
	}
}