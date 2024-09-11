import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets 重置默认样式

import Element from 'element-ui' // 引入element-ui
import './styles/element-variables.scss' // 修改 element-ui 主题色
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css 全局样式文件

import App from './App' // 引入根组件
import store from './store' // 引入 Vuex
import router from './router' // 引入路由

import './icons' // icon 图标组件
import './permission' // permission control 权限控制
import './utils/error-log' // error log 错误日志

import * as filters from './filters' // 引入全局过滤器

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 设置 element-ui 大小
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size 设置element-ui默认大小
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 关闭生产环境提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
