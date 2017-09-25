var express=require('express');
var path=require('path');
var app=express();

app.use(express.static('test.html'));
app.use(express.static(__dirname+'client'));
// app.all('*',function(req,res,next){
// 	res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers','Content-Type');
// 	res.setHeader('Access-Control-Allow-Origin','*');
// 	next();
// });

// app.post('/:hot',function(req,res,next){
// 	console.log(req.params.hot);
// 		res.send('hhh...');
// 		res.end();
// });

app.listen(8090);

console.log('Server in running at 8090 port...');