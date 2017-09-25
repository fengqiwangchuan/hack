Vue.component('login',{
	template:'#login',
	components:{popwindow:popwindow},
	data:function(){
		return{
			config:{            
				username:'',	//用户名		 
				password:'',	//密码		
			},
			usernameError:'',    //用户名错误提示信息 
			passwordError:'',	 //密码错误提示信息
			usernameErrorShow:false,  //用户名错误提示框
			passwordErrorShow:false,  //密码错误提示框
			headImg:'components/login/img/0.jpg',  //头像
			beDisabled:true     //如果格式错误 按钮不可点击
		}
	},
	methods:{
		//  验证用户输入格式是否正确
		inputBlur:function(errorItem,inputContent){
			var reg1 = /^([a-zA-Z]|[\u4e00-\u9fa5]){1}([a-zA-Z0-9]|[\u4e00-\u9fa5]|[_]){3,15}$/ ;  //用户名由4-16位的字母，数字，汉字，下划线组成，开头只能是字母和汉字
			var reg2 =/^[a-zA-Z0-9]{4,10}$/;   //密码由4-10位的字母，数字组成	

			if (errorItem === 'username') {     
               if (inputContent=='') {
               		this.usernameErrorShow= true;
                   this.usernameError= '用户名不能为空';
                   this. beDisabled=true;
               }else if(!reg1.test(inputContent)){
               		this.usernameErrorShow= true;
               		this.usernameError= '格式错误';
               		this. beDisabled=true;
               }else{
                   this.usernameErrorShow= false;
                   this. beDisabled=false; 
               }
           }else if(errorItem === 'password') {
               if (inputContent=='') {
               	   this.passwordErrorShow = true;
                   this.passwordError = '密码不能为空';
                   this. beDisabled=true;
               }else if(!reg2.test(inputContent)){
               		this.passwordErrorShow = true;
        	       	this.passwordError = '格式错误';
        	       	this. beDisabled=true;
               }else{
                    this.passwordErrorShow = false;
                    this.beDisabled = false;    
               }
			}else{
				this.beDisabled = true;
			}
		},
		//给服务器发送
		send:function(){
			this.$http({
				url:this.$store.state.url+'login',
				emulateJSON: true,
				method:"post",
				data:this.config
			}).then(function(res){
				if(res.data.text == 'ok'){
					this.$store.commit('open','登陆成功');
					this.username=res.data.username;//更新页面数据为服务器获取的数据
					this.password=res.data.password;
					// localStorage.setItem('user',JSON.stringify('zhangsan'));
					var store=[],memory={};
					if(window.localStorage){//将服务器获取的数据存在本地localStorage
						localStorage.setItem('prouser',this.username);
						memory.password=localStorage.setItem('propassword',this.password);
					}/*else{
						memory.user=cookie.write('user',JSON.stringify(this.username));
						memory.password=cookie.write('password',JSON.stringify(this.password));
					}*/
					store.push(memory);
					 // var customerId = res.data.attr.customerInfo.id;//将数据中用户信息的ID赋值给变量 
        			   // sessionStorage.customerId = customerId;//将变量存储到本地sessionStorage中，并且value为customerID 
          			window.location.href='postdisplay.html';//正确登录后页面跳转至首页	
				}else if(res.data == 'pswErr'){
					this.$store.commit('open','密码错误');	
					this.config.username='';
					this.config.password='';
				}
				else{
					this.$store.commit('open','您还没有注册！');
					this.config.username='';
					this.config.password='';
				}
			},function(){})
		}
	}
});