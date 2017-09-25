var hotpush = Vue.extend({
	template:"#hotpush",
	props:['father','hotpushName'],
	components:{
		'paging':paging,
		'hotpushwindow':hotpushwindow
	},
	data:function(){
		return{
			opreation:{reviese:'修改',save:'保存'},
			curOpretion:'修改',
			findInfo:{},
			artices:[],
			oldEl:this.$store.state.menu.newEl
		};
	},
	created:function(){
		// console.log(this.oldEl.subchild);
		// console.log(this.$store.state.menu.oldEl.subchild);
		this.getData();
		// this.$watch('subchild', function(val,oldval){console.log(val)})
	},
	computed:{
		state:function(){
			return this.$store.state.hotpushment.fields;
		},
		field:function(){
			return this.$store.state.hotpushment[this.hotpushName];
		},
		hotpushSearch:function(){
			return this.$store.state.hotpushment[this.hotpushName].fields;
		}
	},
	methods:{

		//切换保存还是取消
		toggleSave:function(item){
			if(item.toggleSave==this.opreation.reviese){
				item.toggleSave = this.opreation.save;
				item.isChecked = true;
				item.isDisabled = false;
			}
			else{
				item.toggleSave = this.opreation.reviese;
				item.isChecked = false;
				item.isDisabled = true;
				/*在这里进行保存item操作*/
				this.$http({
					url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/update',
					emulateJSON:true,
					method:'POST',
					data:JSON.stringify(item),
				}).then(function(res){
					if('1'==res.data){
						this.$store.commit('alert/open','修改成功');
					}
				});
			}
		},
		/*对请求过来的数据进行匹配删除*/
		delitem:function(item){
			this.$http({
				url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/del',
				method:'POST',
				data:JSON.stringify(item.id)
			}).then(function(res){
				if(res.data=='1'){
					this.$store.commit('alert/open','删除成功');
					for(var i in this.artices){
						if(this.artices[i].id=item.id){
							this.artices.splice(i,1);
							var findInfo = {};
							this.getData();
							return;
						}
					}
				}
			});
		},
		showhotPopwwindow:function(){
			this.$store.commit('hotpuswindow/open');
		},
		//增加一项
		addItem:function(){
			var data = this.$store.state.hotpuswindow.items;
			/*for(var i in this.artices){
				if(this.artices[i].id==data.id){
					this.$store.commit('alert/open','存在相同id');
					return;
				}
			}*/
			data = JSON.stringify(data);
			console.log(data);
			this.$http({
				url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/add',
				method:'POST',
				data:data
			}).then(function(res){
				if(res.data=='1'){
					this.$store.commit('hotpuswindow/close');
					this.$store.commit('alert/open','新增成功');
					this.getData();	
				}
			});
		},
		//发送搜索请求
		searchItem:function(){
			this.field.pageConfig = {pageSize:8,curPage:1,total:0,pageGroupIndex:1};
			for(var i in this.hotpushSearch){
				if(!this.hotpushSearch[i].type)
					this.findInfo[this.hotpushSearch[i].name]=this.hotpushSearch[i].defVal;
				else{
					this.findInfo[this.hotpushSearch[i].name] ={
						value:this.hotpushSearch[i].defVal,
						type:this.hotpushSearch[i].type
					};
				}
			}
			this.getData();	
		},
		getData:function(){
			//点击搜索的时候在去获取搜索框里面的内容
			this.$http({
				url:'http://localhost:8080/miancontent/'+this.field.datasheet+'/getAll',
				method:'POST',
				emulateJSON:true,
				data:JSON.stringify({
					pageInfo:this.field.pageConfig,
					findInfo:this.findInfo
				})
			}).then(function(res){
				this.findInfo = {};
				var artices = [];
				/*当数据传输过来的时候将数据赋给pageConfig*/
				this.field.pageConfig.total = res.data.total;
				this.deepCopy(res.data.data,artices);
				for(var i in artices){
					artices[i].isDisabled = true;
					artices[i].isChecked =false;
					artices[i].toggleSave ='修改';
				}
				this.artices = artices;
				// this.deepCopy(artices,this.artices);
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
	}
});