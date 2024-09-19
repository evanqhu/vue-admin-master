// 可拖拽对话框自定义指令
export default {
  bind(el, binding, vnode) {
    // 让对话框的 header 部分鼠标样式变为移动样式
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    // 让对话框样式的 top 值为 0
    const dragDom = el.querySelector('.el-dialog')
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性（ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);）
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 触发元素身上绑定的事件，使 input 失去焦点，并隐藏下拉框
      vnode.child.$emit('dragDialog')

      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth // 返回一个元素的布局宽度
      const dragDomHeight = dragDom.offsetHeight // 返回一个元素的布局高度

      const screenWidth = document.body.clientWidth // 视口宽度
      const screenHeight = document.body.clientHeight // 视口高度

      const minDragDomLeft = dragDom.offsetLeft // 获取拖拽元素距离左侧边界值
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth // 获取拖拽元素距离右侧边界值

      const minDragDomTop = dragDom.offsetTop // 获取拖拽元素距离顶部边界值
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight // 获取拖拽元素距离底部边界值

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      // 鼠标移动事件回调
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素到计算的位置
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      // 鼠标松开事件回调，清除事件
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
