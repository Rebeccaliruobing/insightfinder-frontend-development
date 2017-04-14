/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { showAppAlert } from '../app/actions';
import { sessionInvalid } from '../auth/actions';
import { appMessages } from '../app/messages';
import BadRequestError from './BadRequestError';
import NotFoundError from './NotFoundError';
import InvalidDataError from './InvalidDataError';
import PermissionError from './PermissionError';
import NetworkError from './NetworkError';

const apiEpicErrorHandle = (err :Error) => {
  console.error(['API call failed', err]);
  if (err instanceof NotFoundError) {
    return Observable.of(
      showAppAlert('error', appMessages.errorsNotFound),
    );
  }

  if (err instanceof BadRequestError) {
    return Observable.of(
      showAppAlert('error', appMessages.errorsBadRequest),
    );
  }

  if (err instanceof InvalidDataError) {
    return Observable.of(
      showAppAlert('error', appMessages.errorsInvalidData),
    );
  }

  if (err instanceof NetworkError) {
    return Observable.of(
      showAppAlert('error', appMessages.errorsNetwork),
    );
  }

  if (err instanceof PermissionError) {
    return Observable.of(
      sessionInvalid(err),
    );
  }

  return Observable.of(
    showAppAlert('error', appMessages.errorsServer),
  );
};

export default apiEpicErrorHandle;
