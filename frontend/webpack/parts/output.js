/*
 * Build webpack 'output' configuration.
**/

const output = (settings) => {
  const { isDev, paths } = settings;

  let ret;

  // When HMR is enabled, file name cannot contains hash.
  if (isDev) {
    ret = {
      path: paths.build,
      publicPath: '/',
      pathinfo: true,
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    };
  } else {
    ret = {
      path: paths.build,
      publicPath: '/',
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name].[id]-[chunkhash].js',
    };
  }

  return ret;
};

export default output;
