var containerNav = Vue.extend({
	template:'#container-nav',
	data:function(){
		return{};
	},
	computed:{
		menuShow:function(){
			return this.$store.state.menu.menuShow;
		}
	},
	methods:{
		move:function(){
			this.$store.state.menu.menuShow=!this.$store.state.menu.menuShow;
			console.log(this.$store.state.menu.menuShow);
		}
	}
});
Vue.component('container-nav',containerNav);