/* @flow */
import type { Action } from '../types';

export const loadLogStreaming = (project: ?string, log: ?string): Action => ({
  type: 'LOAD_LOG_STREAMING',
  payload: {
    project,
    log,
  },
});

export const setLogStreamingSelection = (project: ?string, log: ?string): Action => ({
  type: 'SET_LOG_STREAMING_SELECTION',
  payload: {
    project,
    log,
  },
});
