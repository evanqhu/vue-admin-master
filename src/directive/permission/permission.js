import store from '@/store'

// 全局指令函数 el：真实的DOM元素；binding：绑定的元素对象(也就是指令等号后面的表达式)
function checkPermission(el, binding) {
  const { value } = binding // 这里的value一般是一个roles相关的数组
  const roles = store.getters && store.getters.roles // 当前账户的角色数组(短路运算，如果左边为真则返回右边)

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value // 当前节点具有权限的数组
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el) // 如果没有权限则移除该节点
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  // 指令所在元素被插入页面时被调用
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  // 指令所在的模板被重新解析时被调用
  update(el, binding) {
    checkPermission(el, binding)
  }
}
