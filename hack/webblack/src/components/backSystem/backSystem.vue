<template>
  <div id="backSystem">
    <!-- 弹窗组件 -->
    <Alert></Alert>
    <!-- 侧边栏组件 -->
    <transition enter-active-class="animated rotateInDownRight" leave-active-class="animated fadeOutLeft">
      <aside class="content-menu" v-show="$store.state.menu.menuShow" >
        <aside-menu></aside-menu>
      </aside>
    </transition>
    <!-- 内容区域组件  -->
    <div :class="{'container-move-enter':!$store.state.menu.menuShow,'content-container':true}" >
        <!-- 搜索栏组件 -->
				<div class="content-nav">
					<container-nav></container-nav>
				</div>
				<!-- 主要内容显示区域 -->
				<substance  class="substance"></substance>
		</div>
  </div>
</template>

<script>

  import Alert from './pagecontent/alert'
  // 引入动画库
  require('@/../static/css/animate.css')

  // 引入menu菜单组件
  import asideMenu from './pagecontent/aside-menu.vue'
  // 引入container-nav组件
  import containerNav from './pagecontent/container-nav.vue'
  //引入 substance组件
  import substance from './pagecontent/substance.vue'



  export default {
    name: 'backSystem',
    components:{
      'aside-menu':asideMenu,
      'container-nav':containerNav,
      'substance':substance,
      'Alert':Alert
      },

  }
</script>


<style>
  /* 公共样式star */
  body,html,ul{padding:0;margin:0;}
  body,html{height: 100%;width:100%;overflow-x: hidden;  }
  /*background-image: url('/static/img/index/backgroundbgImg.png');*/
  .common{width:100%;min-width: 1250px;height: 100%;margin:0 auto;}
  #backSystem{height:100%;font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;}
  /* 滚动条样式设置 */
  ::-webkit-scrollbar{width: 10px;height: 10px;}
  ::-webkit-scrollbar-corner{background-color: rgba(0,0,0,0);}
  ::-webkit-scrollbar-thumb{
    background-color: #ddd;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover{background-color: #ccc;}


  /* 页面动画star */

  /* 页面动画end */

  /* 侧边栏样式 */
  #backSystem .content-menu{height: 100%;width:200px;background-color:#222a38;position:fixed;left:0;z-index: 3;overflow-y:auto;overflow-x: 	hidden; 
    transform:translateX(0px);
    } 

 /*  .menus-enter{margin-left:-200px;}
  .menus-enter-active,.menus-leave-active{transition:all 1s ease;}
  .menus-leave-to{margin-left:-200px;}  */ 


.menuslist-enter{transform:translateX(-200px);}
.menuslist-enter-active,.menus-leave-active{transition:all 1s ease;}
.menuslist-leave-to{transform:translateX(-200px);}  

  /* 侧边栏样式end */



  /* nav导航条star */

  /* 当控制菜单栏的menuShow,让菜单栏隐藏时，内容区域块也跟着变化，将内容区域向左移动到边界处，并且这里使用的宽度是auto，所有当内容区域距离右边距离发生变化的时候宽度自动适应 */
  /* .content-container{width:auto;height:100%;transition:all 1s ease;margin-left:200px;
    }
  .content-container .content-nav{height: 50px;background-color:#fff;width:100%;position:fixed;margin-right:200px;overflow:hidden;z-index: 1; 
    -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0); }
  .container-move-enter{margin-left:0;} */


  .content-container{width:calc(80%);height:100%;transition:all 1s ease;transform:translateX(200px);}
  .content-container .content-nav{height: 50px;background-color:#fff;width:calc(100%);position:fixed;overflow:hidden;z-index: 1; }
  .container-move-enter{transform:translateX(0);width:calc(100%);}


  /* nav导航条end */



  /* 中间内容区域 */
  .content-container .substance{padding:74px 44px 100px 44px;}
  .content-container .substance .main-content>div{ position:absolute;top:74px;}

  /*  */
</style>
