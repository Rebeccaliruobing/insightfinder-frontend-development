/*
 * Webpack module/rules configuration for js/jsx compilation.
**/

import webpack from 'webpack';

const babel = (settings) => {
  const { isDev, paths } = settings;

  let rulePlugins = [
    ['transform-runtime', {
      helpers: true,
      // TODO: Why set this options to false?
      polyfill: false,
      regenerator: false,
    }],
    'transform-decorators-legacy',
  ];

  if (isDev) {
    // https://github.com/gaearon/react-hot-loader/tree/master/docs
    rulePlugins = rulePlugins.concat([
      'react-hot-loader/babel',
    ]);
  } else {
    rulePlugins = rulePlugins.concat([
      'transform-react-constant-elements',
    ]);
  }

  const rules = [{
    resource: {
      test: /\.jsx?$/,
      exclude: paths.node_modules,
    },
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        compact: false,
        presets: [
          ['env', {
            targets: {
              browsers: ['last 2 versions', '> 1%'],
            },
            modules: false,
            loose: true,
          }],
          'stage-1',
          'react',
        ],
        plugins: rulePlugins,
      },
    }],
  }];

  let plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
  ];

  if (isDev) {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]);
  } else {
    plugins = plugins.concat([
      new webpack.HashedModuleIdsPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.UglifyJsPlugin({}),
    ]);
  }

  return {
    rules,
    plugins,
  };
};

export default babel;
