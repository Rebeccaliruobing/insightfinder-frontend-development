/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Action } from '../types';

/**
 * Action used to load log incident list, handled by epic.
 */
export const loadLogIncidentList = (
  projectName: String,
  params: Object,
  force: Boolean,
): Action => ({
  type: 'LOAD_LOG_INCIDENT_LIST',
  payload: { projectName, params, force },
});

/**
 * Action used to load one log incident, handled by epic.
 */
export const loadLogIncident = (projectName: String, params: Object, force: Boolean): Action => ({
  type: 'LOAD_LOG_INCIDENT',
  payload: {
    projectName,
    params,
    force,
  },
});

/**
 * This action will set the log state, it's handled by reducer.
 */
export const setLogInfo = (info: Object): Action => ({
  type: 'SET_LOG_INFO',
  payload: info,
});

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
  projectId: ?string,
  month: ?string,
  incidentId: ?string,
  match: Object,
  params: ?Object,
  forceReload?: boolean,
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
  incidentId: String,
  view: String,
): Action => ({
  type: 'LOAD_LOG_STREAMING_INCIDENT',
  payload: {
    projectName,
    incidentId,
    view,
  },
});

export const setLogStreaming = (info: Object): Action => ({
  type: 'SET_LOG_STREAMING',
  payload: {
    ...info,
  },
});

export const setLogStreaming1 = (
  projectId: string,
  projectInfo: Object,
  incidentId: ?string,
  incidentInfo: ?Object,
): Action => ({
  type: 'SET_LOG_STREAMING1',
  payload: {
    projectId,
    projectInfo,
    incidentId,
    incidentInfo,
  },
});
