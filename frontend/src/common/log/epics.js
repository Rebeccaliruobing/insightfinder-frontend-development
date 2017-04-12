/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../types';
import { loadLogStreaming } from '../apis';

const streamingEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING')
    .concatMap(() => {
      const { credentials } = getState().auth;
      return Observable.from(loadLogStreaming(credentials, 'list'));
    });

const epics = [
  streamingEpic,
];

export default epics;
