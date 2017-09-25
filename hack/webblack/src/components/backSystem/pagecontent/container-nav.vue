<template id="container-nav">
    <div class="right-content-nav">
        <ul>
            <li class="toggleSide fa fa-th-list" @click="move"></li>
            <li class="logomessage">BOMONZOOKA</li>
            <li class="navSearch">
                <input type="text" placeholder="Search">
            </li>
            <li class="remindMessage">
                <ul>
                    <li class="fa fa-envelope-open activity" title="将进入活动管理"></li>
                    <li class="fa fa-volume-up hotpush" title="信息推送管理"></li>
                    <li class="fa fa-picture-o Carouselfigure"  title="将进入图片管理服务"></li>
                    <li class="fa fa-star-half-empty forum" title="将进入论坛管理"></li>
                    <li class="fa fa-server user" title="将进入管理员信息设置"></li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'container-nav',
        data(){
            return{};
        },
        computed:{
            menuShow(){
                return this.$store.state.menu.menuShow;
            }
        },
        methods:{
            move(){
                this.$store.state.menu.menuShow=!this.$store.state.menu.menuShow;
            }
        }
    }
</script>
<style scoped>
    /* 公共样式star */
    .right-content-nav ul{width:800px;height:50px;background:#fff;font-family: '微软雅黑';padding:0;margin:0;list-style: none;}
    .right-content-nav li{height: 50px;border-right:1px solid #e6e6e6; line-height: 50px; float:left;}


    /* 公共样式end */

    /* 切换左边栏显示按钮star */
    .right-content-nav .toggleSide{width:85px;text-align: center;font-size:35px;color:#37a8af;}
    .right-content-nav .logomessage{color:#37a8af;font-size:13px;text-align: center;padding:0 20px;} 
    /* 切换左边栏显示按钮end */

    /* 搜索按钮 */

    .right-content-nav .navSearch{width:240px; margin-top:-2px; } 
    .right-content-nav .navSearch input{height:100%;width:auto;border:none;outline: none;margin:0;padding:0 15px;box-sizing: border-box;width:100%;}
    .right-content-nav .navSearch  input::-webkit-input-placeholder{font-size:10px;color:#777777;}

    /* 右边提醒图标 */
    .right-content-nav .remindMessage{width:300px;border:1px solid #e6e6e6;}
    .right-content-nav .remindMessage ul{list-style: none;width:450px;height:100%;text-align:center;}
    .right-content-nav .remindMessage ul li{display:inline-block;width:36px;height:36px;border:1px solid red;margin-left:10px;margin-top:7px;border-radius: 50%;line-height: 36px;cursor: pointer;}
    .right-content-nav .remindMessage ul li:hover{background:#EDA1A1;}

    /* 切换数据表区域 */
    .right-content-nav .remindMessage ul li.Carouselfigure{border-color:#4fb2e5;}
    .right-content-nav .remindMessage ul li.activity{border-color:#0aa699;}
    .right-content-nav .remindMessage ul li.hotpush{border-color:#f56954;}
    .right-content-nav .remindMessage ul li.forum{border-color:#346185;}
    .remindMessage ul li.user{background:#f1f1f1;border:none;}
    /* 切换数据表 区域结束 */
</style>
