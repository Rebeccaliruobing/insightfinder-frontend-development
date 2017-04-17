/* @flow */
import type { Action } from '../types';

export const loadLogStreaming = (
  projectId: ?string, instanceId: ?string,
  match: Object, forceReload?: bool,
): Action => ({
  type: 'LOAD_LOG_STREAMING',
  payload: {
    projectId,
    instanceId,
    match,
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
