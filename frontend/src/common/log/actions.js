/* @flow */
import type { Action } from '../types';

export const loadLogStreaming = (
  projectId: ?string, incidentId: ?string,
  match: Object, params: ?Object,
  forceReload?: bool,
): Action => ({
  type: 'LOAD_LOG_STREAMING',
  payload: {
    projectId,
    incidentId,
    match,
    params,
    forceReload,
  },
});

export const setLogStreaming = (projectId: string, info: Object): Action => ({
  type: 'SET_LOG_STREAMING',
  payload: {
    projectId,
    info,
  },
});
