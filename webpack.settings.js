/**
 * 应用具体的Webpack编译设置. (需配置)
**/

module.exports = {
  entry: {
    commons: './commons',
    assets: './assets',
    app: './app',
    auth: './auth',
    liveMonitoring: './liveMonitoring'
  },
  
  providePlugin: {
    _: 'lodash',
    $: 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery',
    'moment': 'moment',
    'React': 'react',
    'ReactDOM': 'react-dom',
    'cx': 'classnames'
  },
  
  /*
   所有js共用模块所在的chunk名称
   */
  _commonsChunk: ['commons']
};