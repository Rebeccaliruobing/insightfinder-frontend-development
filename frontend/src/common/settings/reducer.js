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
  currentApisParams: {},
  currentErrorMessage: null,
};

const reducer = (state: LogState = initialState, action: Action): LogState => {
  if (action.type === 'SET_PROJECT_SETTINGS') {
    return {
      ...state,
      ...action.payload,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
