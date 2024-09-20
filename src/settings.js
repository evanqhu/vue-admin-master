// 全局默认初始化配置
module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel 是否显示右侧面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView 是否需要面包屑标签页
   */
  tagsView: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header 是否固定头部
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar 是否显示侧边栏logo
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component. 显示错误日志组件
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: ['production', 'development']
}
