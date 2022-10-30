import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie中取到token
import getPageTitle from '@/utils/get-page-title' // 获取页签标题

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 进度条开始
  document.title = getPageTitle(to.meta.title) // 设置页签标题
  const hasToken = getToken() // 根据token判断用户是否已登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果有token(表示登录了)，还要去登录页，则放行到首页
      NProgress.done()
    } else {
      // 判断是否通过getInfo方法获取了用户信息，包括路由权限信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 调用Vuex的获取用户信息的方法
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo') // 用户角色权限数组
          // 根据用户角色信息生成该角色的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加异步路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 移除token并跳转到登录页重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局后置路由守卫
router.afterEach(() => {
  NProgress.done() // 进度条结束
})
