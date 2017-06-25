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
  currentErrorMessage: null,
  currentLoadingComponents: {},
};

const reducer = (state: LogState = initialState, action: Action): LogState => {
  if (action.type === 'SET_PROJECT_SETTINGS') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'SET_LOADING_COMPONENTS') {
    // Merge the current loadings components with the new components status
    // And remove the false components to reduce the state size.
    const currentLoadingComponents = R.filter(R.identity, {
      ...state.currentLoadingComponents,
      ...action.payload,
    });
    console.log('loading', currentLoadingComponents);
    return {
      ...state,
      currentLoadingComponents,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
