var MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('learning');

function learning(list){
	var pageInfo = JSON.stringify({pageSize:24,curPage:1,total:0});
	var findInfo = JSON.stringify({});
	var sql='getAll("learning",\''+pageInfo+'\',\''+findInfo+'\')';
	MongoUtil.getAll(sql,function(result){
		for(var i=0;i<result.data.length;i++){
			list.learning[i] = result.data[i].title;
		}
	});
}
module.exports = learning;