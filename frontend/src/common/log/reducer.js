/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';

import type { LogState, Action } from '../types';

const initialState: LogState = {
  fileInfos: {},
  fileIncidentInfos: {},
  streamingInfos: [],
  streamingInfosParams: {},
  streamingIncidentInfo: {},
  streamingIncidentInfoParams: {},
  streamingErrorMessage: null,

  incidentList: [],
  incidentListParams: {},
  incident: {},
  incidentParams: {},
  currentError: null,
  viewsState: {},
};

const reducer = (state: LogState = initialState, action: Action): LogState => {
  if (action.type === 'SET_LOG_INFO') {
    const info = action.payload;
    if (R.isNil(info)) {
      return state;
    }
    return {
      ...state,
      ...info,
    };
  } else if (action.type === 'SELECT_LOG_PATTERN') {
    let { viewsState } = state;
    const { view, patternId } = action.payload;
    if (Boolean(view) && Boolean(patternId)) {
      // Set the current pattern id, and reset the event list.
      viewsState = {
        ...viewsState,
        [view]: {
          currentPatternId: patternId,
          currentEventList: [],
        },
      };
      return { ...state, viewsState };
    }
    return state;
  } else if (action.type === 'SELECT_LOG_PATTERN_SEQUENCE') {
    let { viewsState } = state;
    const { view, sequenceId } = action.payload;
    if (Boolean(view) && Boolean(sequenceId)) {
      viewsState = {
        ...viewsState,
        [view]: {
          currentSequenceId: sequenceId,
          currentEventList: [],
        },
      };
      return { ...state, viewsState };
    }
    return state;
  } else if (action.type === 'SET_LOG_STREAMING1') {
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
  } else if (action.type === 'SET_LOG_STREAMING') {
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
