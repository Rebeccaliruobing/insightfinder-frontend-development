/* @flow */
/* eslint-disable no-console */
import {
  BadRequestError, ContentTypeError, HttpError, InvalidDataError,
  NetworkError, NotFoundError, PermissionError,
} from '../errors';

/**
 * General response handler for fetch command.
 * The response json format is:
 * {
 *   success: true|false
 *   data: object,  // Data object if success is true.
 *   error: string // Error messages if success is false.
 * }
 *
 * @param {Promise} command The promise of the fetch command.
 */
const fetchHandler = (
  command: Object,
) =>
  command
    .catch((err) => { throw new NetworkError(err); })
    .then((resp) => {
      if (resp.ok) {
        return resp;
      } else if (resp.status === 401 || resp.status === 403) {
        // TODO: Review the 401 status code
        throw new PermissionError(resp.statusText, resp.status, resp);
      } else if (resp.status === 400) {
        throw new BadRequestError(resp.statusText, resp);
      } else if (resp.status === 404) {
        throw new NotFoundError(resp.statusText, resp);
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
        console.warn(
          ['Return error in a 200 response is deprecated, change API http status code.', json]);
        // TODO: Remove hack code for wrong code in displayProjectModel.
        if (json.code === 12 && json.message.indexOf('Models') === -1) {
          throw new PermissionError(json.message, json.code, json);
        }
        throw new InvalidDataError(json.message, json.code, json);
      }
      return json;
    });

export default fetchHandler;
