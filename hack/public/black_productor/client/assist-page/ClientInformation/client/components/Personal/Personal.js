Vue.component('personal',{
	template:'#personal',
	data:function(){
		return{
			config:{
				username:localStorage.getItem('prouser'),
				name:'wefewf',
				checked:[],
				phone:'',
				mail:'',
				selectedone:[],
				selectedtwo:[],
				signature:'',
			}
		}
	},
	created:function(){
		var username = localStorage.getItem('prouser');
		if(username==null){
			window.location.href='http://localhost:8080/black_productor/client/assist-page/login.html';
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
					if(i!='username'&&res.data.msgs[i]){
						this.config[i] = res.data.msgs[i];
					}
				}
				if(this.config.checked[0])
					this.config.sex = this.config.checked[0];
				if(this.config.selectedtwo)	
					this.config.city = this.config.selectedtwo;
			},function(){})	
		}
	}
});