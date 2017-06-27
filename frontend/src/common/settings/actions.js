/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* @flow */
import type { Action } from '../types';

/**
 * Action used to load project settings from server. It's handled by epic.
 */
export const loadProjectSettings = (
  projectName: String,
  params: Object,
  force: Boolean = false,
): Action => ({
  type: 'LOAD_PROJECT_SETTINGS',
  payload: { projectName, params, force },
});

/**
 * Action used to save project settings to server, It's handled by epic.
 * The components parameter contains loading status needed to change.
 */
export const saveProjectSettings = (
  projectName: String,
  settings: Object,
  components: ?Object,
): Action => ({
  type: 'SAVE_PROJECT_SETTINGS',
  payload: {
    projectName,
    settings,
    components,
  },
});

/**
 * Set the current settings APIs parameters, if parameters not changed, will reuse the data
 * instead of calling the API. Each API will has it's own status.
 */
export const setSettingsApisParams = (name: String, params: Object) => ({
  type: 'SET_SETTINGS_API_PARAMS',
  payload: { name, params },
});

/**
 * Action used to set the project settings and related states in redux store.
 * It's handled by reducer.
 */
export const setProjectSettings = (info: Object): Action => ({
  type: 'SET_PROJECT_SETTINGS',
  payload: { ...info },
});
