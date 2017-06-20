/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import buildLocation from './buildLocation';

/**
 * Build the url string.
 */
const buildUrl = (path: String, props: ?Object, params: ?Object) => {
  const { pathname, search } = buildLocation(path, props, params);
  return pathname + (search || '');
};

export default buildUrl;
