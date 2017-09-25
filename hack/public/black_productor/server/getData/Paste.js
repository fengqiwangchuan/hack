
MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('forum');

var config=[
		{
			id:'001',
			message:'房间爱上的路口附近阿萨德飞拉萨',
			times:'2015-5-18'
		},
		{
			id:'002',
			message:'房间爱上的路口附近阿萨德飞拉萨',
			times:'2016-5-30'
		},
		{	id:'003',
			message:'房间爱上的路口附近阿萨德飞拉萨',
			times:'2015-8-16'
		}
	]
 function Paste(req,res){
 		var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(dataPart){
			/*查找条数限制*/
			var obj = JSON.parse(qStr);
			var pageInfo=JSON.stringify({pageSize:224,curPage:1,total:0});
			var findInfo=JSON.stringify({"username":obj.username});


			var sql='getAll("forum",\''+pageInfo+'\',\''+findInfo+'\')';
			MongoUtil.getAll(sql,function(result){
				res.write(JSON.stringify(result.data));
				res.end();
			});
		});

 		
}
module.exports = Paste;
