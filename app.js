var express = require("express");
var http = require("http");
var bodyParser = require('body-parser')
var app = express();

app.set('port', 8080);


var GlobalArray = [];

///////
app.use(bodyParser.json({ type: 'application/*+json' }));


app.get("/",function(req,res, next){
	var token = req.query.token;
	var obOut = GlobalArray.find(function(item){
		return item.token == token ? item : false;
	});
	res.send(obOut);
});


app.put("/",function(req,res, next){
	console.log(req.query)
	console.log(req.body)
	var token = req.query.token;
	var flag = true;
	var index = 0;


	while(flag && index < GlobalArray.length){
		if(GlobalArray[index].token == token){
			flag = false;
		}else{
			index++;
		}
	}
	if(!flag){
		GlobalArray[index].lele = "es gay";
		res.send(GlobalArray[index]);
		return;
	}
	res.send("no existe");
});


app.post("/",function(req,res, next){
	var obIn = {
		name : req.query.name,
		token : "asd123"
	};

	GlobalArray.push(obIn);
	res.send(obIn);
});


 
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
