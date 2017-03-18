/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import type { Action, Deps } from '../types';
import { isValidCredentials } from '../auth';
import { loginSuccess } from '../auth/actions';
import { retrieveInitData } from '../apis';
import { PermissionError } from '../errors';

export const setCurrentTheme = (theme?: string): Action => ({
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

export const setInitData = (data: Object): Action => ({
  type: 'SET_INIT_DATA',
  payload: data,
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

export const redirectLogin = (reason: Object = {}): Action => ({
  type: 'REDIRECT_LOGIN',
  payload: reason,
});

export const showAppLoader = (): Action => ({
  type: 'SHOW_APPLOADER',
});

export const hideAppLoader = (): Action => ({
  type: 'HIDE_APPLOADER',
});

export const appError = (error: Error): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

const appStartEpic = (action$: any, { getState }: Deps) =>
  // After rehydrate state from local storage, verify the user's access token.
  action$.ofType(REHYDRATE)
    .mergeMap(() => {
      const { credentials } = getState().auth;
      const valid = isValidCredentials(credentials);

      // If token not exists, change application state to started for logining.
      if (!valid) {
        return Observable.of(redirectLogin());
      }

      // Otherwise, verify the token is still valid.
      return Observable
        .from(retrieveInitData(credentials))
        .switchMap(d => Observable.of(
          loginSuccess(credentials),
          setInitData(d),
          appStarted(),
        ))
        .takeUntil(action$.ofType('APP_STOP'))
        .catch((err) => {
          console.error(err);
          if (err instanceof PermissionError) {
            return Observable.of(redirectLogin({ invalidToken: true }));
          }
          return Observable.of(appError(err));
        });
    });

export const epics = [
  appStartEpic,
];
