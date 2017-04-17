/* @flow */
import { forEachObjIndexed } from 'ramda';

const buildMatchUrl = (match: Object, props: Object) => {
  let { path } = match;

  forEachObjIndexed((val, key) => {
    path = path.replace(`/:${key}?`, `/${val || ''}`);
    path = path.replace(`/:${key}`, `/${val || ''}`);
  }, props);
  return path;
};

export default buildMatchUrl;
