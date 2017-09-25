var express=require('express');
var path = require('path');
var route = require('./public/server/route.js');
var app=express();

app.use(express.static(path.join(__dirname,'/public')));
app.all('*',function(req,res,next){

	res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers','Content-Type');
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
});
app.post('/:page/:datasheet/:ways',function(req,res,next){
	var page = req.params.page;
	var datasheet = req.params.datasheet;
	var ways = req.params.ways;
	var obj = {page:page,datasheet:datasheet,ways:ways,};
	/*将前台发送过来的请求信息收集好*/
	route(req,res,obj);
});
app.listen(8080);
console.log('server is running at 8080');

/*
	url请求:
		哪个页面请求：page
		请求哪个数据库: database
		数据库里的哪张表：datasheet
		请求做什么：ways

 */