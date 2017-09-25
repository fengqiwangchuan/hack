var asideMenu = Vue.extend({
	template:'#aside-menu',
	data:function(){
		return{
			title:'welcome back',
			menuList:[],
			oldEl:'',
			fontawes:['fa-tachometer','fa-snowflake-o','fa-telegram','fa-wpexplorer']
			// fontawes:['fa-tachometer','fa-free-code-camp','fa-ravelry','fa-superpowers'],
		};
	},
	computed:{
		state:function(){
			return this.$store.state.menu;
			//通过这个值来绑定控制了菜单栏和内容区域是否隐藏
		}
	},
	created:function(){
		var username = localStorage.getItem('username');
		var password = localStorage.getItem('password');
		this.successfulVerify(username,password);

		this.menuList = this.state.menuList;
		this.oldEl = this.$store.state.menu.menuList[0];
		this.$store.state.menu.oldEl = this.oldEl;
		/*这里做一个首页请求数据的ajax请求，获取首页要加载的数据，因为这个首页的数据是在数据仓库里规定好的，可以发送需要的数据表和相应的请求过去*/
	},
	methods:{
		getTitle:function(){
			return this.state.menuList;
		},
		/*从后台获取要对哪些表格进行操作,获取要操作的数据库*/
		getData:function(){
			this.$http({
				url:'http://localhost:8080/getmenu/'
			}).then(function(){
				//将获取过来的数据从放到menu的数据仓库，到时候跟主要页面信息进行共享
			});
		},
		/*切换二级菜单的显示隐藏*/
		togglemenu:function(item){
			item.isshow = !item.isshow;
		},
		subMActive:function(item,index){
			/*将当前活动的那个操作的数据放到menuoldEl中共内容读取要显示那个*/
			this.$store.state.menu.oldEl = item;
			//获取到了当前要操作的表格
			this.oldEl.subchild = '';
			item.subchild = index;
			this.oldEl = item;
			this.$store.state.menu.newEl = this.$store.state.menu.oldEl.subchild;
			console.log(this.$store.state.menu.oldEl.subchild);
		},
		/*每次进入管理系统页面就进行验证用户信息，如果信息有误提示，并且跳转到登录页*/
		successfulVerify:function(username,password){
			this.$http({
				url:"http://localhost:8080/login/user/test",
				method:'POST',
				data:JSON.stringify({username:username,password:password})
			}).then(function(res){
				if('ok'==res.data){
					var that = this;
					/*this.$store.commit('alert/open','欢迎回来');
					setTimeout(function(){
						that.$store.commit('alert/close');
					},500);
					return;*/
				}else{
					this.$store.commit('alert/open','信息过期请重新验证');
					window.location.href='http://localhost:8080/client/login/login.html';
				}
			});
		},
		/*退出登录*/
		loginout:function(){
			localStorage.removeItem('username');
			localStorage.removeItem('password');
			window.location.href='http://localhost:8080/client/index.html';
		},
		/*跳转前台*/
		gotobefore:function(){
			window.location.href='http://localhost:8080/black_productor/client/index.html';
		}

	}
});
Vue.component('aside-menu',asideMenu);