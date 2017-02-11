/*
 * Webpack module/rules configuration for js/jsx compilation.
**/

import webpack from 'webpack';
import HappyPack from 'happypack';

const babel = (settings) => {
  const { isDev, paths } = settings;

  // Use babel-runtime instead of babel-polyfill to avoid polluting global namespace.
  // https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3#.j8i3fgvvf
  // TODO: How to use runtime & polyfill
  let rulePlugins = [
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: false,
    }],
    'transform-decorators-legacy',
  ];

  if (isDev) {
    rulePlugins = rulePlugins.concat([
      'react-hot-loader/babel',
    ]);
  } else {
    rulePlugins = rulePlugins.concat([
      'transform-react-constant-elements',
    ]);
  }

  const rules = [{
    test: /\.jsx?$/,
    exclude: paths.node_modules,
    loaders: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        compact: false,
        presets: [
          ['es2015', { loose: false, modules: false }],
          'react',
          'stage-0',
        ],
        plugins: rulePlugins,
      },
    }],
  }];

  let plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader'],
    }),
  ];

  if (isDev) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ]);
  } else {
    plugins = plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
      }),
    ]);
  }

  return {
    rules,
    plugins,
  };
};

export default babel;
