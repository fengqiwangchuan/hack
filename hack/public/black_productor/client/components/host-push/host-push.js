var push=Vue.extend({
	template:'#host-push',
	data:function(){
		return {
			hotpushConfig:'',
			curIndex:'0',
			arr:['employment','learning','classActive']
		};
	},
	computed:function(){
		pushState:return this.$store.state.push.state;
	},	
	created:function(){
		this.$http({
			url:this.$store.state.url+'getData',
			method:'POST',
			data:{
				hotpushConfig:''
			}
		}).then((res)=>{
			this.hotpushConfig=res.data.hotpushConfig;
		});
	},
	methods:{
		curIitem:function(item){
			for(var i in this.arr){
				if(this.arr[i]==item){
					return i;
				}
			}
		},
		//跳转文章页，并添加对应的跳转文章名
		toggoleArtice:function(ArticleName,datasheet){
			//window.localStorage.setItem('ArticleName',ArticleName);
			window.localStorage.setItem('Article',JSON.stringify({
				Name:ArticleName,
				datasheet:datasheet
			}));
			//console.log(window.localStorage.getItem('Article'));
			window.location.href='http://localhost:8080/black_productor/client/assist-page/listPage.html';
		}
	}
});
