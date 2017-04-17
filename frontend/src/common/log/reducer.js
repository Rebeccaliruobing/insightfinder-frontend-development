/* @flow */
/* eslint-disable no-console */
import type { LogState, Action } from '../types';

const initialState: LogState = {
  streamingInfos: {},
};

const reducer = (
  state: LogState = initialState,
  action: Action,
): LogState => {
  if (action.type === 'SET_LOG_STREAMING') {
    const { streamingInfos } = state;
    const { projectId, info } = action.payload;
    return {
      ...state,
      streamingInfos: {
        ...streamingInfos,
        [projectId]: {
          ...info,
        },
      },
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
