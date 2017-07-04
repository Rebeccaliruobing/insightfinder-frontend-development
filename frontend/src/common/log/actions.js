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
 * Select the pattern in the view. Handled by reducer.
 */
export const selectLogPattern = (view: String, patternId: String): Action => ({
  type: 'SELECT_LOG_PATTERN',
  payload: { view, patternId },
});

export const selectLogPatternSequence = (view: String, sequenceId: String): Action => ({
  type: 'SELECT_LOG_PATTERN_SEQUENCE',
  payload: { view, sequenceId },
});

/**
 * Load the events based on condition and store at the related storePath.
 */
export const loadLogEventList = (
  projectName: String,
  view: String,
  params: Object,
  components: Object,
): Action => ({
  type: 'LOAD_LOG_EVENTLIST',
  payload: { projectName, view, params, components },
});

export const loadLogSequenceEventList = (
  projectName: String,
  view: String,
  params: Object,
  components: Object,
): Action => ({
  type: 'LOAD_LOG_SEQUENCE_EVENTLIST',
  payload: { projectName, view, params, components },
});

/**
 * Rerun the log detection.
 */
export const rerunLogDetection = (projectName: String, incidentId: String): Action => ({
  type: 'RERUN_LOG_DETECTION',
  payload: { projectName, incidentId },
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
  payload: { projectId, incidentId, match, params, forceReload },
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
