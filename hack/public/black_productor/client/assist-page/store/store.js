// 数据仓库 	
var store = new Vuex.Store({
	state:{
		isShow:false,
		msg:'',
		url:'http://localhost:8080/proscenium/proscenium/',
		fcontent:[],
		pageConfig:{pageSize:8,curPage:1,total:0,pageGroupIndex:1},
		curUser:'',
		editShow:false,
	},
	getters:{},
	mutations:{
		open:function(state,msg){
			state.isShow=true;
			state.msg=msg;
		},
		close:function(state){
			state.isShow = false;
		},
		disclose:function(state){  //打开吐槽框
			state.editShow = true;
		}
	},
	actions:{},
});
