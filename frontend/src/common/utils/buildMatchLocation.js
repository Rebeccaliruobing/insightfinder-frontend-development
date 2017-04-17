/* @flow */
import qs from 'qs';
import { forEachObjIndexed } from 'ramda';
import { isEmpty } from 'lodash';

const buildMatchLocation = (match: Object, props: Object, params: ?Object) => {
  let { path } = match;

  forEachObjIndexed((val, key) => {
    path = path.replace(`/:${key}?`, `/${val || ''}`);
    path = path.replace(`/:${key}`, `/${val || ''}`);
  }, props);

  if (!params || isEmpty(params)) {
    return path;
  }

  return {
    pathname: path,
    search: `?${qs.stringify(params)}`,
  };
};

export default buildMatchLocation;
