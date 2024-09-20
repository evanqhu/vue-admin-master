// mock-server 中间件，在开发服务器启动前执行
const chokidar = require('chokidar') // 引入 `chokidar` 模块，用于监听文件变化，实现文件热加载
const bodyParser = require('body-parser') // 引入 `body-parser` 模块，用于解析 HTTP 请求的 body
const chalk = require('chalk') // 引入 `chalk` 模块，用于美化控制台输出信息
const path = require('path') // 引入 `path` 模块，用于处理文件路径
const Mock = require('mockjs') // 引入 `mockjs` 库，用于生成模拟数据

const mockDir = path.join(process.cwd(), 'mock') // 获取当前工作目录下的 `mock` 文件夹路径

/** 注册路由 */
function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js') // 从 `index.js` 中获取 `mocks`，它是一个定义了模拟路由的数组
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response) // 将每个模拟路由转化为真实的 Express 路由配置
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response) // 注册每个模拟路由到 Express 应用中
    mockLastIndex = app._router.stack.length // 记录当前路由堆栈长度，保存最后一个 mock 路由的位置
  }
  const mockRoutesLength = Object.keys(mocksForServer).length // 获取注册的 mock 路由的数量
  return {
    mockRoutesLength: mockRoutesLength, // 返回 mock 路由的数量
    mockStartIndex: mockLastIndex - mockRoutesLength // 返回 mock 路由在路由堆栈中的起始索引
  }
}

/** 取消注册的路由 */
function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)] // 清除与 `mockDir` 相关的模块缓存，以便重新加载
    }
  })
}

/** 模拟响应 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond)) // 使用 `mockjs` 生成模拟数据并返回
    }
  }
}

module.exports = app => {
  // parse app.body 解析请求体
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  const mockRoutes = registerRoutes(app) // 注册 mock 路由
  var mockRoutesLength = mockRoutes.mockRoutesLength // 记录注册的 mock 路由数量
  var mockStartIndex = mockRoutes.mockStartIndex // 记录 mock 路由在路由堆栈中的起始位置

  // 监听文件变化，热重载 mock server
  chokidar.watch(mockDir, {
    ignored: /mock-server/, // 忽略 `mock-server` 文件夹的变化
    ignoreInitial: true // 忽略初始的添加事件
  }).on('all', (event, path) => {
    if (event === 'change' || event === 'add') { // 如果有文件被修改或添加
      try {
        // 移除旧的 mock 路由
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // 清除路由缓存
        unregisterRoutes()

        // 重新注册 mock 路由
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
