var list=Vue.extend({
	template:'#list',
	data:function(){
		return {
			curIndex:0,

		}
	},
	computed:{
		titleArr:function(){
			return this.$store.state.listInfo.title;
		}
	},
	created:function(){
		//获取仓库里的要显示的数据
		var titleArr = this.$store.state.listInfo.title;
		var times = this.$store.state.listInfo.times;
		var content = this.$store.state.listInfo.content;
		


		var datasheet = JSON.parse(window.localStorage.getItem('Article')).datasheet;
		if(datasheet=='classActive') datasheet = 'classactivity';

		//console.log(window.localStorage.getItem('Article'));
		var ArticleName = JSON.parse(window.localStorage.getItem('Article')).Name;
		
		console.log(datasheet);

		/*将数据请求过来*/
		this.$http({
			url:'http://localhost:8080/proscenium/proscenium/titleContent',
			emulateJSON: true,
			method:"post",
			data:JSON.stringify({
				datasheet:datasheet
			})
		}).then(function(res){
			var data = res.data;
			console.log(data);
			for(var i in data){
				this.titleArr[i] = data[i].title;
				times[i] = data[i].data;
				content[i] = data[i].content;
			}
			//变成需要的数据表名
			this.$store.state.listInfo.bigTitle = datasheet;
			//切换成活动窗口
			for(var i=0;i<titleArr.length;i++){
				if(titleArr[i]==ArticleName){
					this.curIndex = i;
				}
			}
		});


		
	}
});