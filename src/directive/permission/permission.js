// 权限相关自定义指令
import store from '@/store'

// 全局指令函数 el：真实的 DOM 元素；binding：绑定的元素对象，其 value 值就是等号右边的值
function checkPermission(el, binding) {
  const { value } = binding // 这里的 value 一般是一个 roles 相关的数组 v-permission="['admin']"
  const roles = store.getters && store.getters.roles // 当前账户的角色数组

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value // 当前节点具有权限的数组
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el) // 如果没有权限则从其父节点中移除该子节点
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
