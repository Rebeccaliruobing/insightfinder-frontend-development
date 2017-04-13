/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../types';
import { loadLogStreaming } from '../apis';
import { showAppLoader, hideAppLoader, appError } from '../app/actions';
import { PermissionError } from '../errors';
import { sessionInvalid } from '../auth/actions';
import { appMessages } from '../app/messages';

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap(() => {
      const { credentials } = getState().auth;
      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadLogStreaming(credentials, 'list'))
          .switchMap((d) => {
            console.log(d);
          })
          .catch((err) => {
            if (err instanceof PermissionError) {
              return Observable.of(
                sessionInvalid(err),
              );
            }
            return Observable.of(
              appError(appMessages.errorsServer, err),
            );
          }),
        Observable.of(hideAppLoader()),
      );
    });

const epics = [
  streamingEpic,
];

export default epics;
