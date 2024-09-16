// 路由器
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) // 安装路由插件

import Layout from '@/layout' // 引入布局组件

// 异步路由规则，拆分成了多个子模块
import componentsRoutes from './modules/components'
import chartsRoutes from './modules/charts'
import tableRoutes from './modules/table'
import nestedRoutes from './modules/nested'

// 常量路由
export const constantRoutes = [
  // 重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 权限重定向
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 401
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 根路径 -> 重定向到首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true } // affix: true 表示固定在标签页，不可删除
      }
    ]
  },
  // 文档 (没有用 redirect)
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: '文档', icon: 'documentation', affix: true }
      }
    ]
  },
  // 引导页
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: '引导页', icon: 'guide', noCache: true }
      }
    ]
  },
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

// 异步路由
export const asyncRoutes = [
  // 权限
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page', // 重定向到第一个 页面权限
    alwaysShow: true, // will always show the root menu 只有一个子路由也会显示为嵌套路由
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // 如果不写，就是都有权限，一旦写了，就要把有权限的角色都写上
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'Page Permission',
        meta: {
          title: '页面权限',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'Directive Permission',
        meta: {
          title: '指令权限'
          // 如果不设置角色则表示当前组件不需要权限，都可访问
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role Permission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: '图标', icon: 'icon', noCache: true }
      }
    ]
  },
  componentsRoutes,
  chartsRoutes,
  nestedRoutes,
  tableRoutes,
  // 综合实例
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: '综合实例',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      },
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: {
          title: 'Edit Article',
          noCache: true,
          activeMenu: '/example/list' // 侧边导航不存在 edit 页，但是希望在编辑文章的时候，侧边高亮 list 页
        },
        hidden: true
      }
    ]
  },
  // Tab 栏
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },
  // 错误页面
  {
    path: '/error',
    component: Layout,
    // redirect: 'noRedirect', // noRedirect 表示在面包屑中当前路由不可点击跳转 （但是这样会导致当地址栏为 /error 时报错，因为重定向的地址不存在）
    redirect: '/error/401', // noRedirect 表示在面包屑中当前路由不可点击跳转
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 错误日志（只有一个子路由）
  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },
  // Excel
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: { title: 'Excel', icon: 'excel' },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },
  // Zip (只有一个子路由，但在侧边栏依然显示嵌套路由)
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },
  // PDF
  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  // PDF下载 （侧边栏隐藏当前路由）
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  // 主题
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },
  // 点击复制
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },
  // 外链
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  // 404页必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

/** 路由器实例创建工具函数 */
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support 默认哈希模式
    scrollBehavior: () => ({ y: 0 }), // 从一个路由导航到另一个路由时，页面会滚动到指定的位置
    routes: constantRoutes // 初始化时路由列表
  })

/** 路由器实例 */
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
/** 重置路由 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router 重置旧的路由器实例的状态
  // 允许开发者在运行时更改路由规则，而不需要重新创建整个路由实例或刷新页面
}

export default router

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar (default is false)
 * alwaysShow: true               if set true, will always show the root menu (default is false)
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached (default is false) 当开启 tagsView 时，没有设置 noCache 为 true 的页面均会被默认缓存
    affix: true                  if set true, the tag will affix in the tags-view 设置 affix 为 true 的页面将会被固定在 tags-view 上，不可点击删除按钮
    breadcrumb: false            if set false, the item will hidden in breadcrumb (default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
