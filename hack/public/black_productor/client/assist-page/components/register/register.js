Vue.component('register',{
	template:'#register',
	components:{popwindow:popwindow},
		data:function(){
			return{
				config:{
					username:'',   //用户名
					password:'',   //密码
					rePassword:'', //确认密码
					headImg:'components/register/img/01.jpg'  //头像
				},
				usernameError:'',   //用户名错误提示信息 
				passwordError:'',   //密码错误提示信息
				rePasswordError:'', //确认密码错误提示信息
				usernameErrorShow:false,  //用户名错误提示框
				passwordErrorShow:false,  //密码错误提示框
				rePasswordErrorShow:false, //确认密码错误提示框
				beDisabled:true		 //如果格式错误 按钮不可点击		 
			}
		},
		
		methods:{
			
			// 验证用户输入格式是否正确,如果正确则给服务器发送用户注册信息
			inputBlur:function(errorItem,inputContent){
				var reg1 = /^([a-zA-Z]|[\u4e00-\u9fa5]){1}([a-zA-Z0-9]|[\u4e00-\u9fa5]|[_]){3,15}$/ ;  //用户名由4-16位的字母，数字，汉字，下划线组成，开头只能是字母和汉字
				var reg2 =/^[a-zA-Z0-9]{4,10}$/;   //密码由4-10位的字母，数字组成
				
				if (errorItem === 'username') {
	               if (this.config.username=='') {
	               		this.usernameErrorShow= true;
	                   this.usernameError= '用户名不能为空';
	                   this.beDisabled = true;
	               }else if(!reg1.test(inputContent)){
	               		this.usernameErrorShow= true;
	               		this.usernameError= '格式错误';
	               		this.beDisabled = true;
	               }else{
	                   this.usernameErrorShow= false; 
	                   this.beDisabled = false;  
	               }
	           }else if(errorItem === 'password') {
	               if (inputContent=='') {
	               	   this.passwordErrorShow = true;
	                   this.passwordError = '密码不能为空';
	                   this.beDisabled = true;
	               }else if(!reg2.test(inputContent)){
	               		this.passwordErrorShow = true;
	               		this.passwordError = '格式错误';
	               		this.beDisabled = true;
	               }else{
	                    this.passwordErrorShow = false;
	                    this.beDisabled = false; 
	               }
				}else if(errorItem === 'rePassword'){
					if(inputContent==''){
						this.rePasswordErrorShow = true;
						this.rePasswordError = '请再次输入密码';
						this.beDisabled = true;

					}else if(!reg2.test(inputContent)){
						this.rePasswordErrorShow = true;
						this.rePasswordError = '格式错误';
						this.beDisabled = true;	
					} else{
						this.rePasswordErrorShow = false;
						this.beDisabled = false;
					}
				}else{
					this.beDisabled = true;
				}
			},
			//给服务器发送请求
			send:function(){
				this.$http({
					url:this.$store.state.url+'register',
					emulateJSON: true,
					method:"post",
					data:this.config
				}).then(function(res){
					if(res.data == 'ok'){
						this.$store.commit('open','恭喜您！注册成功,去登录吧');
						this.config.username='';
						this.config.password='',
						this.config.rePassword='';
						//setTimeout(()=>{window.location.href='login.html';},4000);
						window.location.href='login.html';
						
					}else{
						this.$store.commit('open','该用户名已被注册');
					}
				},function(){})
			}
		},
	})
