/* @flow */
import type { Action, Message, Filters } from '../types';

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
  type: 'SHOW_APP_LOADER',
});

export const hideAppLoader = (): Action => ({
  type: 'HIDE_APP_LOADER',
});

export const setAppFilters = (filters: Filters): Action => ({
  type: 'SET_APP_FILTERS',
  payload: filters,
});

export const appError = (message: ?Message, error: ?Error): Action => ({
  type: 'APP_ERROR',
  payload: { message, error },
});

export const showAppAlert = (type: string, message: Message, params: ?Object): Action => ({
  type: 'SHOW_APP_ALERT',
  payload: { type, message, params },
});

export const hideAppAlert = (ids: Array<string>): Action => ({
  type: 'HIDE_APP_ALERT',
  payload: { ids },
});

/**
 * Set the components loading status. The components contains the name and true/false value.
 * This action is handled by reducer.
 */
export const setLoadingComponents = (components: ?Object) => ({
  type: 'SET_LOADING_COMPONENTS',
  payload: {
    ...components,
  },
});
