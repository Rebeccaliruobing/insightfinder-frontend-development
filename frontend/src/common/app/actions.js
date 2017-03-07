/* @flow */
import type { Action } from '../types';

export const appError = (error: Error): Action => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const setCurrentTheme = (theme?: string): Action => ({
  type: 'SET_CURRENT_THEME',
  payload: { theme },
});

export const setCurrentLocale = (locale: string): Action => ({
  type: 'SET_CURRENT_LOCALE',
  payload: { locale },
});

export const setWindowSize = (windowWidth: number, windowHeight: number): Action => ({
  type: 'SET_WINDOW_SIZE',
  payload: { windowWidth, windowHeight },
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
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
