/* @flow */
import type { Action } from '../types';

export const loadLogFile = (
  projectId: ?string, incidentId: ?string,
  match: Object, params: ?Object,
  forceReload?: bool,
): Action => ({
  type: 'LOAD_LOG_FILE',
  payload: {
    projectId,
    incidentId,
    match,
    params,
    forceReload,
  },
});

export const setLogFile = (
  projectId: string, projectInfo: Object, incidentId: ?string, incidentInfo: ?Object,
): Action => ({
  type: 'SET_LOG_FILE',
  payload: {
    projectId,
    projectInfo,
    incidentId,
    incidentInfo,
  },
});

export const loadLogStreaming = (
  projectId: ?string, month: ?string, incidentId: ?string,
  match: Object, params: ?Object,
  forceReload?: bool,
): Action => ({
  type: 'LOAD_LOG_STREAMING',
  payload: {
    projectId,
    month,
    incidentId,
    match,
    params,
    forceReload,
  },
});

export const setLogStreaming = (
  projectId: string, projectInfo: Object, incidentId: ?string, incidentInfo: ?Object,
): Action => ({
  type: 'SET_LOG_STREAMING',
  payload: {
    projectId,
    projectInfo,
    incidentId,
    incidentInfo,
  },
});
