import qs from 'qs';
import { isString } from 'lodash';

const parseQueryString = (str) => {
  if (isString(str) && str.length > 0) {
    if (str[0] === '?') {
      // Remove the charactor ?
      return qs.parse(str.slice(1));
    }
    return qs.parse(str);
  }
  return null;
};

export default parseQueryString;
