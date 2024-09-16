// 将剪贴板自定义指令以插件的形式安装上
import Clipboard from './clipboard'

// 该函数用于注册全局自定义指令
const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard)
}

if (window.Vue) {
  window.clipboard = Clipboard
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install

// 导出剪贴板自定义指令对象，可被注册为自定义指令 v-clipboard；同时这个对象包含 install 方法，也可被注册为插件
export default Clipboard
// {
//   bind: function(el, binding),
//   install: function(Vue),
//   unbind: function(el, binding),
//   update: function(el, binding),
// }

/**
 * 如果 Vue.use 传入的是一个函数，该函数会被当作 install 函数，直接被调用，传入 Vue 构造函数作为参数
 * 如果 Vue.use 传入的是一个对象，该对象应该提供一个 install 方法，然后 install 方法会在 Vue.use 被调用时调用，传入 Vue 构造函数作为参数
 */
