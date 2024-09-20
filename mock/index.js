// mockjs 入口文件
const Mock = require('mockjs') // 引入 mockjs 模块
const { param2Obj } = require('./utils')

const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
/**
 * mockXHR 函数用于重写 Mock.js 提供的 XHR 的 send 方法
 * 这段代码通过拦截 send 请求并添加一些额外的设置（如 withCredentials 和 responseType），保证模拟请求的行为尽量与真实请求保持一致
 */
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send // 保存原始的 send 方法，重写 send 方法时需要保留原始行为
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments) // 调用原始的 send 方法，确保发送行为不受影响
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  // 遍历所有 mocks 中的配置，创建每一个 mock 请求
  for (const item of mocks) {
    /**
     * new RegExp(i.url) 将接口的 URL 转换为正则表达式，用于匹配请求的路径
     * item.type || 'get' 指定请求的类型（默认为 get）
     * XHR2ExpressReqWrap(item.response) 将响应包装成符合 XHR 风格的请求响应处理
     * 匹配到的所有 url 的请求都会被拦截，并返回对应的响应数据；未匹配到的请求会正常通过 axios 发送到服务器
     */
    Mock.mock(new RegExp(item.url), item.type || 'get', XHR2ExpressReqWrap(item.response))
  }
}

module.exports = {
  mocks, // 导出模拟接口配置
  mockXHR // 导出 mockXHR 函数，以便外部调用时能够启用模拟请求
}
