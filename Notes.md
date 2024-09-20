```bash
├─build 
├─mock                            # 模拟数据
├─public                          # 静态资源
├─src                             # 源代码目录
│  ├─api                          # 后端接口(网络请求)
│  ├─assets                       # 静态资源
│  ├─components                   # 全局公用组件 
│  ├─directive                    # 全局自定义指令
│  ├─filters                      # 全局过滤器
│  ├─icons                        # 全局图标
│  ├─layout                       # 布局组件
│  ├─mixins                       # 全局混入
│  ├─router                       # 路由
│  ├─store                        # 状态管理器 Vuex
│  ├─styles                       # 全局样式
│  ├─utils                        # 工具包
│  ├─vendor                       # 第三方库或插件
│  ├─views                        # 路由组件
│  ├─App.vue                      # 根组件
│  ├─main.js                      # 入口文件
│  ├─permission.js                # 权限控制，全局路由导航守卫
│  └─settings.js                  # 项目全局设置
├─jsconfig.js 
└─vue.config.js                   # vue-cli 配置
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

### 登录权限相关

* 填完账号密码点击登录，只调用 `login` 方法，服务端返回token；
* 先将token存在Vuex的state中，再存一份在cookie中；
* 前端根据token调用获取用户信息 `getInfo` 方法，获取用户信息和权限和角色 `role` ；全局钩子拦截路由
* 动态挂载路由

* 创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。
* 当用户登录后，获取用role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表。
* 调用router.addRoutes(store.getters.addRouters)添加用户可访问的路由。
* 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件。

### 规范

* 没有文件夹的组件使用大驼峰命名 `GithubCorner.vue`
* 有文件夹的组件，文件夹使用大驼峰命名，文件使用 `index.vue`；
* views文件夹下面的是路由，所有的文件夹用小写短横线链接
* 引入vue文件的时候写到vue文件名即可，不加后缀.vue

### 其他

* 分栏布局 `el-row` 中，gutter表示栏间距；
* 分栏布局，xs, sm, lg可以指定不同宽度时该列所占的宽度；
* `svg-icon` 是注册的全局组件，任何地方都可以使用；
* `count-to` 也是全局组件，可npm下载安装；
