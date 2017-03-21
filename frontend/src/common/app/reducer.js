/* @flow */
import { REHYDRATE } from 'redux-persist/constants';
import R from 'ramda';
import type { AppState, Action } from '../types';
import loadLocaleMessages from '../loadLocaleMessages';

const localeMessages = loadLocaleMessages();
const locales = R.map(l => l.name, localeMessages);
const messages = R.map(l => l.messages, localeMessages);

const initialState = {
  appName: '',
  appVersion: '',
  currentTheme: 'light',
  currentLocale: null,
  viewport: {
    width: 0,
    height: 0,
    widthDiff: 0,
    heightDiff: 0,
  },
  locales,
  messages,
  appLoaderVisible: false,
  rehydrated: false,
  starting: false,
  started: false,
  fatalError: null,
  error: null,
  lastError: null,
};

const reducer = (
  state: AppState = initialState,
  action: Action,
): AppState => {
  if (action.type === REHYDRATE) {
    // When doing rehydrate, if returns different state object,
    // autoRehydrate will be skipped.
    return state;
  } else if (action.type === 'SET_CURRENT_THEME') {
    return {
      ...state,
      currentTheme: action.payload.theme,
    };
  } else if (action.type === 'SET_CURRENT_LOCALE') {
    return {
      ...state,
      currentLocale: action.payload.locale,
    };
  } else if (action.type === 'SET_VIEWPORT') {
    const { width: currentWidth, height: currentHeight } = state.viewport;
    const { width, height } = action.payload;
    return {
      ...state,
      viewport: {
        width, height,
        widthDiff: width - currentWidth,
        heightDiff: height - currentHeight,
      },
    };
  } else if (action.type === 'APP_START') {
    return {
      ...state,
      appLoaderVisible: true,
      starting: true,
    };
  } else if (action.type === 'APP_REHYDRATED') {
    return {
      ...state,
      rehydrated: true,
    };
  } else if (action.type === 'APP_STARTED') {
    return {
      ...state,
      starting: false,
      started: true,
    };
  } else if (action.type === 'APP_STOP') {
    return {
      ...state,
      started: false,
    };
  } else if (action.type === 'SHOW_APPLOADER') {
    return {
      ...state,
      appLoaderVisible: true,
    };
  } else if (action.type === 'HIDE_APPLOADER') {
    return {
      ...state,
      appLoaderVisible: false,
    };
  } else if (action.type === 'APP_FATAL_ERROR') {
    return {
      ...state,
      fatalError: action.payload.error,
      lastError: action.payload.error,
    };
  } else if (action.type === 'APP_ERROR') {
    return {
      ...state,
      error: action.payload.error,
      lastError: action.payload.error,
    };
  } else if (action.type === 'LOGIN_FAILURE') {
    return {
      ...state,
      lastError: action.payload.error,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
