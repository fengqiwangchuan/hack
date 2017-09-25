function route(req,res,obj){
	switch(obj.ways){
		case 'getData':  
		var getData=require('./pagedata.js');
			getData(req,res);
			break;
		case 'login':
		var login = require('./login.js');
			login(req,res);
			break;
		case 'register':
		var register = require('./register.js');
			register(req,res);
			break;
		case 'forum':
		var forum=require('./forum.js');
		forum(req,res);break;
		case '/postPersonalInfo.js':
			var postPersonalInfo=require('./postPersonalInfo.js');
			postPersonalInfo(req,res);break;
		case 'changepsw':
		var changePSW=require('./changePSW.js');
			changePSW(req,res);break;
		case 'sendforum':
			var sendforum=require('./sendforum.js');
			sendforum(req,res);break;
		case '/personal':
		var Personal=require('./Personal.js');
			Personal(req,res);break;
		case 'updatemsg':
		var updateMSG=require('./updateMSG.js');	
			updateMSG(req,res);
			break;
		case 'getupdatemsg':
			var getupdatemsg=require('./getupdatemsg.js');	
			getupdatemsg(req,res);
			break;
		case 'titleContent':
			var titleContent = require('./getData/titleContent.js');
			titleContent(req,res);	
			break;
		case 'paste':
			var Paste = require('./getData/Paste.js');
			Paste(req,res);	
			break;
		default:break;
	}
}
module.exports=route;