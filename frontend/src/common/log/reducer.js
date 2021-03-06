/* @flow */
/* eslint-disable no-console */
import type { LogState, Action } from '../types';

const initialState: LogState = {
  fileInfos: {},
  fileIncidentInfos: {},
  streamingInfos: {},
  streamingIncidentInfos: {},
};

const reducer = (
  state: LogState = initialState,
  action: Action,
): LogState => {
  if (action.type === 'SET_LOG_STREAMING') {
    const { projectId, projectInfo, incidentId, incidentInfo } = action.payload;
    let { streamingInfos, streamingIncidentInfos } = state;
    streamingInfos = {
      ...streamingInfos,
      [projectId]: projectInfo,
    };

    if (incidentId) {
      streamingIncidentInfos = {
        ...streamingIncidentInfos,
        [incidentId]: incidentInfo,
      };
    }

    return {
      ...state,
      streamingInfos,
      streamingIncidentInfos,
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
