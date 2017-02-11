/*
 * Webpack module/rules configuration for styles
 *
 * Dependant packages:
 * $ npm i -D file-loader url-loader
 * $ npm i -D css-loader postcss-loader style-loader
 * $ npm i -D node-sass sass-loader less less-loader
 **/

import webpack from 'webpack';
import HappyPack from 'happypack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const styles = (settings) => {
  const { isDev, isProd } = settings;

  const styleLoaders = (loaders) => {
    if (isDev) {
      return [{
        loader: 'style-loader',
      }].concat(loaders);
    }

    return ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: loaders,
    });
  };

  const cssLoaders = [{
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
    },
  }, {
    loader: 'postcss-loader',
  }];

  const rules = [{
    // normal css
    test: /\.css$/,
    loaders: styleLoaders(cssLoaders),
  }, {
    // Sass
    test: /\.scss$/,
    loaders: styleLoaders(cssLoaders.concat({
      loader: `sass-loader${isDev ? '?sourceMap' : ''}`,
    })),
  }, {
    // Less
    test: /\.less$/,
    loaders: styleLoaders(cssLoaders.concat({
      loader: `less-loader${isDev ? '?sourceMap' : ''}`,
    })),
  }];

  let plugins = [
    new HappyPack({
      id: 'sass',
      threadPool: happyThreadPool,
      loaders: ['sass-loader'],
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      loaders: ['less-loader'],
    }),
    // To support webpack 1.x loaders option.
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: [
          autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }),
        ],
      },
    }),
  ];

  if (isProd) {
    plugins = plugins.concat([
      new ExtractTextPlugin('[name]-[hash].css'),
    ]);
  }

  return {
    rules,
    plugins,
  };
};

export default styles;
