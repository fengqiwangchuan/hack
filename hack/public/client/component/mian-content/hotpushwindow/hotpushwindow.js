var hotpushwindow = Vue.extend({
	template:'#hotpushwindow',
	props:['hotpushName'],
	components:{
		'popwindow':popwindow
	},
	created:function(){
		
	},
	computed:{
		state:function(){
			return this.$store.state.hotpuswindow.items;
		}
	},
	methods:{
		addItem:function(){
			this.$emit('add-item');
		}
	}
});