// 下面引入的是bind和inserted函数{inserted(el, binding) {}, bind(el, binding) {}}
import permission from './permission'
const install = function(Vue) {
  Vue.directive('permission', permission) // 全局自定义指令
}

if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install // 包装成了插件？
export default permission
