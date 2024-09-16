// 剪贴板自定义指令对象
// Inspired by https://github.com/Inndy/vue-clipboard2
// https://clipboardjs.com/
const ClipboardJS = require('clipboard')

if (!ClipboardJS) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
    // el：指令所绑定的元素，可以用来直接操作 DOM (button.el-button.el-button--primary.el-button--medium)
    // binding：指令所绑定的元素对象
    // {
    //   name: 'clipboard',
    //   rawName: 'v-clipboard:copy',
    //   arg: 'copy',
    //   expression: 'inputData',
    //   value: 'https://github.com/PanJiaChen/vue-element-admin',
    // }

    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value // 保存成功回调函数
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      // 这里就给 button 注册了点击事件？
      const clipboard = new ClipboardJS(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' } // 复制或剪切
      })
      // 复制成功的回调
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success
        callback && callback(e) // eslint-disable-line
      })
      // 复制失败的回调
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error
        callback && callback(e) // eslint-disable-line
      })
      el._v_clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function() { return binding.value }
      el._v_clipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  }
}
