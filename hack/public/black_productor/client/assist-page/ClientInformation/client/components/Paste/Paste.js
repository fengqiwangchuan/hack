Vue.component('paste',{
	template:'#paste',
	data:function(){
		return {
			title:'帖子中心',
			caption:'用户名',
			time:'内容',
			delete:'删除',
			key:'',
			config:[
					{
						id:'001',
					 	message:'房间爱上的路口附近阿萨德飞拉萨',
					 	times:'2015-5-18'
					},
					// {
					// 	id:'002',
					// 	message:'房间爱上的路口附近阿萨德飞拉萨',
					// 	times:'2016-5-30'
					// },
					// {	id:'003',
					// 	message:'房间爱上的路口附近阿萨德飞拉萨',
					// 	times:'2015-8-16'
					// }
			]
		}
	},
	created:function(){
		var username = localStorage.getItem('prouser');
		if(username==null) return;

		this.$http({
			url:'http://localhost:8080/proscenium/proscenium/paste',
			emulateJSON:true,
			method:"post",
			data:JSON.stringify({username:username})
		}).then(function(res){
			var data = res.data;
				
			this.config = res.data;
				//this.config[i]. = data[i].content; 
			
		},function(){})
	},	
	methods:{
		
		// del:function(target){
		// 	if(!confirm('真删?')) return;
		// 	var tr = target.parentNode.parentNode;
		// 	console.log(tr.tagName)
		// 	document.getElementsByTagName('tbody')[0].removeChild(tr);
	}
})