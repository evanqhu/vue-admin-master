// 权限控制
import router from './router' // 引入路由
import store from './store' // 引入 Vuex
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 中取到 token
import getPageTitle from '@/utils/get-page-title' // 获取页签标题

NProgress.configure({ showSpinner: false }) // NProgress配置，不显示加载圆圈

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist 不需要重定向的白名单

// 全局前置路由守卫
router.beforeEach(async(to, from, next) => {
  // console.log('🚀🚀🚀  from: ', from)
  // next() 已不推荐使用
  // {
  //   'name': null,
  //   'meta': {},
  //   'path': '/',
  //   'hash': '',
  //   'query': {},
  //   'params': {},
  //   'fullPath': '/',
  //   'matched': []
  // }
  // console.log('🚀🚀🚀  to: ', to)
  NProgress.start() // 进度条开始
  document.title = getPageTitle(to.meta.title) // 设置页签标题
  const hasToken = getToken() // 根据 token 判断用户是否已登录

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' }) // 如果有 token (表示登录了)，还要去登录页，则重新导航到首页
      NProgress.done() // 进度条结束
      /**
       * 已经有了全局后置路由守卫，为什么这里要单独执行一下 NProgress.done() ？
       * 猜测原因：当从 dashboard 页进入 login 页时，先开启进度条，路由守卫会将 to 指向 '/'，而 '/' 又重定向到 '/dashboard'
       * 就相当于这一次从 '/dashboard' 跳转到 '/dashboard'，不会触发路由后置守卫，进度条便无法正确关闭
       * 所以当指定了 next() 的 path 的时候，不能保证 from 和 to 一定不一样，所以需要手动关闭进度条
       */
    } else {
      // 判断是否通过 getInfo 方法获取了用户信息，包括路由权限信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 调用 Vuex 的获取用户信息的方法
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo') // 用户角色权限数组
          // 根据用户角色信息生成该角色的路由表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加异步路由
          router.addRoutes(accessRoutes)
          /**
           * addRoutes 是异步操作，在 addRoutes() 之后第一次访问被添加的路由会白屏
           * 这是因为刚刚 addRoutes() 就立刻访问被添加的路由，然而此时 addRoutes() 没有执行结束，因而找不到刚刚被添加的路由导致白屏
           * 如果 addRoutes 并未完成，路由守卫会一层一层的执行执行，直到 addRoutes 完成，找到对应的路由
           * https://router.vuejs.org/zh/guide/advanced/navigation-guards
           */
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // 移除 token 并跳转到登录页重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`) // 带一个 query 参数 redirect，表示登录成功后重定向到该路径
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly 白名单中的路径直接放行
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page 其他没有权限的路径重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局后置路由守卫
router.afterEach(() => {
  NProgress.done() // 进度条结束
})

/**
 * 在路由守卫中，只有 next() 是放行，其他的都不是放行，而是：中断当前导航，执行新的导航
 * next() 是放行，但是如果 next() 里有参数的话，next() 就像被重载一样，就有了不同的功能
 */
