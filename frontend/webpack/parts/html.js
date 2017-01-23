/*
 * Webpack plugins configuration for generating static html files.
**/

import path from 'path';
import map from 'lodash/map';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { toJSON } from '../../src/common/transit';

const html = (settings) => {
  const { paths, htmls } = settings;

  if (htmls) {
    return map(htmls, s =>
      new HtmlWebpackPlugin({
        environment: process.env.NODE_ENV,
        template: path.join(paths.htmls, s.template),
        filename: s.filename,
        initialState: JSON.stringify(toJSON(s.initialState)),
      })
    );
  }

  // If no settings, generate a default html page.
  return new HtmlWebpackPlugin({});
};

export default html;
