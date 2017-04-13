/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import PermissionError from './PermissionError';
import { showAppAlert } from '../app/actions';
import { sessionInvalid } from '../auth/actions';
import { appMessages } from '../app/messages';

const apiEpicErrorHandle = (err :Error) => {
  console.error(['API call failed', err]);
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
