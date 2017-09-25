var MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('titleContent');




function titleContent(req,res){
	var qStr='';
		//从请求体中获取请求数据会不断触发data事件
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		//从请求体中获取完请求数据会触发end事件
		req.addListener('end',function(){
			var temp=JSON.parse(qStr);
			var pageInfo2 = JSON.stringify({pageSize:9999,curPage:1,total:0});
			var findInfo2 = JSON.stringify({});

			console.log(temp);


			var sql='getAll(\''+temp.datasheet+'\',\''+pageInfo2+'\',\''+findInfo2+'\')';

			MongoUtil.getAll(sql,function(result,err){
				res.write(JSON.stringify(result.data));
				res.end();
			});
			/*MongoUtil.add(temp,function(result){
			});*/
		});







	

	/*MongoUtil.getAll(sql,function(result){
		for(var i=0;i<result.data.length;i++){
			list[i] ={
				clickUrl:'#',
				image:'images/banner/'+result.data[i].src,
				context:result.data[i].content
			};
		}
	});*/
}
module.exports = titleContent;