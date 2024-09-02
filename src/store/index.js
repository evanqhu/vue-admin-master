import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex) // 安装 vuex 插件

// https://webpack.js.org/guides/dependency-management/#requirecontext
// 引入 ./modules 目录下的所有 .js 文件
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app' 提取模块名
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath) // 一个文件就是一个模块
  modules[moduleName] = value.default // 默认导出，所以用 default
  return modules
}, {})
// {
//   app: {
//     namespaced: true,
//     state: {},
//     actions: {},
//     mutations: {}
//   },
//   ...
// }

const store = new Vuex.Store({
  modules,
  getters
})

export default store
