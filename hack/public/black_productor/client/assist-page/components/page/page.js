var page=Vue.extend({
	template:'#page',
	props:['pagecofig'],
	data:function(){
		return {
		}
	},
	computed:{
		pageConfig:function(){
			return this.pagecofig;
		},
		pages:function(){
			return Math.ceil(this.pageConfig.total*1.0/this.pageConfig.pageSize);
		},
		pageGroups:function(){
			return Math.ceil(this.pages*1.0/this.pagecofig.pageGroupNum);
		}
	},
	methods:{
		pageChange:function(index){
			console.log(this.pages);
			this.$emit('pagechange',index);
		}
	}
});