/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';

import type { LogState, Action } from '../types';

const initialState: LogState = {
  projectSettings: {},
  projectSettingsParams: {},
  projectGroups: [],
  currentApisParams: {},
  currentErrorMessage: null,
};

const reducer = (state: LogState = initialState, action: Action): LogState => {
  if (action.type === 'SET_PROJECT_SETTINGS') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'SET_SETTINGS_API_PARAMS') {
    const { name, params } = action.payload;
    return {
      ...state,
      currentApisParams: {
        ...state.currentApisParams,
        [name]: params,
      },
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
