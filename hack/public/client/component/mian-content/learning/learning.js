var learning=Vue.extend({
	template:'#learning',
	components:{
		'hotpush':hotpush,
		'hotpushwindow':hotpushwindow
	},
});
Vue.component('learning',learning);