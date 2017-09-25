var http=require('http');
var querystring=require('querystring');
var route=require('./route.js');
var obj={};
http.createServer(function(req,res){
	res.writeHeader(200,{
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Allow-Headers':'Content-Type',
		'Access-Control-Allow-Methods':'POST,GET,PUT,DELETE,OPTIONS'
	});
	route(req,res);
	//res.end();
}).listen(8080);
console.log('Server is running at 8080 port...');