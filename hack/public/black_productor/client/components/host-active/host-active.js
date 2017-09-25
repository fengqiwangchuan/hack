var active=Vue.extend({
	template:'#active',
		data:function(){
		return {
			activity:{},
			curIndex:1
			
		}
	},
	created:function(){
		this.$http({
			url:this.$store.state.url+'getData',
			method:'POST',
			data:{
				activity:'',
			}
		}).then((res)=>{
			this.activity=res.data.activity;
		});
	},
	methods:{
		getdate:function(){
			var date=new Date();
			var result = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+
			date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			return result;
		},
		timer:function(){
			for(var i=0;i<activity.srcs.length;i++){
				curIndex=i;
			}
		}
	},
});