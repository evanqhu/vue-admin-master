// Vuex-permission 管理用户路由权限相关的数据和方法
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 使用路由的meta数据判断一个角色是否有该路由的权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 根据角色信息递归过滤出符合权限的路由
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 总的路由信息 = 常量路由 + 异步路由
  addRoutes: [] // 异步的路由信息
}

const actions = {
  // 根据用户角色信息获取待添加的动态路由表
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { // 如果用户包含 admin 角色，则添加所有的异步路由
        accessedRoutes = asyncRoutes || []
      } else { // 根据角色信息递归过滤出符合权限的路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes) // 在 state 中保存异步路由和全部路由
      resolve(accessedRoutes)
    })
  }
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes // 异步路由
    state.routes = constantRoutes.concat(routes) // 总路由
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
