/* @flow */
/* eslint-disable no-console */
import {
  BadRequestError,
  ContentTypeError,
  HttpError,
  InvalidDataError,
  NetworkError,
  NotFoundError,
  PermissionError,
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
const fetchPostJsonHandler = (command: Object) =>
  command
    .catch(err => {
      throw new NetworkError(err);
    })
    .then(resp => {
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
    .then(resp => {
      return resp;
    });

export default fetchPostJsonHandler;
