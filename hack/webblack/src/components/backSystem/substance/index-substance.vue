<template id="index-substance">
    <div class="index-substance">
        <a class="fa fa-home index-home" href="#"></a>
        <ul class="index-substan-data">
            <li class="Carouselfigure">
                <span class="fa fa-image Carouselfigure"></span>
                <em><i v-text="imageMsg.imageAnimate">5</i>张</em>
                <a href="#">images</a>
            </li>

            <li class="hotpush">
                <span class="fa fa-toggle-left hotpush"></span>
                <em><i v-text="hotpush.hotpushAnimate">20</i>条</em>
                <a href="#">hotpush</a>
            </li>
            <li class="forum">
                <span class="fa fa-space-shuttle forum"></span>
                <em><i v-text="forum.forumAnimate">0</i>条</em>
                <a href="#">forum</a>
            </li>
            <li class="userMessage"  >
                <span :class="{'planover': true,'fa':true,'fa-send':true,'userMessage':true}"></span>
                <em><i v-text="user.userAnimate">0</i>条</em>
                <a href="#">user</a>
            </li>
        </ul>	
        <div id="myChart" :style="{width: '400px', height: '400px',float:'left',marginLeft:'100px'}"></div>
        <div id="myChart2" :style="{width: '400px', height: '400px',float:'left',marginLeft:'100px'}"></div>
    </div>	
</template>
<script>

    import TWEEN from 'tween.js'
    export default{
        name:'index-substance',
        data(){
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
        created(){
            this.initData();	
        },
        mounted(){
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
            deepCopy(obj1,obj2){
                for(var p in obj1){
                    if(Array.isArray(obj1[p]))
                        obj2[p] = obj1[p].slice(0);	
                    else if((typeof obj1[p]=='object')&&obj1[p]!=null){
                        obj2[p] = {};
                        this.deepCopy(obj1[p],obj2[p]);
                    }else
                        obj2[p] = obj1[p];
                }
            },
            /*分别使用几个函数来获取对应表的数据，每次当页面加载的时候过零点五秒开始获取对应表的数据，这些数据在对应的数据仓库中*/
            imageGetData(){
                this.imageMsg.list=this.CarouselfigureMsg.imgMsg;
                this.imageMsg.length = 	this.imageMsg.list.length;		
            },
            hotpushGetData(){
                //将工作表里面的数据放到employmentModule数据中去
                this.hotpush.employmentModule=this.employmentModule;
                this.hotpush.learningModule=this.learningModule;
                this.hotpush.classactivityModule=this.classactivityModule;
                /*将三个表的所有总的条数获取到*/
                this.hotpush.Num = this.hotpush.employmentModule.pageConfig.total+this.hotpush.learningModule.pageConfig.total+this.hotpush.classactivityModule.pageConfig.total;
            },
            forumGetData(){
                this.forum.length = this.forumModule.pageConfig.total;
            },
            userGetData(){
                this.user.length = this.userModule.pageConfig.total;
            },
            initData(){
                var that = this;
                setTimeout(function(){
                    that.imageGetData();
                    that.hotpushGetData();
                    that.forumGetData();
                    that.userGetData();
                },1000);
            },
            /*控制条形图和饼图的数据*/
            drawLine(){
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
            drawcircle(){
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
    }
</script>
<style>
    /* 公共样式 */
    .substance .index-home{cursor: pointer;font-size:18px;color:#454141;text-decoration: none;}
    .substance .index-substan-data{list-style: none;width:100%;text-align: center;min-width: 900px;height:140px;}
    .substance .index-substan-data li{display:inline-block;width:20%;margin-right:30px;height:140px;background:blue;border-radius: 10px;cursor: pointer;vertical-align: top;position:relative;overflow:hidden;}
    .substance .index-substan-data li span{font-size:70px;color:#23698F;margin-top:50px;float: left;margin-left:30px;transition:1s;}
    .substance .index-substan-data li:hover span{transform:translateX(280%);}
    .substance .index-substan-data li:hover span.Carouselfigure{transform:scale(1.3);}
    .substance .index-substan-data li:hover span.hotpush{transform:rotate(360deg);}
    /* .substance .index-substan-data li:hover span.userMessage{}*/

    .substance .index-substan-data li:hover span.planover{transform:translateX(280%) translateY(-180%);}

    @keyframes planover{
        0%{transform:translateX(0%) translateY(0%);}
        100%{transform:translateX(-280%) translateY(180%);}
    }  



    .substance .index-substan-data li.Carouselfigure{background:#0090d9;}
    .substance .index-substan-data li.hotpush{background-color:#37a8af;}
    .substance .index-substan-data li.forum{background-color:#3e739d;}
    .substance .index-substan-data li.userMessage{background-color:#f56954;}

    .substance .index-substan-data li em{font-style: normal;font-size:20px;color:#fff;margin-top:30px;display: inline-block;}
    .substance .index-substan-data li em>i{font-style: normal;padding-left:5px;}
    .substance .index-substan-data li a{font-size:13px;position:absolute;bottom:20px;right:10px;text-decoration: none;color:#fff;}

</style>
