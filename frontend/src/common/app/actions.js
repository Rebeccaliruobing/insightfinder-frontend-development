/* @flow */
import { Observable } from 'rxjs/Observable';
import store from 'store';
import { REHYDRATE } from 'redux-persist/constants';
import type { Action, Deps } from '../types';
import { isValidCredentials } from '../auth';
import { loginSuccess } from '../auth/actions';
import { retrieveInitData } from '../apis';

export const setCurrentTheme = (theme?: string): Action => ({
  type: 'SET_CURRENT_THEME',
  payload: { theme },
});

export const setCurrentLocale = (locale: string): Action => ({
  type: 'SET_CURRENT_LOCALE',
  payload: { locale },
});

export const setWindowSize = (width: number, height: number): Action => ({
  type: 'SET_WINDOW_SIZE',
  payload: { width, height },
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

const appStartEpic = (action$: any, { getState, bindCredentials }: Deps) =>
  // After rehydrate state from local storage, verify the user's access token.
  action$.ofType(REHYDRATE)
    .mergeMap(() => {
      let { credentials } = getState().auth;
      let valid = isValidCredentials(credentials);

      // TODO: [Deprecated] Remove store dependence
      if (!valid) {
        const userName = store.get('userName');
        const token = store.get('token');
        if (userName && token) {
          console.warn('Read token from store, will depreciate in next version');
          credentials = { userName, token };
          valid = true;
        }
      }

      // If token not exists, change application state to started.
      if (!valid) {
        return Observable.concat(
          Observable.of(appStarted()),
          Observable.of(hideAppLoader()),
        );
      }

      // Otherwise, verify the token is still valid.
      return Observable
        .of(loginSuccess(credentials))
        .concat(
        Observable.of(appStarted()),
        Observable.of(hideAppLoader()),
        );
    });

export const epics = [
  appStartEpic,
];
