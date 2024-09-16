// 剪贴板工具函数
import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

/**
 * @param {string} text 复制的值
 * @param {Object} event 事件对象
 * @description 复制到剪贴板
 */
export default function handleClipboard(event, text) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  // 手动调用 clipboard.onClick(event) 来触发点击事件并执行复制操作
  clipboard.onClick(event)
}
