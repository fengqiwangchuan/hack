var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('user');


var querystring = require('querystring');
var config=[
	{username:'哈哈哈哈',password:'1234',rePassword:'1234',headImg:'components/register/img/0.jpg'}
];
function register(req,res){
	var qStr='';
	console.log(req.url);
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		// 将客户端发过来的数据转换一个格式
		var temp =querystring.parse(qStr);
		var pageInfo = JSON.stringify({pageSize:1,curPage:1,total:0});
		var findInfo = JSON.stringify({"username":temp.username,"password":temp.password});
		var sql='getAll("user",\''+pageInfo+'\',\''+findInfo+'\')';

		MongoUtil.getAll(sql,function(result){
			if(result.total=='1'){
				res.send('false');
				res.end();
			}else{
				/*找到数量是多少，*/
				var pageInfo2 = JSON.stringify({pageSize:9999,curPage:1,total:0});
				var findInfo2 = JSON.stringify({});
				var sql='getAll("user",\''+pageInfo2+'\',\''+findInfo2+'\')';
				MongoUtil.getAll(sql,function(result){
					var id = result.data[result.data.length-1].id-(-1);
					temp.id = ('00'+id).slice(-3);
					MongoUtil.add(temp,function(result){
						res.write('ok');
						res.end();
					});
				});
			}
		});

		// 迭代服务器数据，如果用户输入的数据服务器已存在则返回注册失败结果，否则返回注册成功，并保存这些数据
		/*for(var i=0;i<config.length;i++){
			if(temp.username==config[i].username){			
				res.write('false');
				break;
				}
			}
			config.push(temp);  //保存数据
			res.write('ok');
			res.end();	*/
			
	});		
}
module.exports = register;