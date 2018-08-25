import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {index: 0},
      component: _import("main/main")
    },
    {
    	path: '/gis',
      name: 'gis',
      meta: {index: 1},
      component: _import("gis/gis")
    },
    {
    	path: '/device',
      name: 'device',
      meta: {index: 1},
      component: _import("device/device")
    },
    {
    	path: '/addDev',
      name: 'addDev',
      meta: {index: 1},
      component: _import("addDevice/addDevice")
    },
    {
    	path: '/clash',
      name: 'clash',
      meta: {index: 1},
    	component: _import("clash/clash")
    },
    {
      path: '/h5plus',
      name: 'h5plus',
      meta: {index: 1},
      component: _import("code/h5plus")
    },
    {
      path: '/preview',
      name: 'preview',
      meta: {index: 1},
      component: _import("preview/preview")
    }
  ]
})

