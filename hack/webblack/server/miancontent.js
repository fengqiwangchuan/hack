var Carouselfigure = require('./miancontent/CarouselfigureRoute.js');
var employment = require('./miancontent/employmentRoute.js');
var learning = require('./miancontent/learningRoute.js');
var classactivity = require('./miancontent/classactivityRoute.js');
var forum = require('./miancontent/forumRoute.js');
var user = require('./miancontent/userRoute.js');
function miancontent(req,res,obj){
	switch(obj.datasheet){
		case 'Carouselfigure':
			Carouselfigure[obj.ways](req,res);
			break;
		case 'employment':
			employment[obj.ways](req,res,obj);
			break;
		case 'learning':
			learning[obj.ways](req,res,obj);
			break;
		case 'classactivity':
			classactivity[obj.ways](req,res,obj);
			break;
		case 'forum':
			forum[obj.ways](req,res,obj);
			break;
		case 'user':
			user[obj.ways](req,res,obj);
			break;
		default:break;
	}
}

module.exports = miancontent;