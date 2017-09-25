var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/product";

var querystring = require('querystring');
var loginRoute={
	test:function(req,res,obj){
		var qStr = '';
		req.addListener('data',function(data){
			qStr+=data;
		});
		req.addListener('end',function(){
			qStr = JSON.parse(qStr);
			//将传过来的表单数据变成对象
			MongoClient.connect(DB_STR,function(err,db){
				var username = qStr.username;
				var password = qStr.password;
				var collection=db.collection('admin');
				collection.find({'admin':username}).toArray(function(err, result){
					if(result[0]&&result[0].password==password){
						res.write('ok');
						db.close();
						res.end();
					}else{
						db.close();
						res.end();
					}
				});
			});
		});
	}
};
module.exports = loginRoute;