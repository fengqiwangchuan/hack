var user=Vue.extend({
	template:'#user',
	components:{
		'hotpush':hotpush,
		'hotpushwindow':hotpushwindow
	},
});
Vue.component('user',user);