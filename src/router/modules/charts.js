// 图表路由模块
import Layout from '@/layout'

/** 图表路由模块 */
const chartsRoutes = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Charts',
  meta: {
    title: 'Charts',
    icon: 'chart'
  },
  children: [
    // 键盘图表
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: '键盘图表', noCache: true }
    },
    // 折线图
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: '折线图', noCache: true }
    },
    // 混合图表
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: '混合图表', noCache: true }
    }
  ]
}

export default chartsRoutes
