// mainbody 主体 
Vue.component('mainbody',{
	template:'#mainbody',
	components:{Carouselfigure:Carouselfigure,
			'host-active':active,
			'recommed-read':read,
			resource:resource,
			'host-push':push,
			contactus:contactus,
	},
	methods:{
		getlocalStorage:function(){
			//localStorage.setItem('user',JSON.stringify('zhangsan'));
			//JSON.parse(localStorage.getItem('user'));
		}
	}
});
