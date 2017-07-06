/* @flow */
import fetchPostJsonHandler from './fetchPostJsonHandler';
import { buildUrl } from '../utils';

/**
 * Use fetch to send POST method with JSON object as body
 * The content type of the sending data is application/x-www-from-urlencode.
 *
 * @param {string} url The url of the api
 * @param {object} params The url parameters
 * @param {object} data The data to post.
 */
const fetchPostJson = (url: string, params: Object, data: Object) =>
  fetchPostJsonHandler(
    fetch(buildUrl(url, {}, params), {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),
  );

export default fetchPostJson;
