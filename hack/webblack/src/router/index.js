import Vue from 'vue'
import Router from 'vue-router'
//后台页面
import backSystem from '@/components/backSystem/backSystem.vue'
//登录界面 
import login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'backSystem', 
      component: backSystem 
    },
    {
      path:'/login',
      name: 'login',
      component: login
    }
  ]
})
