var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/product";

var MongoUtilCtr=require('./../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('classactivity');

var classactivity={
	del:function(req,res){
		var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			qStr = JSON.parse(qStr);
			MongoUtil.del({id:qStr},function(result){
				
				res.write(result);
				res.end();
			});
		});	
	},
	getAll:function(req,res,obj){
		var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(dataPart){
			/*查找条数限制*/
			var obj = JSON.parse(qStr);
			var pageInfo = JSON.stringify(obj.pageInfo);
			var findInfo = JSON.stringify(obj.findInfo);
			var sql='getAll("classactivity",\''+pageInfo+'\',\''+findInfo+'\')';
			MongoUtil.getAll(sql,function(result){
				console.log(result);
				res.write(JSON.stringify(result));
				res.end();
			});
		});
	},
	add:function(req,res){
		var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);

			var pageInfo2 = JSON.stringify({pageSize:9999,curPage:1,total:0});
			var findInfo2 = JSON.stringify({});
			var sql='getAll("classactivity",\''+pageInfo2+'\',\''+findInfo2+'\')';

			MongoUtil.getAll(sql,function(result){
				var id = result.data[result.data.length-1].id-(-1);
				temp.id = ('00'+id).slice(-3);
				MongoUtil.add(temp,function(result){
					res.write(result);
					res.end();
				});
			});
			
		});
	},
	update:function(req,res){
		var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			qStr = JSON.parse(qStr);
			MongoUtil.update({id:qStr.id},qStr,function(result){
				res.write(result);
				res.end()
			});
		});
	}
};

module.exports = classactivity;