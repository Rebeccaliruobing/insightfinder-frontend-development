/* @flow */
import { BaseError } from 'make-error';

class HttpError extends BaseError {
  code: ?number;
  response: ?Object;

  constructor(code?: number, message?: string, response?: Object) {
    super(message);
    this.code = code;
    this.response = response;
  }
}

export default HttpError;
