var store=new Vuex.Store({
	state:{
		 url:'http://localhost:8080/proscenium/proscenium/'
	},
	mutations:{},
	getters:{},
	actions:{},
	modules:{read:recommedreadModule,
		push:hotPushModule
	}
})