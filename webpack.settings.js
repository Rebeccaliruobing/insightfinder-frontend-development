/**
 * 应用具体的Webpack编译设置. (需配置)
**/

module.exports = {
  entry: {
    commons: './commons',
    assets: './assets',
    home: './home'
  },
  commonsChunk: ['commons'],
  providePlugin: {
    _: 'lodash',
    $: 'jquery',
    'jQuery': 'jquery',
    'window.jQuery': 'jquery'
  }
};