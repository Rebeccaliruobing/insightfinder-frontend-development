/* @flow */
/* eslint-disable no-console */
import { REHYDRATE } from 'redux-persist/constants';
import R from 'ramda';
import { get } from 'lodash';
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
    width: 0, height: 0,
    widthDiff: 0, heightDiff: 0,
  },
  locales,
  messages,
  rehydrated: false,
  starting: false,
  started: false,
  inited: false,
  appLoaderVisible: false,
  pageLoaderVisible: false,
  lastError: null,
  alerts: [],
  v1store: {},
  projects: [],
  filters: {},
  enabledDataSourceNames: [
    'AWSCloudWatch', 'GoogleCloudMonitoring', 'DataDog', 'NewRelic',
    'AWSEC2', 'cAdvisor',
  ], // TODO: used to filter enabled data source
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
  } else if (action.type === 'SET_INIT_DATA') {
    const settings = JSON.parse(get(action.payload, 'projectSettingsAllInfo', '[]'));
    const projectString = get(action.payload, 'projectString', '').split(',');
    const projectInfos = {};
    R.forEach((p) => {
      const info = p.split(':');
      projectInfos[info[0]] = {
        projectType: info[1],
        instanceType: info[2],
        dataType: info[3],
      };
    }, projectString);

    const projects = R.map((s) => {
      const info = projectInfos[s.projectName];
      const isLogStreaming = info.dataType.toLowerCase() === 'log' &&
        info.instanceType.toLowerCase() !== 'logfile';
      const isLogFile = info.dataType.toLowerCase() === 'log' &&
        info.instanceType.toLowerCase() === 'logfile';

      return {
        name: s.projectName,
        type: s.projectType,
        isLogStreaming,
        isLogFile,
      };
    }, settings);

    return {
      ...state,
      inited: true,
      projects,
      v1store: {
        ...state.v1store,
        dashboardUservalues: action.payload,
      },
    };
  } else if (action.type === 'APP_STOP') {
    return {
      ...state,
      started: false,
    };
  } else if (action.type === 'SHOW_APP_LOADER') {
    // Show the app loader if it's not initialized, otherwise show page loader.
    const { inited, appLoaderVisible } = state;
    return {
      ...state,
      appLoaderVisible: appLoaderVisible || !inited,
      pageLoaderVisible: inited && !appLoaderVisible,
    };
  } else if (action.type === 'HIDE_APP_LOADER') {
    return {
      ...state,
      appLoaderVisible: false,
      pageLoaderVisible: false,
    };
  } else if (action.type === 'APP_ERROR') {
    return {
      ...state,
      appLoaderVisible: false,
      pageLoaderVisible: false,
      lastError: action.payload,
    };
  } else if (action.type === 'SHOW_APP_ALERT') {
    const { type, message } = action.payload;
    let alerts = state.alerts;
    alerts = [...alerts, {
      id: Date.now().toString(),
      type,
      message,
    }];
    return {
      ...state,
      alerts,
    };
  } else if (action.type === 'HIDE_APP_ALERT') {
    const { ids } = action.payload;
    let { alerts } = state;
    alerts = R.filter(a => !R.find(R.identical(a.id), ids), alerts);
    return {
      ...state,
      alerts,
    };
  } else if (action.type === 'SET_APP_FILTERS') {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
