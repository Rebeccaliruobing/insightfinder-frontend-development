/* @flow */
/* eslint-disable no-console */

import { Observable } from 'rxjs/Observable';
import { purgeStoredState } from 'redux-persist';
import type { Deps } from '../../types';

const logoffEpic = (action$: any, { getState, storageEngine }: Deps) =>
  action$.ofType('LOGOFF')
    .concatMap(() => {
      // Purge all stored state and then reload the page.
      const state = getState();
      const appName = state.app.appName;

      purgeStoredState({
        storage: storageEngine,
        keyPrefix: `${appName}:`,
      }).then(() => {
        window.location.href = '/';
      });
      return Observable.empty();
    });

export default logoffEpic;
