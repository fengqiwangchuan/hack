<template id="main-content">
    <div class="main-content">
        <!-- 轮播图管理页 -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <div v-show="showPage=='Carouselfigure'" class="Carouselfigureanimate"> 
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <Carouselfigure :key="'Carouselfigure'"></Carouselfigure>
            </div>
        </transition>
        <!-- employment管理页面  -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <div class="employment" v-show="showPage=='employment'">
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <employment :key="'employment'"></employment>
            </div>
        </transition>
        <!-- learning组件 -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
            <div class="learning" v-show="showPage=='learning'">
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <learning :key="'learning'"></learning>
            </div>
        </transition>

        <!-- classactive管理页 -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
            <div class="classactivity" v-show="showPage=='classactivity'">
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <classactivity :key="'classactivity'"></classactivity>
            </div>
        </transition>	

        <!-- forum -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
            <div class="classactivity" v-show="showPage=='forum'">
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <forum  :key="'forum'"></forum>
            </div>
        </transition>

        <!-- user -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown" >
            <div class="classactivity" v-show="showPage=='user'">
                <a class="fa fa-home index-home" href="@/../index.html"></a>
                <user  :key="'user'"></user>
            </div>
        </transition>
    </div>
</template>
<script>
    import Carouselfigure from './homepage/Carouselfigure.vue'
    import employment from './activity/employment.vue'
    import learning from './activity/learning.vue'
    import classactivity from './activity/classactivity.vue'
    import forum from './user/forum.vue'
    import user from './user/usermsg.vue'

    export default{
        name:'main-content',
        props:['show-page'],
        data(){
            return{
                superMenu:'首页管理'
            };
        },
        created(){
            
        },
        computed:{
            /*这里用来查看点击的是否是主要显示主要内容几张表下的数据*/
            mainContentisshow(){
                if(this.$store.state.menu.oldEl.superMenu==this.superMenu){
                    return true;
                }
            }
        },
        components:{
            'Carouselfigure':Carouselfigure,
            'employment':employment,
            'learning':learning,
            'classactivity':classactivity,
            'forum':forum,
            'user':user
        }
    }
</script>