var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('forum');

function postPersonalInfo(req,res){
	var qstr='';
	req.addListener('data',function(dataPart){
		qstr+=dataPart;
		var temp=JSON.parse(qstr);
		console.log(temp);

		var pageInfo2 = JSON.stringify({pageSize:9999,curPage:1,total:0});
		var findInfo2 = JSON.stringify({});
		var sql='getAll("forum",\''+pageInfo2+'\',\''+findInfo2+'\')';
		MongoUtil.getAll(sql,function(result){
			var id = result.data[result.data.length-1].id-(-1);
			temp.id = ('00'+id).slice(-3);
			MongoUtil.add(temp,function(result){
				res.write(result);
				res.end();
			});
		});
	});
	//从页面中传过来的是store数组，里面包含一个obj对象
	// this.obj=querystring.parse(qstr[obj]);
}
module.exports=postPersonalInfo;