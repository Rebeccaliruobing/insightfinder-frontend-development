/* @flow */
/* eslint-disable no-console */
import type { LogState, Action } from '../types';

const initialState: LogState = {
  currentStreamingProject: null,
  currentStreamingLog: null,
  streamingInfos: {},
};

const reducer = (
  state: LogState = initialState,
  action: Action,
): LogState => {
  if (action.type === 'SET_LOG_STREAMING_SELECTION') {
    return {
      ...state,
      currentStreamingProject: action.payload.project,
      currentStreamingLog: action.payload.log,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
