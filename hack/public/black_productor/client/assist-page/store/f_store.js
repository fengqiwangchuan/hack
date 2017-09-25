var store=new Vuex.Store({
	state:{
		 url:'http://localhost:8080',
		 isShow:false
	},
	mutations:{
		open:function(){
			this.isShow=true;
			console.log(this.isShow);
		}
	},
	getters:{},
	actions:{},
})