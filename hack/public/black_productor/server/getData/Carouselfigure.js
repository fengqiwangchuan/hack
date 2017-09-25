var MongoUtilCtr=require('../mongoUtil.js');
var MongoUtil=new MongoUtilCtr('Carouselfigure');

function Carouselfigure(list){
	var pageInfo = JSON.stringify({pageSize:24,curPage:1,total:0});
	var findInfo = JSON.stringify({});
	var sql='getAll("Carouselfigure",\''+pageInfo+'\',\''+findInfo+'\')';
	MongoUtil.getAll(sql,function(result){
		for(var i=0;i<result.data.length;i++){
			list[i] ={
				clickUrl:'#',
				image:'images/banner/'+result.data[i].src,
				context:result.data[i].content
			};
		}
	});
}
module.exports = Carouselfigure;

//数据格式
/* {
    clickUrl: "#",
    image:'images/banner/1.jpg',
    context:'"30000元"悬赏最拼的你-致每一位在黑马奋斗的你'
}*/