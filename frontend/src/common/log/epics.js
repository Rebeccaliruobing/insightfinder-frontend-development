/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../types';
import { loadLogStreaming } from '../apis';
import { showAppLoader, hideAppLoader } from '../app/actions';
import { apiEpicErrorHandle } from '../errors';

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap((action) => {
      const { project } = action.payload;
      console.log(action);
      const { credentials } = getState().auth;
      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadLogStreaming(credentials, project, 'list'))
          .switchMap((d) => {
            console.log(d);
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(hideAppLoader()),
      );
    });

const epics = [
  streamingEpic,
];

export default epics;
