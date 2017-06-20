/* @flow */
import buildLocation from './buildLocation';

/**
 * Build the location based on the match object in routing.
 */
const buildMatchLocation = (match: Object, props: Object, params: ?Object) => {
  return buildLocation(match.path, props, params);
};

export default buildMatchLocation;
