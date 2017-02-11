/* @flow */
import { REHYDRATE } from 'redux-persist/constants';
import type { AppState, Action } from '../types';
import loadLocaleMessages from '../loadLocaleMessages';

const messages = loadLocaleMessages();

const initialState = {
  appName: '',
  appVersion: '',
  isReactNative: false,
  platform: '',
  currentTheme: 'light',
  locales: Object.keys(messages) || ['en'],
  currentLocale: null,
  messages,
  loaded: false,
  started: false,
  online: false,
  error: null,
};

const reducer = (
  state: AppState = initialState,
  action: Action,
) : AppState => {
  switch (action.type) {
    // When doing rehydrate, if returns different state object,
    // autoRehydrate will be skipped.
    case REHYDRATE:
      return state;

    case 'SET_CURRENT_THEME':
      return { ...state, currentTheme: action.payload.theme };

    case 'SET_CURRENT_LOCALE':
      return { ...state, currentLocale: action.payload.locale };

    case 'APP_START':
      return { ...state, loaded: true };

    case 'APP_STARTED':
      return { ...state, started: true };

    case 'APP_ERROR':
      return { ...state, error: action.payload.error };

    case 'APP_ONLINE':
      return { ...state, online: action.payload.online };

    default:
      return { ...initialState, ...state };
  }
};

export default reducer;
