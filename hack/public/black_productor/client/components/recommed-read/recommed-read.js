var read=Vue.extend({
	template:'#recommed-read',
	components:{sendmessage:sendmessage},
	data:function(){
		return {
			reads:''
		}
	},
	created:function(){
		this.$http({
			url:this.$store.state.url+'getData',
			method:'POST',
			data:{
				reads:''
			}
		}).then((res)=>{
			this.reads=res.data.reads;
		});
	}
})