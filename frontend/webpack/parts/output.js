/*
 * Build webpack 'output' configuration.
**/

const output = (settings) => {
  const { isDev, paths } = settings;

  let ret;

  // In hot mode with HMR, file name cannot contains chunkhash.
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
      filename: '[name]-[hash:12].js',
      chunkFilename: '[name].[id]-[hash:12].js',
    };
  }

  return ret;
};

export default output;
