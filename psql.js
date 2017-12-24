var cp = require("child_process");

var psql = cp.spawn("psql", ["postgres://yuscofrhmaphhq:e1e82694a8df3921051fec1566157cac13088111e97fccfdcc3911d6ad02e70a@ec2-54-83-60-13.compute-1.amazonaws.com:5432/dauss4artvi6b9"]);

psql.stdout.on("data", function(dt){
  console.log(dt.toString());
});
