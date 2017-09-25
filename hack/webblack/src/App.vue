<template>
  <div id="app">
      <router-view></router-view>
      <backSystem></backSystem>
  </div>
</template>

<script>

import backSystem from '@/components/backSystem/backSystem.vue'

  export default {
    name: 'app',
    components:{},
  }
</script>
  
<style scoped>
  /* 公共样式star */
  body,html,ul{padding:0;margin:0;}
  body,html{height: 100%;width:100%;overflow-x: hidden;  background-image: url(/@/assets/img/index/background-bgImg.png); }
  *{padding:0;margin:0;}
</style>
