/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* @flow */
import type { Action } from '../types';

export const loadProjectSettings = (
  projectName: String,
  setting: ?String,
  instanceGrup: ?String,
  startTime: ?String,
  endTime: ?String,
): Action => ({
  type: 'LOAD_PROJECT_SETTINGS',
  payload: { projectName, setting, instanceGrup, startTime, endTime },
});

export const setProjectSettings = (info: Object): Action => ({
  type: 'SET_PROJECT_SETTINGS',
  payload: {
    ...info,
  },
});
