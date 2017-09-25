/*var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('user');*/


var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/product";


var querystring = require('querystring');
var config =[];
function updateMSG(req,res){
		var qStr='';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var temp =querystring.parse(qStr)
			console.log(temp)
			var arr = {};
			for(var i in temp){
				if(i!='username'){
					arr[i] = temp[i];
				}
			}
			MongoClient.connect(DB_STR,function(err,db){
				if(err){res.end(err);db.Close();return;}
				var collection=db.collection('user');

				collection.update({"username":temp.username},{$set:{'msgs':arr}},function(err,result){
					if(err){res.end();db.close();return;}
					res.write('ok');
					res.end();
					db.close();
					return;
				});

			});
		});		
}
module.exports = updateMSG;