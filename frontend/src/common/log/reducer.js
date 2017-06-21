/* @flow */
/* eslint-disable no-console */
import type { LogState, Action } from '../types';

const initialState: LogState = {
  fileInfos: {},
  fileIncidentInfos: {},
  streamingInfos: {},
  streamingIncidentInfos: {},
  currentErrorMessage: null,
};

const reducer = (
  state: LogState = initialState,
  action: Action,
): LogState => {
  if (action.type === 'SET_LOG_STREAMING') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'SET_LOG_FILE') {
    const { projectId, projectInfo, incidentId, incidentInfo } = action.payload;
    let { fileInfos, fileIncidentInfos } = state;
    fileInfos = {
      ...fileInfos,
      [projectId]: projectInfo,
    };

    if (incidentId) {
      fileIncidentInfos = {
        ...fileIncidentInfos,
        [incidentId]: incidentInfo,
      };
    }

    return {
      ...state,
      fileInfos,
      fileIncidentInfos,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
