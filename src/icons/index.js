// 导入所有图标文件
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally 全局注册图标组件
Vue.component('svg-icon', SvgIcon)

// 1. 创建包含所有图标文件的上下文
// const reqContext = require.context('./svg', false, /\.svg$/)
const reqContext = require.context('./svg', false, /\.svg$/) // reqContext 是一个函数

// 2. 遍历所有图标文件，并加载模块（相当于 import 了图标文件）
reqContext.keys().map((path) => (reqContext(path)))
// 每个模块的内容
// {
//   content: "<symbol xmlns=....",
//   id: "icon-404",
//   node: symbol#icon-404,
//   viewBox: "0 0 128 128",
//   isMounted: true,
// }

// 使用 reqContext(path) 这种加载方式是为了让开发者在实际需要的时候才去加载模块内容，从而优化性能和资源管理

// 简写
// const requireAll = requireContext => requireContext.keys().map(requireContext) // 遍历所有图标文件，并注册
// requireAll(reqContext)

// webpack 官方示例
// function importAll(r) {
//   r.keys().forEach(r)
// }

// importAll(require.context('../components/', true, /\.js$/))
