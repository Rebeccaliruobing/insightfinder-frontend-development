/* @flow */
import type { Action } from '../types';

export const loadLogStreaming = (project: ?string, log: ?string): Action => ({
  type: 'LOAD_LOG_STREAMING',
  payload: {
    project,
    log,
  },
});
