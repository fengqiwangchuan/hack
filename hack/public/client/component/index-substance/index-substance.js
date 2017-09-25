var indexSubstance = Vue.extend({
	template:'#index-substance',
	data:function(){
		return{
			imageMsg:{
				list:[],
				length:'0',
				imageAnimate:0,
			},
			hotpush:{
				employmentModule:{},
				learningModule:{},
				classactivityModule:{},
				Num:'20',
    			hotpushAnimate:0
			},
    		forum:{
    			list:[],
				length:'0',
				forumAnimate:0,
    		},
    		user:{
    			list:[],
				length:'0',
				userAnimate:0,
    		},
    		/*矩形图数据*/
    		figureLine:{
    			data:[0,0,0,0],
				listNum:["轮播图","推送消息","论坛","用户"]	
    		},
			/*饼图数据*/
			figurecircle:{
				data:[
		            {value:0, name:'图片数量'},
		            {value:0, name:'推送消息'},
		            {value:0, name:'帖子数量'},
		            {value:0, name:'用户数量'},
				]
			}
				
		};
	},
	created:function(){
		this.initData();	
	},
	mounted:function(){
	   this.drawLine();
	   this.drawcircle();
	},
	watch: {
	 	/*获取图片长度的动画*/
	    'imageMsg.length': function(newValue, oldValue) {
	      	var vm = this
	      	function animate(){
	       		if (TWEEN.update()) {
	          		requestAnimationFrame(animate)
	        	}
	      	}
	      	new TWEEN.Tween({ tweeningNumber: oldValue })
	        	.easing(TWEEN.Easing.Quadratic.Out)
	        	.to({ tweeningNumber: newValue }, 18000)
	        	.onUpdate(function () {
	         		 vm.imageMsg.imageAnimate = this.tweeningNumber.toFixed(0)
	        })
	        .start()
	      	animate()
	    },
	    /*获取文章长度的动画*/
	    'hotpush.Num': function(newValue, oldValue) {
	      	var vm = this
	      	function animate () {
	       		if (TWEEN.update()) {
	          		requestAnimationFrame(animate)
	        	}
	      	}
	      	new TWEEN.Tween({ tweeningNumber: oldValue })
	        	.easing(TWEEN.Easing.Quadratic.Out)
	        	.to({ tweeningNumber: newValue }, 18000)
	        	.onUpdate(function () {
	         		 vm.hotpush.hotpushAnimate = this.tweeningNumber.toFixed(0)
	        })
	        .start()
	      	animate()
	    },
	    'forum.length': function(newValue, oldValue) {
	      	var vm = this
	      	function animate () {
	       		if (TWEEN.update()) {
	          		requestAnimationFrame(animate)
	        	}
	      	}
	      	new TWEEN.Tween({ tweeningNumber: oldValue })
	        	.easing(TWEEN.Easing.Quadratic.Out)
	        	.to({ tweeningNumber: newValue }, 18000)
	        	.onUpdate(function () {
	         		 vm.forum.forumAnimate = this.tweeningNumber.toFixed(0)
	        })
	        .start()
	      	animate()
	    },
	    'user.length': function(newValue, oldValue) {
	      	var vm = this
	      	function animate () {
	       		if (TWEEN.update()) {
	          		requestAnimationFrame(animate)
	        	}
	      	}
	      	new TWEEN.Tween({ tweeningNumber: oldValue })
	        	.easing(TWEEN.Easing.Quadratic.Out)
	        	.to({ tweeningNumber: newValue }, 18000)
	        	.onUpdate(function () {
	         		 vm.user.userAnimate = this.tweeningNumber.toFixed(0)
	        })
	        .start()
	      	animate()
	    },
	    /*动态增加表格的数据*/
	    'imageMsg.imageAnimate':function(newValue, oldValue){
	    	this.figureLine.data[0] = newValue;
	    	this.figurecircle.data[0].value = newValue*20;
	    	this.drawLine();
	    	this.drawcircle();
	    },
	    'hotpush.hotpushAnimate':function(newValue, oldValue){
	    	this.figureLine.data[1] = newValue;
	    	this.figurecircle.data[1].value = newValue*20;;
	    	this.drawLine();
	    	this.drawcircle();
	    },
	    'forum.forumAnimate':function(newValue, oldValue){
	    	this.figureLine.data[2] = newValue;
	    	this.figurecircle.data[2].value = newValue*20;;
	    	this.drawLine();
	    	this.drawcircle();
	    },
	    'user.userAnimate':function(newValue, oldValue){
	    	this.figureLine.data[3] = newValue;
	    	this.figurecircle.data[3].value = newValue*20;
	    	this.drawLine();
	    	this.drawcircle();
	    },
	},
	computed:{
		CarouselfigureMsg:function(){
			return this.$store.state.Carouselfigure.data;
		},
		employmentModule:function(){
			return this.$store.state.hotpushment.employment;
		},
		learningModule:function(){
			return this.$store.state.hotpushment.learning;
		},
		classactivityModule:function(){
			return this.$store.state.hotpushment.classactivity;
		},
		forumModule:function(){
			return this.$store.state.hotpushment.forum;
		},
		userModule:function(){
			return this.$store.state.hotpushment.user;
		},
	},
	methods:{
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
		/*分别使用几个函数来获取对应表的数据，每次当页面加载的时候过零点五秒开始获取对应表的数据，这些数据在对应的数据仓库中*/
		imageGetData:function(){
			this.imageMsg.list=this.CarouselfigureMsg.imgMsg;
			this.imageMsg.length = 	this.imageMsg.list.length;		
		},
		hotpushGetData:function(){
			//将工作表里面的数据放到employmentModule数据中去
			this.hotpush.employmentModule=this.employmentModule;
			this.hotpush.learningModule=this.learningModule;
			this.hotpush.classactivityModule=this.classactivityModule;
			/*将三个表的所有总的条数获取到*/
			this.hotpush.Num = this.hotpush.employmentModule.pageConfig.total+this.hotpush.learningModule.pageConfig.total+this.hotpush.classactivityModule.pageConfig.total;
		},
		forumGetData:function(){
			this.forum.length = this.forumModule.pageConfig.total;
		},
		userGetData:function(){
			this.user.length = this.userModule.pageConfig.total;
		},
		initData:function(){
			var that = this;
			setTimeout(function(){
				that.imageGetData();
				that.hotpushGetData();
				that.forumGetData();
				that.userGetData();
			},1000);
		},
		/*控制条形图和饼图的数据*/
		drawLine:function(){
	    	var that = this;
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(document.getElementById('myChart'));
		        // 绘制图表
		        
		    myChart.setOption({
	            title: { text: '' },
	            tooltip: {},
	            xAxis: {
	                data: that.figureLine.listNum
	            },
	            yAxis: {},
	            series: [{
	                name: '数量',
	                type: 'bar',
	                data: that.figureLine.data
	            }]
	        });
	    },
	    drawcircle:function(){
	    	var that = this;
	        // 基于准备好的dom，初始化echarts实例
	        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
	        // 绘制图表
	        myChart2.setOption({
	            series : [
			        {
			            name: '访问来源',
			            type: 'pie',
			            radius: '55%',
			            data:that.figurecircle.data,
			           	roseType: 'angle'
			        }
			    ]
	        });  
		},
	}
});