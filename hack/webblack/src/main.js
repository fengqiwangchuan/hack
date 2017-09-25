// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import echarts from '../static/js/echarts.common.min.js'
import axios from 'axios'
require('font-awesome-webpack');

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts 
Vue.prototype.$ajax = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
