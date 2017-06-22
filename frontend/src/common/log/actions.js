/* @flow */
import type { Action } from '../types';

export const loadLogFile = (
  projectId: ?string,
  incidentId: ?string,
  match: Object,
  params: ?Object,
  forceReload?: boolean,
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
  projectId: string,
  projectInfo: Object,
  incidentId: ?string,
  incidentInfo: ?Object,
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

export const loadLogStreamingList = (projectName: ?string, month: ?string): Action => ({
  type: 'LOAD_LOG_STREAMING_LIST',
  payload: {
    projectName,
    month,
  },
});

export const loadLogStreamingIncident = (
  projectName: String,
  month: String,
  incidentId: String,
  rareEventThreshold: String,
  derivedPvalue: String,
): Action => ({
  type: 'LOAD_LOG_STREAMING_INCIDENT',
  payload: {
    projectName,
    month,
    incidentId,
    rareEventThreshold,
    derivedPvalue,
  },
});

export const setLogStreaming = (info: Object): Action => ({
  type: 'SET_LOG_STREAMING',
  payload: {
    ...info,
  },
});

export const setLogStreaming1 = (
  projectId: string, projectInfo: Object, incidentId: ?string, incidentInfo: ?Object,
): Action => ({
  type: 'SET_LOG_STREAMING1',
  payload: {
    projectId,
    projectInfo,
    incidentId,
    incidentInfo,
  },
});

