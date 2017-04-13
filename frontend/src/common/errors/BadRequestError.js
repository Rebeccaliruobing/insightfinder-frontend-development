/* @flow */
import { BaseError } from 'make-error';

class BadRequestError extends BaseError {
  response: ?Object;

  constructor(message?: string, response?: Object) {
    super(message);
    this.response = response;
  }
}

export default BadRequestError;
