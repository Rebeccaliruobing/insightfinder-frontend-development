/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { purgeStoredState } from 'redux-persist';
import type { Deps } from '../types';
import { login as loginApi, loadInitData } from '../apis';
import { showAppLoader, appError, setInitData } from '../app/actions';
import { appMessages } from '../app/messages';
import { loginSuccess, loginFailure } from './actions';
import { PermissionError } from '../errors';
import { authMessages } from './messages';

const loginEpic = (action$: any) =>
  action$.ofType('LOGIN')
    .concatMap(action =>
      Observable
        .from(loginApi(action.payload))
        .concatMap((d) => {
          return Observable.concat(
            Observable.of(
              showAppLoader(),
              loginSuccess(d.credentials, d.userInfo),
            ),
            Observable
              .from(loadInitData(d.credentials))
              .map(data => setInitData(data))
              .takeUntil(action$.ofType('APP_STOP'))
              .catch(err => Observable.of(
                appError(appMessages.errorsServer, err),
              )),
          );
        })
        .catch((err) => {
          console.error(['API call failed', err]);
          if (err instanceof PermissionError) {
            return Observable.of(
              loginFailure(authMessages.errorsWrongCredential, err),
            );
          }
          return Observable.of(
            loginFailure(authMessages.errorsLoginFailure, err),
          );
        }));

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

const epics = [
  loginEpic,
  logoffEpic,
];

export default epics;
