import qs from 'qs';
import { isString } from 'lodash';

/**
 * Parse url query string into object, return empty object is empty string.
 * The query string can be retrieved from location.search.
 */
const parseQueryString = (search) => {
  let query = search;
  if (isString(query) && query.length > 0) {
    if (query[0] === '?') {
      // Remove char ?
      query = query.slice(1);
    }
    return qs.parse(query);
  }
  return {};
};

export default parseQueryString;
