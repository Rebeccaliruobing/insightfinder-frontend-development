/*
 * Webpack module/rules configuration for styles
 *
 * Dependant packages:
 * $ npm i -D file-loader url-loader
 * $ npm i -D css-loader postcss-loader style-loader
 * $ npm i -D node-sass sass-loader less less-loader
 **/

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HappyPack from 'happypack';
import autoprefixer from 'autoprefixer';

const happyPool = HappyPack.ThreadPool({ size: 6 })

const styles = (settings) => {
  const { isDev, isProd, assetsRoot } = settings;

  const styleLoaders = (loaders) => {
    if (isDev) {
      return [{
        loader: 'style-loader',
      }].concat(loaders);
    }

    return loaders;
  };

  const extractStyleLoaders = (loaders) => {
    if (isProd) {
      return ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders,
      });
    }
    return loaders;
  };

  const cssLoaders = [{
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      sourceMap: isDev,
    },
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer({ browsers: ['last 2 versions', '> 1%'] }),
      ],
    },
  }];

  const rules = [{
    // normal css
    resource: {
      test: /\.css$/,
    },
    use: extractStyleLoaders({
      loader: 'happypack/loader',
      options: {
        id: 'css',
      },
    }),
  }, {
    // Sass
    resource: {
      test: /\.scss$/,
    },
    use: extractStyleLoaders({
      loader: 'happypack/loader',
      options: {
        id: 'sass',
      },
    }),
  }, {
    // Less
    test: /\.less$/,
    use: extractStyleLoaders({
      loader: 'happypack/loader',
      options: {
        id: 'less',
      },
    }),
  }];

  let plugins = [
    new HappyPack({
      id: 'css',
      cache: true,
      threadPool: happyPool,
      verbose: false,
      loaders: styleLoaders(cssLoaders),
    }),
    new HappyPack({
      id: 'sass',
      cache: true,
      threadPool: happyPool,
      verbose: false,
      loaders: styleLoaders(cssLoaders.concat({
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
        },
      })),
    }),
    new HappyPack({
      id: 'less',
      cache: true,
      threadPool: happyPool,
      verbose: false,
      loaders: styleLoaders(cssLoaders.concat({
        loader: 'less-loader',
        options: {
          sourceMap: isDev,
        },
      })),
    }),
  ];

  if (isProd) {
    plugins = plugins.concat([
      new ExtractTextPlugin(`${assetsRoot}[name]-[hash].css`),
    ]);
  }

  return {
    rules,
    plugins,
  };
};

export default styles;
