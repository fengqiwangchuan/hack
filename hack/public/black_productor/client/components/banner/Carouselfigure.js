var Carouselfigure=Vue.extend({
	template:"#figure",
	data:function(){
		return {
			slideList:[],
		    currentIndex: 0,
		    timer: ''
		}
	},
	created:function(){
    //在DOM加载完成后，下个tick中开始轮播
	    this.$nextTick(() => {
	        this.lala();
	    });
	    this.$http({
	    	url:this.$store.state.url+'getData',
	    	method:'POST',
	    	data:{
	    		slideList:[]
	    	}
	    }).then((res)=>{
	    	this.slideList=res.data.slideList;
	    },()=>{});
	},
	methods:{
		 go() {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 2000)
        },
        stop() {
            clearInterval(this.timer)
            this.timer = null
        },
        change(index) {
            this.currentIndex = index
        },
        autoPlay() {
            this.currentIndex++
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0
            }
        },
        lala(){
        	this.timer = setInterval(() => {
	            this.autoPlay()
	        }, 2000);
        }
	},
});