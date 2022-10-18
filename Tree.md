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
│  ├─components ######################################## 全局组件 
│  │  ├─BackToTop
│  │  ├─Breadcrumb
│  │  ├─Charts
│  │  │  └─mixins
│  │  ├─DndList
│  │  ├─DragSelect # 可移动选择框
│  │  ├─Dropzone # 文件上传组件
│  │  ├─ErrorLog
│  │  ├─GithubCorner
│  │  ├─Hamburger
│  │  ├─HeaderSearch
│  │  ├─ImageCropper # 图片上传和裁剪组件
│  │  │  └─utils
│  │  ├─JsonEditor
│  │  ├─Kanban # 可移动看板
│  │  ├─MarkdownEditor
│  │  ├─MDinput # 自己封装的input表单元素
│  │  ├─Pagination
│  │  ├─PanThumb # 图片hover效果
│  │  ├─RightPanel
│  │  ├─Screenfull
│  │  ├─Share
│  │  ├─SizeSelect
│  │  ├─Sticky # 粘性布局，吸顶工具栏
│  │  ├─SvgIcon
│  │  ├─TextHoverEffect # 文字hover动画效果
│  │  ├─ThemePicker
│  │  ├─Tinymce # 富文本编辑器
│  │  │  └─components
│  │  ├─Upload
│  │  └─UploadExcel # 上传excel表格
│  ├─directive ######################################## 全局自定义指令
│  │  ├─clipboard # 点击按钮复制输入框内容的指令
│  │  ├─el-drag-dialog # 可移动对话框指令
│  │  ├─el-table
│  │  ├─permission # 用于权限控制的自定义指令 v-permission
│  │  └─waves # 点击水波纹指令
│  ├─filters ######################################## 全局过滤器
│  ├─icons ######################################## 全局图标
│  │  └─svg # 存放下载的svg格式的图标
│  ├─layout ######################################## 布局
│  │  ├─components
│  │  │  ├─Settings
│  │  │  ├─Sidebar
│  │  │  └─TagsView
│  │  └─mixin
│  ├─router ######################################## 路由
│  │  └─modules
│  ├─store ######################################## Vuex
│  │  └─modules
│  ├─styles ######################################## 样式
│  ├─utils ######################################## 工具包
│  │  ├─auth.js # 与权限相关的函数，如保存token到cookie
│  │  ├─clipboard.js # 点击复制的工具
│  │  ├─permission.js # 用于权限控制的判断函数，类似于 v-permission
│  │  └─validate.js # 各种验证的代码
│  ├─vendor
│  └─views ######################################## 路由组件
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
│      ├─pdf # 导出pdf
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
│      ├─theme # 换肤
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



### 封装element ui组件

如el-breadcrumb，添加了动画效果，修改了样式等

如drag-select封装了el-select，可以拖拽的选择框，选择了多个条目时，可以拖拽调整条目的位置

如封装分页器，调整自己喜欢的颜色和样式



* 创建一个 `.vue` 文件
* 在template中写需要封装的element ui的组件
* 在入口文件注册或需要使用的时候引入注册
* 组件中需要灵活设置的地方，使用slot插槽自定义内容 `slot`
* 使用props接收父组件传来的数据，如类名，属性等 `props`
* 子组件传值给父组件，使用自定义事件 `$emit`

### 表单

* 对于有新增和编辑两种模式的表单，一般会有两个数据对象，一个放在data中，用于展示和收集数据，另外一个空白对象，放在computed中，用于初始化显示空白表单；

### 过滤器

* 将一个数据映射到另一个数据，可以用过滤器
* 比如根据标签内容确定标签类型

```javascript
<el-tag :type="row.status | statusFilter" />
filters: {
  statusFilter(status) {
    const statusMap = {
      published: 'success',
      draft: 'info',
      deleted: 'danger'
    }
    return statusMap[status]
  }
},
```

