// store 的入口文件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import gis_store from './modules/gis_store.js'
import main_store from './modules/main_store.js'
import device_store from './modules/device_store.js'
import addDevice_store from './modules/addDevice_store.js'

export default new Vuex.Store({
	modules: {
		gis_store : gis_store,
		main_store : main_store,
		device_store : device_store,
		addDevice_store : addDevice_store
	}
})
