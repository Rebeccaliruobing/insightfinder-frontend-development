/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import store from 'store';
import type { Action, Deps } from '../types';
import { isValidCredentials } from '../auth';
import { loginSuccess, loginFailure } from '../auth/actions';
import { retrieveInitData } from '../apis';
import { PermissionError } from '../errors';
import authMessages from '../auth/authMessages';

export const setCurrentTheme = (theme: string): Action => ({
  type: 'SET_CURRENT_THEME',
  payload: { theme },
});

export const setCurrentLocale = (locale: string): Action => ({
  type: 'SET_CURRENT_LOCALE',
  payload: { locale },
});

export const setViewport = (width: number, height: number): Action => ({
  type: 'SET_VIEWPORT',
  payload: { width, height },
});

export const appRehydrated = (): Action => ({
  type: 'APP_REHYDRATED',
});

export const appStart = (): Action => ({
  type: 'APP_START',
});

export const appStarted = (): Action => ({
  type: 'APP_STARTED',
});

export const appStop = (): Action => ({
  type: 'APP_STOP',
});

export const setInitData = (data: Object): Action => ({
  type: 'SET_INIT_DATA',
  payload: data,
});

export const showAppLoader = (): Action => ({
  type: 'SHOW_APPLOADER',
});

export const hideAppLoader = (): Action => ({
  type: 'HIDE_APPLOADER',
});

export const appFatalError = (error: Error): Action => ({
  type: 'APP_FATAL_ERROR',
  payload: { error },
});

export const appError = (error: Error): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

const appStart$ = (action$: any, getState: Function) => {
  let { credentials, userInfo } = getState().auth;
  let valid = isValidCredentials(credentials);

  if (!valid) {
    // TODO: [v1.0] Remove store dependence after all api migrated.
    // Get credentials and userinfo from store
    const userName = store.get('userName');
    const token = store.get('token');
    userInfo = store.get('userInfo');
    credentials = { userName, token };

    valid = isValidCredentials(credentials);
  } else {
    store.set('token', credentials.token);
    store.set('userName', credentials.userName);
    store.set('userInfo', userInfo);
  }

  // If token not exists, return login failure action without reason.
  if (!valid) {
    return Observable.of(loginFailure(), appStarted());
  }

  // Otherwise, load the initial data and verify the token is still valid.
  return Observable
    .from(retrieveInitData(credentials))
    .switchMap(d => Observable.of(
      loginSuccess(credentials, userInfo),
      setInitData(d),
      appStarted(),
    ))
    .takeUntil(action$.ofType('APP_STOP'))
    .catch((err) => {
      if (err instanceof PermissionError) {
        return Observable.of(
          loginFailure(authMessages.errorsTokenInvalid, err),
          appStarted(),
        );
      }
      return Observable.of(
        appFatalError(err),
        appStarted(),
      );
    });
};

const RehydrateEpic = (action$: any, { getState }: Deps) =>
  action$.ofType(REHYDRATE)
    .concatMap(() => {
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
      const { rehydrated, started } = getState().app;
      if (!rehydrated || started) {
        return Observable.empty();
      }
      return appStart$(action$, getState);
    });

export const epics = [
  RehydrateEpic,
  appStartEpic,
];
