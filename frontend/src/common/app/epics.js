/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import type { Deps } from '../types';
import { PermissionError } from '../errors';
import { isValidCredentials } from '../auth';
import { loadInitData } from '../apis';
import { loginSuccess, loginFailure, sessionInvalid } from '../auth/actions';
import { appStarted, setInitData, appFatalError, appRehydrated } from './actions';
import { appMessages } from '../app/messages';

const appStart$ = (action$: any, getState: Function) => {
  const { credentials, userInfo } = getState().auth;
  const valid = isValidCredentials(credentials);

  // If token not exists, dispatch login failure action without error to
  // route to login page.
  if (!valid) {
    return Observable.of(
      loginFailure(),
      appStarted(),
    );
  }

  // Otherwise, load the initial data and verify the token is still valid.
  return Observable
    .from(loadInitData(credentials))
    .switchMap((d) => {
      return Observable.of(
        loginSuccess(credentials, userInfo),
        appStarted(),
        setInitData(d),
      );
    })
    .takeUntil(action$.ofType('APP_STOP'))
    .catch((err) => {
      if (err instanceof PermissionError) {
        return Observable.of(
          sessionInvalid(err),
          appStarted(),
        );
      }
      return Observable.of(
        appFatalError(appMessages.errorsServer, err),
      );
    });
};

const RehydrateEpic = (action$: any, { getState }: Deps) =>
  action$.ofType(REHYDRATE)
    .concatMap(() => {
      // Run the start epic after rehydrate finished
      const { starting } = getState().app;
      if (!starting) {
        return Observable.of(appRehydrated());
      }
      return Observable.concat(
        Observable.of(appRehydrated()),
        appStart$(action$, getState),
      );
    });

const appStartEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('APP_START')
    .concatMap(() => {
      // Run the start epic after rehydrate finished
      const { rehydrated, started } = getState().app;
      if (!rehydrated || started) {
        return Observable.empty();
      }
      return appStart$(action$, getState);
    });

const epics = [
  RehydrateEpic,
  appStartEpic,
];

export default epics;
