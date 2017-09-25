var querystring=require('querystring');
function postPersonalInfo(req,res){
	var qstr='';
	req.addListener('data',function(dataPart){
		qstr+=dataPart;
	});
	//从页面中传过来的是store数组，里面包含一个obj对象
	this.obj=querystring.parse(qstr[obj]);
}
module.exports=postPersonalInfo;