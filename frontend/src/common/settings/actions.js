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
 * Set the components loading status. The components contains the name and true/false value.
 * This action is handled by reducer.
 */
export const setLoadingComponents = (components: ?Object) => ({
  type: 'SET_LOADING_COMPONENTS',
  payload: {
    ...components,
  },
});

/**
 * Action used to set the project settings and related states in redux store.
 * It's handled by reducer.
 */
export const setProjectSettings = (info: Object): Action => ({
  type: 'SET_PROJECT_SETTINGS',
  payload: {
    ...info,
  },
});
