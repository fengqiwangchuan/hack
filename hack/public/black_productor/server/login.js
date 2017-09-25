var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('user');

var querystring = require('querystring');
var list=[
	{
		username:'zhangsan',			
		password:'1234'			
	},
	{
		username:'lisi',			
		password:'2014'			
	},
	{
		username:'wangwu',			
		password:'2017'		
	},
];

function login(req,res){
	var qStr='';
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		// 将客户端发过来的数据转换一个格式
		var temp =querystring.parse(qStr);
		//console.log(temp);
		// 迭代服务器数据，如果用户输入的数据已在服务器，说明用户已注册，返回登录成功
		var pageInfo = JSON.stringify({pageSize:1,curPage:1,total:0});
		var findInfo = JSON.stringify({"username":temp.username,"password":temp.password});
		var sql='getAll("user",\''+pageInfo+'\',\''+findInfo+'\')';
		MongoUtil.getAll(sql,function(result){
			if(result.total=='1'){
				var obj={username:result.data[0].username,password:result.data[0].password,text:'ok'};
				var data=JSON.stringify(obj);
				res.send(data);
			}else{
				res.send('pswErr');
			}
			res.end();
		});


		/*var flag=false;
		for(var i=0;i<list.length;i++){
			if(temp.username==list[i].username){
				if(temp.password!=list[i].password){
					res.write('pswErr');
				}else{
					var obj={username:list[i].username,password:list[i].password,text:'ok'};
					console.log(obj.text);
					var data=JSON.stringify(obj);
					res.write(data);
				}
				flag=true;
				break;
			}
		}	
		if(!flag) res.write('false');
		res.end();*/
	});		
}
module.exports = login;