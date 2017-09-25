<template id="Carouselfigure">
    <div class="main-content-Carouselfigure" >	
            <div class="addContent">
                <a href="#" class="addcontent-btn" @click="toggleadd">新增</a>
                <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
                    <div class="addCarousefigure" v-show="insertData.isShow">
                        <!-- <label for="Carousel">id:<input type="text" id="Carouselid" v-model="insertData.id"></label> -->
                        <label for="Carouselsrc">src:<input type="text" id="Carouselsrc"  v-model="insertData.src"></label>
                        <label for="Carouselcontent">content:<input type="text" id="Carouselcontent"  v-model="insertData.content"></label>
                        <input type="button" value="新增" @click="addData">
                    </div>	
                </transition>	
            </div>
        <ul class="Carousel-content">
            <li v-for="(item,index) in items.imgMsg" :key="index">
                <span class="Carousel-imgs" :style="{backgroundImage:'url('+imgfieldSrc+item.src+')'}"></span>
                <textarea name="" id="" cols="30" rows="10"  :disabled="item.isDisabled" v-model="item.content"></textarea>
                <div class="Carousel-control">
                    <input type="text" v-model="item.modelSrc" v-on:blur="changeMsg(item)"  :disabled="item.isDisabled"
                    @keyup.enter="changeMsg(item)">
                    <a @click="delitem(item)" class="fa fa-trash-o"></a>
                    <a @click="toggleWays(item,index)" :class="{'fa':true,'fa-refresh':item.doWhat=='修改','fa-save':item.doWhat=='保存'}"></a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import popwindow from '../../pagecontent/popwindow.vue'
    export default{
        data(){
            return{
                items:{
                    imgMsg:[]
                },//是否禁用	
                imgfieldSrc:'/static/img/Carouselfigure/',
                //./../../../../black_productor/client/images/banner/
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
        created(){
            this.getData();
            this.$store.state.Carouselfigure.data = this.items;
        },
        methods:{
            toggleWays(item,index){
                item.isDisabled= !item.isDisabled;
                if(item.doWhat==this.doWhat[0])
                    item.doWhat=this.doWhat[1];
                else{//保存请求,要向后台发送ajax请求，用来修改要进行的操作
                    item.doWhat=this.doWhat[0];
                    var items = {};
                    this.deepCopy(item,items);
                    this.$ajax({
                        url:"http://localhost:8080/miancontent/Carouselfigure/update",
                        method:'POST',
                        emulateJSON:true,
                        data:JSON.stringify(items)
                    }).then((res)=>{
                        if(res.data=='1'){
                            this.$store.state.alert.isShow = true;
                            this.$store.state.alert.msg = '修改成功';
                            this.getData();
                            //修改成功后，重新修改，存放在数组中的内容
                        }
                    });
                } 
            },
            changeMsg(item){
                item.src = item.modelSrc;
                /*this.$store.state.alert.isShow=true;
                this.$store.state.alert.msg='修改成功';*/
            },
            delitem(item){
                this.$ajax({
                    url:"http://localhost:8080/miancontent/Carouselfigure/del",
                    method:'POST',
                    data:JSON.stringify(item.id)
                }).then((res)=>{
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
            getData(){
                this.$ajax({
                    url:"http://localhost:8080/miancontent/Carouselfigure/getAll",
                    method:'POST',
                    emulateJSON:true,
                    data:JSON.stringify({
                        pageInfo:{},
                        findInfo:{}
                    })
                }).then((res)=>{
                    var imgMsg = [];
                    this.deepCopy(res.data.data,imgMsg);
                    for(var i in imgMsg){
                        imgMsg[i].isDisabled =true;
                        imgMsg[i].modelSrc = imgMsg[i].src;
                        imgMsg[i].doWhat = '修改';
                    } 
                    this.items.imgMsg = imgMsg;
                });

               /*  this.$http({
                    url:"http://localhost:8080/miancontent/Carouselfigure/getAll",
                    method:'POST',
                    emulateJSON:true,
                    data:JSON.stringify({
                        shui:{'name':'woshi'},
                        pageInfo:{},
                        findInfo:{}
                    })
                }).then(function(res){
                    var imgMsg = [];
                    imgMsg = res.data.data;
                    this.deepCopy(res.data.data,imgMsg);
                    for(var i in imgMsg){
                        imgMsg[i].isDisabled =true;
                        imgMsg[i].modelSrc = imgMsg[i].src;
                        imgMsg[i].doWhat = '修改';
                    } 
                    this.items.imgMsg = imgMsg;
                    
                }); */
            },
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
            /*切换显示添加功能*/
            toggleadd(){
                for(var i in this.insertData){
                    if(i!='isShow')
                        this.insertData[i]='';
                    else
                        this.insertData[i]=!this.insertData[i];
                }
            },
            addData(){
                /*for(var i in this.items.imgMsg){
                    //如果新要插入的对象里面的id已经存在了发出错误提示，并报错
                    if(this.items.imgMsg[i].id==this.insertData.id){
                        this.$store.state.alert.isShow = true;
                        this.$store.state.alert.msg = '已经存在该id';
                        return;
                    }
                }
                if(this.insertData.id)*/
                this.$ajax({
                    url:'http://localhost:8080/miancontent/Carouselfigure/add',
                    method:'POST',
                    data:JSON.stringify({
                        // id:this.insertData.id,
                        src:this.insertData.src,
                        content:this.insertData.content
                    })
                }).then((res)=>{
                    if(res.data=='1'){
                        this.$store.state.alert.isShow = true;
                        this.$store.state.alert.msg = '新增成功';
                        this.getData();
                    }
                        
                });
            }
        } 
    }
</script>
<style scoped>
    /* 公共样式 */
    .main-content-Carouselfigure{}
    .Carouselfigureanimate{}
    .main-content-Carouselfigure .Carousel-content{list-style: none;transition: all 1s;}
    .main-content-Carouselfigure .Carousel-content li{vertical-align: top;height:132px;float:left;width:400px;position:relative;overflow:hidden;margin-left:30px;margin-top:30px;}
    .main-content-Carouselfigure .Carousel-content li .Carousel-imgs{display:inline-block;height:130px;width:200px;background:url(/static/img/Carouselfigure/1.jpg);background-size:100% 100%;transition: 1s;vertical-align: top;border-radius: 30px;}
    .main-content-Carouselfigure .Carousel-content li .Carousel-imgs:hover{transform:scale(1.04);}
    .main-content-Carouselfigure .Carousel-content li .Carousel-control{display:inline-block;position:absolute;top:50px;right:10px;text-align: center;}
    .main-content-Carouselfigure .Carousel-content li .Carousel-control a{cursor: pointer;}

    .main-content-Carouselfigure .Carousel-content li textarea{
    resize:none;outline:none;height:125px;width:100px;border-radius: 10px;color:#7A5D5D;font-size:1px;}
    .main-content-Carouselfigure .Carousel-content li textarea[disabled]{}
    .main-content-Carouselfigure .Carousel-content li input[disabled]{background:rgba(255,255,255,1);}
    .main-content-Carouselfigure .Carousel-content li input{outline:none;display:block;width:50px;}
    .main-content-Carouselfigure .Carousel-content li a{border:1px solid block;}

    .main-content-Carouselfigure .addContent{padding-left:50px;}
    .main-content-Carouselfigure .addCarousefigure{font-size:15px;font-style:normal;margin-left:60px;margin-top:3px;display: inline-block;}
    .main-content-Carouselfigure .addContent .addcontent-btn{text-decoration: none;color:#B99E9E;font-size:25px;}
    .main-content-Carouselfigure .addCarousefigure label{margin-left:35px;font-size:20px;color:#B18686;vertical-align: bottom;}
    .main-content-Carouselfigure .addCarousefigure input{outline: none;}
    .main-content-Carouselfigure .addCarousefigure input#Carouselid{width:50px;}

</style>
