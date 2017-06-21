/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import qs from 'qs';
import { forEachObjIndexed } from 'ramda';
import { isEmpty } from 'lodash';

/**
 * Build the location object.
 * @param {*} path The path with placeholder string like /:projectName?.
 * @param {*} props The props object used to replace in the url match placeholder
 * @param {*} params The params for query string.
 */
const buildLocation = (path: String, props: ?Object, params: ?Object) => {
  // If props exists, try to replace the placeholder in path.
  const match = props || {};
  forEachObjIndexed((val, key) => {
    path = path.replace(`/:${key}?`, `/${val || ''}`);
    path = path.replace(`/:${key}`, `/${val || ''}`);
  }, match);

  if (!params || isEmpty(params)) {
    return {
      pathname: path,
    };
  }

  const search = `?${qs.stringify(params || {})}`;

  return {
    pathname: path,
    search,
  };
};

export default buildLocation;
