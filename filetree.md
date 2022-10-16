```bash
├─build 
├─mock
│  └─role
├─plop-templates
│  ├─component
│  ├─store
│  └─view
├─public
├─src
│  ├─api
│  ├─assets
│  │  ├─401_images
│  │  ├─404_images
│  │  └─custom-theme
│  │      └─fonts
│  ├─components
│  │  ├─BackToTop
│  │  ├─Breadcrumb
│  │  ├─Charts
│  │  │  └─mixins
│  │  ├─DndList
│  │  ├─DragSelect
│  │  ├─Dropzone
│  │  ├─ErrorLog
│  │  ├─GithubCorner
│  │  ├─Hamburger
│  │  ├─HeaderSearch
│  │  ├─ImageCropper
│  │  │  └─utils
│  │  ├─JsonEditor
│  │  ├─Kanban
│  │  ├─MarkdownEditor
│  │  ├─MDinput
│  │  ├─Pagination
│  │  ├─PanThumb
│  │  ├─RightPanel
│  │  ├─Screenfull
│  │  ├─Share
│  │  ├─SizeSelect
│  │  ├─Sticky
│  │  ├─SvgIcon
│  │  ├─TextHoverEffect
│  │  ├─ThemePicker
│  │  ├─Tinymce
│  │  │  └─components
│  │  ├─Upload
│  │  └─UploadExcel
│  ├─directive
│  │  ├─clipboard
│  │  ├─el-drag-dialog
│  │  ├─el-table
│  │  ├─permission # 用于权限控制的自定义指令 v-permission
│  │  └─waves
│  ├─filters
│  ├─icons
│  │  └─svg
│  ├─layout
│  │  ├─components
│  │  │  ├─Settings
│  │  │  ├─Sidebar
│  │  │  └─TagsView
│  │  └─mixin
│  ├─router
│  │  └─modules
│  ├─store
│  │  └─modules
│  ├─styles
│  ├─utils
│  │  ├─auth.js # 与权限相关的函数，如保存token到cookie
│  │  ├─permission.js # 用于权限控制的判断函数，类似于 v-permission
│  │  └─validate.js # 各种验证的代码
│  ├─vendor
│  └─views
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
* 每个svg图标组件外面用一个span包裹，类名设为 `svg-container`
* 在登录页面只调用获取token的方法，然后在入口文件中用全局路由钩子调用获取用户信息的方法
* 
