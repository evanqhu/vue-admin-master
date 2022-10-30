/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 组件路由
const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '组件',
    icon: 'component'
  },
  children: [
    // 富文本编辑器
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '富文本编辑器' }
    },
    // Markdown(不懂)
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: 'Markdown' }
    },
    // json编辑器
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor' }
    },
    // 垂直水平分割窗口(不懂)
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' }
    },
    // 上传头像
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: 'Upload' }
    },
    // 上传文件
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' }
    },
    // 固定标题
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: 'Sticky' }
    },
    // 滚动计数
    {
      path: 'count-to',
      component: () => import('@/views/components-demo/count-to'),
      name: 'CountToDemo',
      meta: { title: 'Count To' }
    },
    // 混合
    {
      path: 'mixin',
      component: () => import('@/views/components-demo/mixin'),
      name: 'ComponentMixinDemo',
      meta: { title: 'Component Mixin' }
    },
    // 回到顶部(重点学习一下)
    {
      path: 'back-to-top',
      component: () => import('@/views/components-demo/back-to-top'),
      name: 'BackToTopDemo',
      meta: { title: '回到顶部' }
    },
    // 可拖拽对话框
    {
      path: 'drag-dialog',
      component: () => import('@/views/components-demo/drag-dialog'),
      name: 'DragDialogDemo',
      meta: { title: '可拖拽对话框' }
    },
    {
      path: 'drag-select',
      component: () => import('@/views/components-demo/drag-select'),
      name: 'DragSelectDemo',
      meta: { title: 'Drag Select' }
    },
    {
      path: 'dnd-list',
      component: () => import('@/views/components-demo/dnd-list'),
      name: 'DndListDemo',
      meta: { title: 'Dnd List' }
    },
    {
      path: 'drag-kanban',
      component: () => import('@/views/components-demo/drag-kanban'),
      name: 'DragKanbanDemo',
      meta: { title: 'Drag Kanban' }
    }
  ]
}

export default componentsRouter
