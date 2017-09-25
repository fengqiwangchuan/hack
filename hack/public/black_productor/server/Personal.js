var config = 
	{
		username:'张先森',
		name:'张三',
		sex:'男',
		phone:'15070918978',
		mail:'132600438@qq.com',
		city:'江西',
		signature:'少壮不努力，老大敲代码',
	};
function Personal(req,res){
	req.addListener('data',function(){	
	})
	req.addListener('end',function(){
		res.write(JSON.stringify(config));
		res.end();
	})
}
module.exports = Personal;