var MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('otherPagedata');

function otherPagedata(list1,list2,list3){

	var pageInfo = JSON.stringify({pageSize:22222,curPage:1,total:0});
	var findInfo = JSON.stringify({});
	var sql='getAll("otherPagedata",\''+pageInfo+'\',\''+findInfo+'\')';

	MongoUtil.getAll(sql,function(result){
		list1 = result.data[0].reads;
		list2 = result.data[0].studyConfig; 
		list3 = result.data[0].schoolConfig;
		return;
		res.end();
		
	});
}
module.exports = otherPagedata;