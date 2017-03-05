/*
 * Webpack module/rules configuration for styles
 *
 * Dependant packages:
 * $ npm i -D file-loader url-loader
 * $ npm i -D css-loader postcss-loader style-loader
 * $ npm i -D node-sass sass-loader less less-loader
 **/

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

const styles = (settings) => {
  const { isDev, isProd, assetsRoot } = settings;

  const styleLoaders = (loaders) => {
    if (isDev) {
      return [{
        loader: 'style-loader',
      }].concat(loaders);
    }

    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: loaders,
    });
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
        require('autoprefixer')({ browsers: ['last 2 versions', '> 1%'] }),
      ],
    },
  }];

  const rules = [{
    // normal css
    resource: {
      test: /\.css$/,
    },
    use: styleLoaders(cssLoaders),
  }, {
    // Sass
    resource: {
      test: /\.scss$/,
    },
    use: styleLoaders(cssLoaders.concat({
      loader: 'sass-loader',
      options: {
        sourceMap: isDev,
      },
    })),
  }, {
    // Less
    test: /\.less$/,
    loaders: styleLoaders(cssLoaders.concat({
      loader: 'less-loader',
      options: {
        sourceMap: isDev,
      },
    })),
  }];

  let plugins = [];

  if (isProd) {
    plugins = plugins.concat([
      new ExtractTextPlugin(`${assetsRoot}/css/[name]-[hash].css`),
    ]);
  }

  return {
    rules,
    plugins,
  };
};

export default styles;
