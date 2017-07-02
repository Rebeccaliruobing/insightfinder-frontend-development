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
 * Create project, the project parameters are different with each type.
 * This action is handled by epic and reducer.
 */
export const createProject = (
  projectName: String,
  projectType: String,
  params: Object,
): Action => ({
  type: 'CREATE_PROJECT',
  payload: { projectName, projectType, params },
});

/**
 * Set the project creation status.
 */
export const setProjectCreationStatus = (status: String): Action => ({
  type: 'SET_PROJECT_CREATION_STATUS',
  payload: status,
});

/**
 * Remove the project.
 */
export const removeProject = (projectName: String): Action => ({
  type: 'REMOVE_PROJECT',
  payload: { projectName },
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

/**
 * Action used to remove the project model.
 * This action is handled by epic.
 */
export const removeProjectModel = (
  projectName: String,
  instanceGroup,
  modelKey: String,
  params: Object,
): Action => ({
  type: 'REMOVE_PROJECT_MODEL',
  payload: { projectName, instanceGroup, modelKey, params },
});

/**
 * Action used to pick the project model.
 * This action is handled by epic.
 */
export const pickProjectModel = (
  projectName: String,
  instanceGroup,
  modelKey: String,
  params: Object,
): Action => ({
  type: 'PICK_PROJECT_MODEL',
  payload: { projectName, instanceGroup, modelKey, params },
});

/**
 * Update the project model's status, the status can be 'removed', 'picked'.
 * This action is handled by reducer.
 */
export const updateProjectModelStatus = (modelKey: String, status: String): Action => ({
  type: 'UPDATE_PROJECT_MODEL_STATUS',
  payload: { modelKey, status },
});
