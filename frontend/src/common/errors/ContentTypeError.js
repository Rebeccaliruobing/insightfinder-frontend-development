/* @flow */
import InvalidDataError from './InvalidDataError';

class ContentTypeError extends InvalidDataError {
  constructor(expect: string, actual: string, response?: Object) {
    super(`content type expect ${expect} but get ${actual}`, 40401, response);
  }
}

export default ContentTypeError;
