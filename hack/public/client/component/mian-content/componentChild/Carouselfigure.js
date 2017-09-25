var Carouselfigure = Vue.extend({
	template:'#Carouselfigure',
	data:function(){
		return{
			items:{
				imgMsg:[
				]
			},//是否禁用	
			imgfieldSrc:'./../../../../black_productor/client/images/banner/',
			doWhat:['修改','保存'],
			/*这里存放新增窗口所需要的内容*/
			insertData:{src:'',content:'',isShow:false}
		};
	},
	computed:{
		
	},
	components:{
		'popwindow':popwindow
	},
	created:function(){
		this.getData();
		this.$store.state.Carouselfigure.data = this.items;
	},
	methods:{
		toggleWays:function(item,index){
			item.isDisabled= !item.isDisabled;
			if(item.doWhat==this.doWhat[0])
				item.doWhat=this.doWhat[1];
			else{//保存请求,要向后台发送ajax请求，用来修改要进行的操作
				item.doWhat=this.doWhat[0];
				var items = {};
				this.deepCopy(item,items);
				this.$http({
					url:"http://localhost:8080/miancontent/Carouselfigure/update",
					method:'POST',
					data:JSON.stringify(items)
				}).then(function(res){
					console.log(res.data);
					if(res.data=='1'){
						this.$store.state.alert.isShow = true;
						this.$store.state.alert.msg = '修改成功';
						this.getData();
						//修改成功后，重新修改，存放在数组中的内容
					}
				});
			} 
		},
		changeMsg:function(item){
			item.src = item.modelSrc;
			/*this.$store.state.alert.isShow=true;
			this.$store.state.alert.msg='修改成功';*/
		},
		delitem:function(item){
			this.$http({
				url:"http://localhost:8080/miancontent/Carouselfigure/del",
				method:'POST',
				data:JSON.stringify(item.id)
			}).then(function(res){
				if(res.data!='1') return;
				this.$store.state.alert.isShow = true;
				this.$store.state.alert.msg = '删除成功';
				var imgMsg = this.items.imgMsg;
				for(var i=0;i<imgMsg.length;i++){
					if(item.id==imgMsg[i].id){
						this.items.imgMsg.splice(i,1);
					}
				}	
			});	
		},
		/*每次加载都重新获取数据*/
		getData:function(){
			this.$http({
				url:"http://localhost:8080/miancontent/Carouselfigure/getAll",
				method:'POST',
				emulateJSON:true,
				data:JSON.stringify({
					pageInfo:{},
					findInfo:{}
				})
			}).then(function(res){
				var imgMsg = [];
				this.deepCopy(res.data.data,imgMsg);
				for(var i in imgMsg){
					imgMsg[i].isDisabled =true;
					imgMsg[i].modelSrc = imgMsg[i].src;
					imgMsg[i].doWhat = '修改';
				}
				this.items.imgMsg = imgMsg;
			});
		},
		deepCopy:function(obj1,obj2){
			for(var p in obj1){
				if(Array.isArray(obj1[p]))
					obj2[p] = obj1[p].slice(0);	
				else if((typeof obj1[p]=='object')&&obj1[p]!=null){
					obj2[p] = {};
					arguments.callee(obj1[p],obj2[p]);
				}else
					obj2[p] = obj1[p];
			}
		},
		/*切换显示添加功能*/
		toggleadd:function(){
			for(var i in this.insertData){
				if(i!='isShow')
					this.insertData[i]='';
				else
					this.insertData[i]=!this.insertData[i];
			}
		},
		addData:function(){
			/*for(var i in this.items.imgMsg){
				//如果新要插入的对象里面的id已经存在了发出错误提示，并报错
				if(this.items.imgMsg[i].id==this.insertData.id){
					this.$store.state.alert.isShow = true;
					this.$store.state.alert.msg = '已经存在该id';
					return;
				}
			}
			if(this.insertData.id)*/
			this.$http({
				url:'http://localhost:8080/miancontent/Carouselfigure/add',
				method:'POST',
				data:JSON.stringify({
					// id:this.insertData.id,
					src:this.insertData.src,
					content:this.insertData.content
				})
			}).then(function(res){
				if(res.data=='1'){
					this.$store.state.alert.isShow = true;
					this.$store.state.alert.msg = '新增成功';
					this.getData();
				}
					
			});
		}
	}	


});