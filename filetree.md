```bash
├─build 
├─mock
│  └─role
├─plop-templates
│  ├─component
│  ├─store
│  └─view
├─public
├─src # 源代码目录
│  ├─api # 后端接口
│  ├─assets # 静态资源
│  │  ├─401_images
│  │  ├─404_images
│  │  └─custom-theme
│  │      └─fonts
│  ├─components # 全局组件
│  │  ├─BackToTop
│  │  ├─Breadcrumb # 面包屑导航
│  │  ├─Charts
│  │  │  └─mixins
│  │  ├─DndList
│  │  ├─DragSelect # 可移动选择框
│  │  ├─Dropzone # 文件上传组件
│  │  ├─ErrorLog # 错误日志，很少用
│  │  ├─GithubCorner
│  │  ├─Hamburger # 汉堡包导航，控制侧边栏展开和隐藏
│  │  ├─HeaderSearch # 全局搜索
│  │  ├─ImageCropper # 图片上传和裁剪组件
│  │  │  └─utils
│  │  ├─JsonEditor
│  │  ├─Kanban # 可移动看板
│  │  ├─MarkdownEditor
│  │  ├─MDinput
│  │  ├─Pagination
│  │  ├─PanThumb # 图片hover效果
│  │  ├─RightPanel # 全局设置对话框组件，右侧
│  │  ├─Screenfull # 全屏
│  │  ├─Share
│  │  ├─SizeSelect
│  │  ├─Sticky
│  │  ├─SvgIcon
│  │  ├─TextHoverEffect # 文字hover动画效果
│  │  ├─ThemePicker
│  │  ├─Tinymce # 富文本编辑器
│  │  │  └─components
│  │  ├─Upload
│  │  └─UploadExcel
│  ├─directive # 全局自定义指令
│  │  ├─clipboard
│  │  ├─el-drag-dialog # 可移动对话框指令
│  │  ├─el-table
│  │  ├─permission # 用于权限控制的自定义指令 v-permission
│  │  └─waves # 点击水波纹指令
│  ├─filters # 全局过滤器
│  ├─icons # 全局图标
│  │  └─svg # 存放下载的svg格式的图标
│  ├─layout # 布局
│  │  ├─components
│  │  │  ├─Settings
│  │  │  ├─Sidebar
│  │  │  └─TagsView
│  │  └─mixin
│  ├─router # 路由
│  │  └─modules
│  ├─store # Vuex
│  │  └─modules
│  ├─styles # 样式
│  ├─utils
│  │  ├─auth.js # 与权限相关的函数，如保存token到cookie
│  │  ├─clipboard.js # 点击复制的工具
│  │  ├─permission.js # 用于权限控制的判断函数，类似于 v-permission
│  │  └─validate.js # 各种验证的代码
│  ├─vendor
│  └─views # 路由组件
│      ├─charts
│      ├─clipboard
│      ├─components-demo
│      ├─dashboard
│      │  ├─admin
│      │  │  └─components
│      │  │      ├─mixins
│      │  │      └─TodoList
│      │  └─editor
│      ├─documentation
│      ├─error-log
│      │  └─components
│      ├─error-page
│      ├─example
│      │  └─components
│      │      └─Dropdown
│      ├─excel
│      │  └─components
│      ├─guide
│      ├─icons
│      ├─login # 登录页面
│      │  └─components # 第三方登录的组件
│      ├─nested
│      │  ├─menu1
│      │  │  ├─menu1-1
│      │  │  ├─menu1-2
│      │  │  │  ├─menu1-2-1
│      │  │  │  └─menu1-2-2
│      │  │  └─menu1-3
│      │  └─menu2
│      ├─pdf
│      ├─permission # 与权限验证相关的组件
│      │  └─components
│      ├─profile
│      │  └─components
│      ├─qiniu
│      ├─redirect
│      ├─tab
│      │  └─components
│      ├─table
│      │  └─dynamic-table
│      │      └─components
│      ├─theme
│      └─zip
└─tests
    └─unit
        ├─components
        └─utils
```

* 每一个组件最外面都用一个div包裹，类名设为 `xxx-container`，如 `login-container` `app-container`
* Layout布局最外面的div类名设置为 `app-wraper`，有特殊的样式
* 每个svg图标组件外面用一个span包裹，类名设为 `svg-container`
* 在登录页面只调用获取token的方法，然后在入口文件中用全局路由钩子调用获取用户信息的方法
* 
