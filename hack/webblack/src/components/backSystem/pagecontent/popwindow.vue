<template id='popwindow'>
    <transition name="fade">
        <div class="overlay" v-show="isShow">
            <div class='content'>
                <!-- 分发内容 -->
                <slot name="header"></slot>
                <slot name="body"></slot>
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
</template>
<script>

export default {
    name: 'popwindow',
    props: ['isShow']
}
</script>
<style scoped>
    .overlay,.overlay *{
        margin:0;padding:0;
        z-index:4;
    }
    .overlay{
        position:fixed;left:0;top:0;
        width:100%;height:100%;
        background-color:rgba(0,0,0,0.3);
    }
    .overlay>.content{
        position:absolute;left:50%;top:50%;
        transform:translate(-50%,-50%);
        background-color:white;
        border-radius:5px;
        overflow:hidden;z-index:4;
    }
    .fade-enter{opacity:0;}
    .fade-enter-active,.fade-leave-active{
        transition:all 0.8s ease;
    }
    .fade-leave-to{opacity:0;}
</style>
