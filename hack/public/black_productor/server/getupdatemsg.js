var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('user');

// var querystring = require('querystring');
var config =[];
function getupdatemsg(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var temp =JSON.parse(qStr)

			var pageInfo = JSON.stringify({pageSize:4,curPage:1,total:0});
			var findInfo = JSON.stringify({"username":temp.username});
			var sql='getAll("user",\''+pageInfo+'\',\''+findInfo+'\')';
			MongoUtil.getAll(sql,function(result){
				res.write(JSON.stringify(result.data[0]));
				res.end();
			});
			
		});		
}
module.exports = getupdatemsg;