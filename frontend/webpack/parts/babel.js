/*
 * Webpack module/rules configuration for js/jsx compilation.
 *
 * Dependant packages:
 * $ npm i -D babel-loader babel-plugin-transform-runtime
 * $ npm i -S babel-runtime
**/

const babel = (settings) => {
  const { isDev, paths } = settings;

  // Use babel-runtime instead of babel-polyfill to avoid polluting global namespace.
  // https://medium.com/@jcse/clearing-up-the-babel-6-ecosystem-c7678a314bf3#.j8i3fgvvf
  let plugins = [
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: false }],
    'babel-plugin-transform-decorators-legacy',
  ];

  if (isDev) {
    plugins = plugins.concat([
      'react-hot-loader/babel',
    ]);
  } else {
    plugins = plugins.concat([
      'transform-react-constant-elements',
    ]);
  }

  return {
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
          ['es2015', { loose: false, modules: false }],
          'react',
          'stage-0',
        ],
        plugins,
      },
    }],
  };
};

export default babel;
