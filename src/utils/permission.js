// 权限判断函数，功能类似于 v-permission 自定义指令
import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 * @description 权限判断函数
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
