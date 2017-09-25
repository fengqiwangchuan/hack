var employment=Vue.extend({
	template:'#employment',
	components:{
		'hotpush':hotpush,
		'hotpushwindow':hotpushwindow
	},
});
Vue.component('employment',employment);