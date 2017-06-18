/* @flow */
import qs from 'qs';
import fetchHandler from './fetchHandler';

/**
 * Use fetch to send POST method.
 * The content type of the sending data is application/x-www-from-urlencode.
 * The response json format is:
 * {
 *   success: true|false
 *   data: object,  // Data object if success is true.
 *   error: string // Error messages if success is false.
 * }
 *
 * @param {string} url The url of the api
 * @param {object} query The query string object
 */
const fetchGet = (
  url: string,
  query: Object,
) => {
  return fetchHandler(
    fetch(
      `${url}?${qs.stringify(query)}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
        },
      },
    ),
  );
};

export default fetchGet;
