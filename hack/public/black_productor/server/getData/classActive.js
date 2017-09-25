var MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('classactivity');

function classActive(list){
	var pageInfo = JSON.stringify({pageSize:24,curPage:1,total:0});
	var findInfo = JSON.stringify({});
	var sql='getAll("classactivity",\''+pageInfo+'\',\''+findInfo+'\')';
	MongoUtil.getAll(sql,function(result){
		for(var i=0;i<result.data.length;i++){
			list.classActive[i] = result.data[i].title;
		}
	});
}
module.exports = classActive;