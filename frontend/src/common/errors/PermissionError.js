/* @flow */
import { BaseError } from 'make-error';

class PermissionError extends BaseError {
  code: ?number;
  response: ?Object;

  constructor(message?: string, code?: number, response?: Object) {
    super(message);
    this.code = code;
    this.response = response;
  }
}

export default PermissionError;
