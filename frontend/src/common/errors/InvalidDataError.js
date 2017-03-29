/* @flow */
import { BaseError } from 'make-error';

class InvalidDataError extends BaseError {
  code: ?number;
  data: ?Object;

  constructor(message?: string, code?: number, data?: Object) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export default InvalidDataError;
