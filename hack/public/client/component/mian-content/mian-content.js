var mainContent = Vue.extend({
	template:'#main-content',
	props:['show-page'],
	data:function(){
		return{
			superMenu:'首页管理'
		};
	},
	created:function(){
		
	},
	computed:{
		/*这里用来查看点击的是否是主要显示主要内容几张表下的数据*/
		mainContentisshow:function(){
			if(this.$store.state.menu.oldEl.superMenu==this.superMenu){
				return true;
			}
		}
	},
	components:{
		'Carouselfigure':Carouselfigure,
	}
});