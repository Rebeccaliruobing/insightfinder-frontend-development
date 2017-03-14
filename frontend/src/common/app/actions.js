/* @flow */
import { Observable } from 'rxjs/Observable';
import { REHYDRATE } from 'redux-persist/constants';
import type { Action } from '../types';

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

const appStartEpic = (action$: any) =>
  action$.ofType(REHYDRATE)
    .mergeMap(() => Observable.concat(
      Observable.of(appStarted()),
      Observable.of(hideAppLoader()),
    ));

export const epics = [
  appStartEpic,
];
