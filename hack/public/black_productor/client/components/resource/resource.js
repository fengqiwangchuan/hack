var resource=Vue.extend({
	template:'#resource',
	data:function(){
		return {
			// resourceConfig:''
			titles:[],
			studyConfig:'',
			schoolConfig:'',
			officialConfig:''
		}
	},
		created:function(){
			this.$http({
				url:this.$store.state.url+'getData',
				method:'POST',
				data:{
					titles:'',
					studyConfig:'',
					schoolConfig:''
				}
			}).then((res)=>{
				this.titles=res.data.titles;
				this.studyConfig=res.data.studyConfig;
				console.log(this.studyConfig);
				this.schoolConfig=res.data.schoolConfig;
				this.officialConfig=res.data.officialConfig;
			});
		}
});