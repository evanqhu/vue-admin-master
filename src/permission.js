import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title' // 获取页签标题

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // start progress bar
  document.title = getPageTitle(to.meta.title) // 设置页签标题
  const hasToken = getToken() // 根据token判断用户是否已登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果有token(表示登录了)，还要去登录页，则放行到首页
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
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
          // remove token and go to login page to re-login
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
  NProgress.done()
})
