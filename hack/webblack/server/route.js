var login = require('./loginRoute.js');
var miancontent =require('./miancontent.js');
var proscenium = require('./../black_productor/server/route.js');
function route(req,res,obj){
	switch(obj.page){//看请求的是哪一页
		case 'login':
			login[obj.ways](req,res,obj);
			break;
		case 'miancontent':
			miancontent(req,res,obj);
			break;
		case 'proscenium':
			proscenium(req,res,obj);
			break;	
		default:break;
	}
}
module.exports = route;