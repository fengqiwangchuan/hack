import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import alertModule from './backSystem/alert-store.js'
import menuModule from './backSystem/menu-store.js'
import CarouselfigureModule from './backSystem/substance/Carouselfigure-store.js'
import employmentModule from './backSystem/substance/employment-store.js'
import hotpushmentModule from './backSystem/substance/hotpush-store.js'
import hotpuswindowModule from './backSystem/substance/hotpushwindow-store.js'


Vue.use(Vuex)
Vue.use(VueResource)

// 定义根容器
let store = new Vuex.Store({
	state: {},
	mounted:{
	},
	modules: {
		alert: alertModule,
		menu: menuModule,
		employment:employmentModule,
		Carouselfigure:CarouselfigureModule,
		hotpuswindow:hotpuswindowModule,
		hotpushment:hotpushmentModule

	}
})
export default store
