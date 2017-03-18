/* @flow */
import qs from 'qs';
import {
  NetworkError, PermissionError,
  HttpError, ContentTypeError, InvalidDataError,
} from '../errors';

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
 * @param {object} data The data to post.
 */
const fetchPost = (
  url: string,
  data: Object,
) =>
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: qs.stringify(data),
  })
    // Promise rejection returns the network related error.
    .catch((err) => { throw new NetworkError(err); })
    .then((resp) => {
      if (resp.ok) {
        return resp;
      } else if (resp.status === 401 || resp.status === 403) {
        throw new PermissionError(resp.statusText, resp.status, resp);
      } else {
        throw new HttpError(resp.status, resp.statusText, resp);
      }
    })
    .then((resp) => {
      const ctype = resp.headers.get('Content-Type');
      const expect = 'application/json';
      if (ctype !== expect) {
        throw new ContentTypeError(expect, ctype, resp);
      }
      return resp;
    })
    .then(res => res.json())
    .then((json) => {
      if (!json.success) {
        if (json.code === 12) {
          throw new PermissionError(json.message, json.code, json);
        }
        throw new InvalidDataError(json.message, json.code, json);
      }
      return json.data;
    });

export default fetchPost;
