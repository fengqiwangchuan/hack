var hotpuswindowModule={
	namespaced:true,
	state:{
		isShow:false,
		items:{
			id:'',
			title:'',
			data:'',
			src:'',
			isHot:"true"
		},
	},
	getters:{},
	mutations:{//mutations方法中只能使用同步修改
		open:function(state,msg){
			state.isShow=true;
			for(var i in state.items){
				if(i!='isHot')
					state.items[i]='';
			}
			console.log(state.items);
		},
		close:function(state){
			state.isShow=false;	
		},
	},
	//如果是异步更改state必须用actions中的方法
	actions:{}
};
export default hotpuswindowModule