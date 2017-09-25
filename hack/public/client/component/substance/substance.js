var substance = Vue.extend({
	template:"#substance",
	data:function(){
		return{
		};
	},
	components:{
		'index-substance':indexSubstance,
		'main-content':mainContent
	},
	computed:{
		showPage:function(){
			return this.$store.state.menu.oldEl.subchild;
		}
	}
});
Vue.component('substance',substance);