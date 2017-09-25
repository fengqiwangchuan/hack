var paging = Vue.extend({
	template:'#paging',
	props:['hotpushName'],
	data:function(){
		return{
			pageGroupNum:2,//页码数量(可以自定义进行更改)
			pageSize:8
		};
	},
	watch:{//专门监听内部的数据
		pageSize:function(newValue,oldValue){
			this.pageConfig.pageSize=newValue;
		}
	},
	created:function(){
		this.pageMsg = this.$store.state.hotpushment[this.hotpushName].pageConfig;
	},
	computed:{
		pageConfig:function(){
			return this.$store.state.hotpushment[this.hotpushName].pageConfig;
		},
		pages:function(){
			return Math.ceil((this.pageConfig.total)*1.0/this.pageConfig.pageSize);
		},
		/*总的页码数*/
		pageGroups:function(){
			return Math.ceil(this.pages*1.0/this.pageGroupNum);
		},
		showNum:function(){
			return this.pageGroupNum;
		}
	},
	methods:{
		pageChange:function(num){
			console.log('我是谁');
			console.log(this.pages);
			if(num=='left'&&this.pageConfig.pageGroupIndex>1){
				this.pageConfig.pageGroupIndex--;
				return;
			}
			if(num=='right'&&this.pageConfig.pageGroupIndex<this.pageGroups){
				this.pageConfig.pageGroupIndex++;
				return;
			}
			if(typeof num=='number'){
				this.pageConfig.curPage = num;
				this.$emit('get-data');
			}
		}
	}
});


