Vue.component('updatemsg',{
	template:'#updatemsg',
	data:function(){
		return{
			config:{
				username:localStorage.getItem('prouser'),
				name:'',
				checked:[],
				phone:'',
				mail:'',
				selectedone:[],
				selectedtwo:[],
				signature:'',
			},
		}
	},
	created:function(){
		var username = localStorage.getItem('prouser');
		if(username==null){
			return;
		}else{
			this.$http({
				url:'http://localhost:8080/proscenium/proscenium/getupdatemsg',
				emulateJSON: true,
				method:"post",
				data:JSON.stringify({
					"username":username,
				})
			}).then(function(res){
				for(var i in this.config){
					if(i!='username'){
						this.config[i] = res.data.msgs[i];
					}
				}	
			},function(){})
		}
	},
	methods:{
		send:function(){
			var items =this.config.name==''|this.config.checked==''|this.config.phone==''|this.config.mail==''|this.config.selected==''|this.config.signature=='';
			if(items){
				this.$store.commit('open','不能为空');
			}else{
				this.$http({
					url:"http://localhost:8080/proscenium/proscenium/updatemsg",
					emulateJSON:true,
					method:'POST',
					data:this.config

				}).then(function(res){
					if(res.data=='ok'){
						this.$store.commit('open','修改成功');
						/*this.config.username='';
						this.config.name='';
						this.config.checked='';
						this.config.phone='';
						this.config.mail='';
						this.config.selected='';
						this.config.signature='';*/
					}
				},function(){})
			}
		}
	}
})