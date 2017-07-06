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
  projectCreationStatus: '',
  externalServiceList: [],
};

const reducer = (state: LogState = initialState, action: Action): LogState => {
  if (action.type === 'SET_PROJECT_SETTINGS') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'CREATE_PROJECT') {
    return {
      ...state,
      projectCreationStatus: 'creating',
    };
  } else if (action.type === 'SET_PROJECT_CREATION_STATUS') {
    return {
      ...state,
      projectCreationStatus: action.payload,
    };
  } else if (action.type === 'UPDATE_PROJECT_MODEL_STATUS') {
    // This action doesn't work.
    console.log('BUG: update model', action.payload);
    const { projectSettings } = state;
    const { modelKey, status } = action.payload;
    let models = projectSettings.models || [];

    const idx = R.findIndex(m => m.modelKey === modelKey, models);
    let changed = false;
    if (idx >= 0) {
      if (status === 'removed') {
        models = R.slice(idx, 1, models);
        changed = true;
      } else if (status === 'picked') {
        let model = models[idx];
        model = {
          ...model,
          picked: true,
        };
        models = [...R.slice(0, idx, models), model, ...R.slice(idx, models)];
        changed = true;
      }
    }

    if (changed) {
      return { ...state, projectSettings: { ...projectSettings, models } };
    }
    return state;
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
