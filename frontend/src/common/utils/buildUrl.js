/* @flow */
import qs from 'qs';
import { forEachObjIndexed } from 'ramda';
import { isEmpty } from 'lodash';

const buildUrl = (path: string, props: Object, params: ?Object) => {
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

export default buildUrl;
