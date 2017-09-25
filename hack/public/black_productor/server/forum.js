var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('Carouselfigure');

var fcontent=[
		{
			message:'房间爱上的路口附近阿萨德飞拉萨',
			author:'zhangsan',
			hot:'热'
		},
		{
			message:'我就是我',
			author:'lisi',
			hot:'热'
		},
		{
			message:'房间爱上的路口附近阿萨德飞拉萨',
			author:'wangwu',
			hot:'热'
		}
	]

function forum(req,res){

	var pageInfo = JSON.stringify({pageSize:22225,curPage:1,total:0});
	var findInfo = JSON.stringify({});
	var sql='getAll("forum",\''+pageInfo+'\',\''+findInfo+'\')';
	var fcontent = [];
	MongoUtil.getAll(sql,function(result){
		for(var i=0;i<result.data.length;i++){
			fcontent[i] = {
				author:''+result.data[i].username,
				message:''+result.data[i].content,
				hot:'热'
			};
		}
		res.write(JSON.stringify(fcontent));
		res.end();
	});		
}
module.exports=forum;