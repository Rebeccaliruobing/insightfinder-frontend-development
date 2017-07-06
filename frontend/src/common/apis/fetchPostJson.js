/* @flow */
import qs from 'qs';
import fetchHandler from './fetchHandler';
import { buildUrl } from '../utils';

/**
 * Use fetch to send POST method with JSON object as body
 * The content type of the sending data is application/x-www-from-urlencode.
 * The response json format is:
 * {
 *   success: true|false
 *   data: object,  // Data object if success is true.
 *   error: string // Error messages if success is false.
 * }
 *
 * @param {string} url The url of the api
 * @param {object} data The data to post.
 */
const fetchPostJson = (url: string, params: Object, data: Object) =>
  fetchHandler(
    fetch(buildUrl(url, params), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: qs.stringify(data),
    }),
  );

export default fetchPostJson;
