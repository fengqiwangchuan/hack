Vue.component('changepsw',{
	template:'#changepsw',
	data:function(){
		return{
			userPSW:{
				oldPSW:'',
				newPSW:'',
				renewPSW:''
			}
		};
	},
	methods:{
		/*发送更改用户密码请求*/
		changePSW:function(){
			var username = localStorage.getItem('prouser');
			var password = localStorage.getItem('propassword');
			console.log(password);
			if(this.userPSW.oldPSW==''||this.userPSW.newPSW==""|this.userPSW.renewPSW==""){
				this.$store.commit('open','请输入指定信息');
				return;
			}
			if(this.userPSW.oldPSW!=password){
				this.$store.commit('open','旧密码错误,请核实后修改');
				return;
			}
			if(this.userPSW.newPSW!=this.userPSW.renewPSW){
				this.$store.commit('open','两次密码不一致');
				return;
			}




			this.$http({
				url:'http://localhost:8080/proscenium/proscenium/changepsw',
				emulateJSON: true,
				method:"post",
				data:JSON.stringify({
					"username":username,
					"password":password,
					"newword":this.userPSW.newPSW
				})
			}).then(function(res){
				if(res.data=='1'){
					localStorage.setItem('propassword',this.userPSW.newPSW);
					alert('修改成功请重新登录');
					// this.$store.commit('open','修改成功请重新登录');
					window.location.href='http://localhost:8080/black_productor/client/assist-page/login.html';
				}		
			},function(){})
		}
	}
})