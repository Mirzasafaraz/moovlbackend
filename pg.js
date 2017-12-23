var pg = require("./node_modules/pg/lib/index.js");

var db = new pg.Client({
	connectionString: process.env.DATABASE_URL,
	ssl: true
}); 

db.connect();

console.log(`connected to ${process.env.DATABASE_URL}`)
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function doLoop(){
	rl.question('> ', (ans) => {
		console.log("do " + ans.toString());
		db.query(ans.toString(), function(err, res){
			if(err) console.log(err);
			console.log(res);
			doLoop()
		});
	});
}
doLoop();
