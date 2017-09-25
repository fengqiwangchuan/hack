var forum=Vue.extend({
	template:'#forum',
	components:{
		'hotpush':hotpush,
		'hotpushwindow':hotpushwindow
	},
});
Vue.component('forum',forum);