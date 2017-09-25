//questionmain组件
var questionmain=Vue.extend({
	template:'#questionmain',
	components:{page:page},
	data:function(){
		return{
			currentIndex:0,
			obj:{message:'',author:'',hot:''},
			flag:false,
			pageConfig:{pageSize:6,curPage:1,total:0,pageGroupIndex:1,pageGroupNum:2,},
			reformat:0
		}
	},
	created:function(){
	    this.$http({
	    	url:this.$store.state.url+'forum',
	    	method:'POST',
	    	data:{
	    		fcontent:[]
	    	}
	    }).then((res)=>{
	    	this.$store.state.fcontent=res.data;
	    	this.pageConfig.total=res.data.length;
	    },()=>{});
	},
	computed:{
		pageGroups:function(){
			return Math.ceil(Math.ceil(this.pageConfig.total/this.pageConfig.pageSize)*1.0/this.pageConfig.pageGroupNum);
		}
	},
	methods:{
		getDate:function(){
			var date=new Date();
			var result= date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+
			date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
			return result;
		},
		format:function(){
			var temp=this.obj.length;
			this.reformat=20-temp;
		},
		send:function(){
			this.obj.author=window.localStorage.prouser;
			this.obj.hot="热";

			console.log(this.$store.state.fcontent);
			var flag = false;	
			if(this.obj.message!=''){
				 this.$http({
			    	url:this.$store.state.url+'sendforum',
			    	method:'POST',
			    	data:{username:this.obj.author,content:this.obj.message}
			    }).then((res)=>{
			    	//this.$store.state.fcontent=res.data;
			    	
			    },()=>{});
				flag=true;
				this.$store.state.fcontent.push(this.obj);
				console.log(this.$store.state.fcontent);
			}
			if(flag)
				this.obj={};
		},
		pagechange:function(index){
			var pageGroups = Math.ceil(Math.ceil(this.pageConfig.total/this.pageConfig.pageSize)/this.pageConfig.pageGroupNum);

			console.log(this.pageConfig.total);
			if(index=='left'&&this.pageConfig.pageGroupIndex>1){
				this.pageConfig.pageGroupIndex--;
				return;
			}
			if(index=='right'&&this.pageConfig.pageGroupIndex<pageGroups){
				this.pageConfig.pageGroupIndex++;
				return;
			}
			if(typeof index=='number'){
				this.pageConfig.curPage = index;
				this.$emit('get-data');
			}
			this.$http({
		    	url:this.$store.state.url+'forum',
		    	method:'POST',
		    	data:{
		    		fcontent:[]
		    	}
		    }).then((res)=>{
		    	this.$store.state.fcontent=res.data;
		    	this.pageConfig.total=res.data.length;
		    },()=>{});
		},
	}

});