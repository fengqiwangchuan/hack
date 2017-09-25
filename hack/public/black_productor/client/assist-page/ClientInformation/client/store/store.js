// 数据仓库 	
var store = new Vuex.Store({
	state:{
		isShow:false,
		msg:'',
		url:'http://localhost:8080/',
	},
	getters:{},
	mutations:{
		open:function(state,msg){
			state.isShow=true;
			state.msg=msg;
		},
		close:function(state){
			state.isShow = false;
		}
	},
	actions:{},
});
