<template id="aside-menu">
    <div class="aside-menu">
        <!-- 菜单栏设置 -->
        <!-- 管理员信息显示 -->
        <section class="aside-menu-header">
            <span class="heade-logo"></span>
            <h5 class="admin-name" v-text="title">welcom back</h5>
        </section>
        <!-- 管理员信息操作页  -->
        <section class="admin-control">
            <ul>
                <li class="fa fa-history" @click="gotobefore"></li>
                <li class="fa fa-life-buoy"></li>
                <li class="fa fa-power-off" @click="loginout"></li>
            </ul>
        </section>

        <!-- option选项控制菜单栏 -->
        <!--  v-text="menuList"	 -->
        <section class="menu-option">
            <ul class="menu-super">
                <li v-for="(item,index) in menuList" :key="index">
                    <div @click="togglemenu(item)" :class="{'active':item.isshow}">
                        <em :class="['fa',fontawes[index]]"></em>
                        <span v-text="item.superMenu">这是菜单一</span>
                        <a><</a>
                    </div>
                    <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
                        <ul class="menu-sub animated active" v-show="item.isshow">
                            <li v-for="(option,i) in item.subMenu" v-text="option" :class="{'active':i==item.subchild}" @click="subMActive(item,i,option)" :key="i">子菜单一</li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>  
    export default {
        name:'aside-menu',
        template:'#aside-menu',
        data(){
            return{
                title:'welcome back',
                menuList:[],
                oldEl:'',
                fontawes:['fa-tachometer','fa-snowflake-o','fa-telegram','fa-wpexplorer']
                // fontawes:['fa-tachometer','fa-free-code-camp','fa-ravelry','fa-superpowers'],
            };
        },
        computed:{
            state(){
                return this.$store.state.menu;
                //通过这个值来绑定控制了菜单栏和内容区域是否隐藏
            }
        },
        created(){
            var username = localStorage.getItem('username');
            var password = localStorage.getItem('password');
            //this.successfulVerify(username,password);
            this.menuList = this.state.menuList;
            this.oldEl = this.$store.state.menu.menuList[0];
		    this.$store.state.menu.oldEl = this.oldEl;
            /*这里做一个首页请求数据的ajax请求，获取首页要加载的数据，因为这个首页的数据是在数据仓库里规定好的，可以发送需要的数据表和相应的请求过去*/
        },
        methods:{
            getTitle(){
                return this.state.menuList;
            },
            /*从后台获取要对哪些表格进行操作,获取要操作的数据库*/
            getData(){
                this.$http({
                    url:'http://localhost:8080/getmenu/'
                }).then(function(){
                    //将获取过来的数据从放到menu的数据仓库，到时候跟主要页面信息进行共享
                });
            },
            /*切换二级菜单的显示隐藏*/
            togglemenu(item){
                item.isshow = !item.isshow;
            },
            subMActive(item,index){
                /*将当前活动的那个操作的数据放到menuoldEl中共内容读取要显示那个*/
                this.$store.state.menu.oldEl = item;
                //获取到了当前要操作的表格
                this.oldEl.subchild = '';
                item.subchild = index;
                this.oldEl = item;
                this.$store.state.menu.newEl = this.$store.state.menu.oldEl.subchild;
            },
            /*每次进入管理系统页面就进行验证用户信息，如果信息有误提示，并且跳转到登录页*/
            successfulVerify(username,password){
                this.$ajax({
                    url:"http://localhost:8080/login/user/test",
                    method:'POST',
                    data:JSON.stringify({username:username,password:password})
                }).then((res)=>{
                    if('ok'==res.data){
                        var that = this;
                        /*this.$store.commit('alert/open','欢迎回来');
                        setTimeout(function(){
                            that.$store.commit('alert/close');
                        },500);
                        return;*/
                    }else{
                        this.$store.commit('alert/open','信息过期请重新验证');
                        window.location.href='/login';
                    }
                });
            },
            /*退出登录*/
            loginout(){
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                window.location.href='/login';
            },
            /*跳转前台*/
            gotobefore(){
                window.location.href='http://localhost:8080/black_productor/client/index.html';
            }

        }
    }
</script>

<style>
    *{padding:0;}
    /* 公共样式设置star */
    .aside-menu{width:auto;height:100%;box-sizing: border-box;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);}
    /* 公共样式设置end */

    /* adminmessage Star */
    .aside-menu-header{height:130px;padding-top:30px;text-align: center;}
    .aside-menu-header .heade-logo{width:80px;height:80px;display:inline-block;border:4px solid #9fabbd;border-radius: 50%;background-image: url(/static/img/menu/heade.jpg);background-size: 100% 100%;transition:all 1s;transform:rotateY(0deg);}
    .aside-menu-header .heade-logo:hover{transform:rotate(360deg);}
    .aside-menu-header .admin-name{color:#9fabbd;line-height: 20px;margin:0 10px;}

    /* adminmessage Star */


    /* 管理员信息控制Star */
    .admin-control{height:45px;}
    .admin-control ul{text-align: center;}
    .admin-control ul li{height:45px;width:45px;display: inline-block;background-color:#0d131e;cursor:pointer; border-radius: 50%;color:#efffff;line-height: 45px;}
    .admin-control ul li:hover{background:#3A4A67;}
    /* 管理员信息控制End */


    /* 功能选择区域 Star*/
    .menu-option{margin-top:30px;font-family: '微软雅黑';}
    .aside-menu .menu-super>li{padding:0;display:block;}/*为什么设置display：block能解决li上边距问题*/
    .aside-menu .menu-super>li>div{width:100%;height:30px;color:#9fabbd;/*  */line-height:30px;cursor: pointer;display:inline-block;font-size:14px;position:relative;text-align: left;padding-left:30px;box-sizing:border-box;}
    .aside-menu .menu-super>li>div span{text-indent: 35px;}
    .aside-menu .menu-super>li>div:hover{background-color:#0d131e;}
    .aside-menu .menu-super .menu-sub li{font-size:12px;height:25px;line-height:25px;cursor: pointer;text-indent: 40px;}
    .aside-menu .menu-super .menu-sub li{color:#D2C4C4;}
    .aside-menu .menu-super>li>div>a{font-style:normal;display:inline-block;float:right;margin-right:30px;font-size:10px;}

    .aside-menu .menu-sub{background:#0d131e;}
    .aside-menu .menu-super .active{display:block;}
    .aside-menu .menu-super>li>div.active{background:rgba(13,19,30,.6);color:#fff;}
    .aside-menu .menu-super em{padding-right:15px;color:#0e6166;font-size:15px;}
    .aside-menu .menu-super>li>div.active a{transform:rotate(-90deg);transform-origin: center center;}
    .aside-menu .menu-sub li.active{background:#464444;}

    /* 功能选择区域option End */

</style>
