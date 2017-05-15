/* @flow */
import buildUrl from './buildUrl';

const buildMatchLocation = (match: Object, props: Object, params: ?Object) => {
  return buildUrl(match.path, props, params);
};

export default buildMatchLocation;
