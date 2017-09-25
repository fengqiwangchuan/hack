<template id="substance">
    <section class="content">
        <!-- 首页展示内容 -->
        <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <index-substance v-show="showPage=='index'"></index-substance>   
        </transition>
        <!-- 轮播图活动广告等展示 -->
        <main-content :show-page="showPage"></main-content>
    </section>	
</template>

<script>
    import indexSubstance from '../substance/index-substance.vue'
    import mainContent from '../substance/mian-content.vue'
    export default{
        name:'substance',
        data:function(){
            return{
            };
        },
        components:{
            'index-substance':indexSubstance,
            'main-content':mainContent
        },
        computed:{
            showPage:function(){
                return this.$store.state.menu.oldEl.subchild;
            }
        }
    }
</script>
