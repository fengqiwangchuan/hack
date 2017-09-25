var login = Vue.extend({
	template:'#login',
	data:function(){
		return{
			idnum:'',
			wrappershow:false,
			username:'',
			usererror:false,
			password:'',
			pswderror:false,
			idcode:'',
			idcodeer:false,
			idcodeArr:{
				num:[0,1,2,3,4,5,6,7,8,9],
				letters:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
			},
		};
	},
	mounted:function () {
    	//这里是vue初始化完成后执行的函数
        this.wrappershow = true;
        this.$nextTick(function () {
           //应该是这里执行关闭动画
        });
    },
	watch:{

	},
	computed:{
		state:function(){
			return this.$store.state.alert;
		}
	},
	created:function(){
		this.rtnNum();
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		this.autoverify(username,password);
	},
	methods:{
		/*能否通过验证*/
		ispass:function(ev){
			ev.preventDefault();
			var reg = '/'+this.idnum+'/gi';
			reg = ''+reg+'.test("'+this.idcode+'")';
			/*用户名密码是否填写完整*/
			if(this.username==''||this.password==''||this.idcode==''){
				this.state.isShow=true;
				this.state.msg='请输入登录信息';
				// alert('请输入登录信息');
				return;
			}
			/*验证码是否是否正确*/
			if(!eval(reg)){
				this.state.isShow=true;
				this.state.msg='请输入正确验证码';
				// alert('请输入正确验证码');
				return;
			}
			/*如果信息填写正确发送服务器请求*/
			this.successfulVerify(this.username,this.password);
			
		},
		/*验证码生成规则*/
		rtnNum:function(){
			this.idnum ='';
			for(var i=0,n='';i<3;i++){
				n= Math.floor(Math.random()*this.idcodeArr.num.length);
				this.idnum+=n;
			}
			for(var i=0,n='';i<1;i++){
				n= Math.floor(Math.random()*this.idcodeArr.letters.length);
				n=this.idcodeArr.letters[n];
				this.idnum+=n;
			}
		},
		/*用户名格式提示*/
		usjudge:function(){
			if(this.username.length<5){
				this.usererror = true;
			}else{
				this.usererror = false;
			}
		},
		/*密码格式提示*/
		pswjudeg:function(){
			if(this.password.length==0)
				this.pswderror=true
			else 
				this.pswderror=false;
		},
		idcojudeg:function(){
			if(this.idcode.length!=4)
				this.idcodeer=true
			else 
				this.idcodeer=false;
		},
		successfulVerify:function(username,password){
			this.$http({
				url:"http://localhost:8080/login/user/test",
				method:'POST',
				data:JSON.stringify({username:username,password:password})
			}).then(function(res){
				if('ok'==res.data){
					localStorage.setItem('username',this.username);
					localStorage.setItem('password',this.password);
					window.location.href='http://localhost:8080/client/index.html';
				}else{
					this.$store.commit('alert/open','用户名或密码错误');
				}
			});
		},
		autoverify:function(username,password){
			if(username!=null&&password!=null){
				this.username = username;
				this.password = password;
				this.idcode = this.idnum;
			}
		}
	}

});
Vue.component('login',login);