/* @flow */
import { REHYDRATE } from 'redux-persist/constants';
import type { AppState, Action } from '../types';
import loadLocaleMessages from '../loadLocaleMessages';

const messages = loadLocaleMessages();
const windowWidth = window.innerWidth ||
  document.documentElement.clientWidth || document.body.clientHeight;
const windowHeight = window.innerHeight ||
  document.documentElement.clientHeight || document.body.clientHeight;

const initialState = {
  appName: '',
  appVersion: '',
  currentTheme: 'light',
  locales: Object.keys(messages) || ['en'],
  currentLocale: null,
  messages,
  windowSize: {
    width: windowWidth,
    height: windowHeight,
    widthDiff: 0,
    heightDiff: 0,
  },
  loaded: false,
  started: false,
  online: false,
  error: null,
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
  } else if (action.type === 'SET_WINDOW_SIZE') {
    const { width: currentWidth, height: currentHeight } = state.windowSize;
    const { width, height } = action.payload;
    return {
      ...state,
      windowSize: {
        width, height,
        widthDiff: width - currentWidth,
        heightDiff: height - currentHeight,
      },
    };
  } else if (action.type === 'APP_START') {
    return {
      ...state,
      loaded: true,
    };
  } else if (action.type === 'APP_STARTED') {
    return {
      ...state,
      started: true,
    };
  } else if (action.type === 'APP_ERROR') {
    return {
      ...state,
      error: action.payload.error,
    };
  } else if (action.type === 'APP_ONLINE') {
    return {
      ...state,
      online: action.payload.online,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
