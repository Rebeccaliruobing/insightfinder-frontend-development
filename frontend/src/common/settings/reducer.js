/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { LogState, Action } from '../types';

const initialState: LogState = {
  projectSettingsParams: {},
};

const reducer = (
  state: LogState = initialState,
  action: Action,
): LogState => {
  if (action.type === 'SET_PROJECT_SETTINGS') {
    return {
      ...state,
      ...action.payload,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
