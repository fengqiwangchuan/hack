var MongoUtilCtr=require('./mongoUtil.js');
var MongoUtil=new MongoUtilCtr('user');


function changePSW(req,res){


	var qStr = '';
		req.addListener('data',function(dataPart){
			qStr+=dataPart;
		});
		req.addListener('end',function(){
			var obj = JSON.parse(qStr);
			console.log(obj);
			var temp = {
				password:obj.newword,
			};
			MongoUtil.update({username:obj.username},temp,function(result){
				res.write(result);
				res.end();
			});
		});

}


module.exports = changePSW;