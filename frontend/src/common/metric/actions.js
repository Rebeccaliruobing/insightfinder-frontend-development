/* @flow */
import type { Action } from '../types';

export const loadMetricHourlyEvents = (
  projectName: String,
  instanceGroup: String,
  startTime: String,
  endTime: String,
): Action => ({
  type: 'LOAD_METRIC_HOURLY_EVENTS',
  payload: {
    projectName,
    instanceGroup,
    startTime,
    endTime,
  },
});

export const loadMetricWeeklyAnomalies = (
  projectName: String,
  startTime: String,
  endTime: String,
): Action => ({
  type: 'LOAD_METRIC_WEEKLY_ANOMALIES',
  payload: {
    projectName,
    startTime,
    endTime,
  },
});

export const setMetricCurrentInfo = (info: Object): Action => ({
  type: 'SET_METRIC_CURRENT_INFO',
  payload: {
    ...info,
  },
});

/**
 * Set the metric event summary related data with specified view. This is handled by reducer.
 */
export const setMetricEventSummary = (view: String, params: Object, info: any): Action => ({
  type: 'SET_METRIC_EVENT_SUMMARY',
  payload: { view, params, info },
});

/**
 * Load metric event summary for project
 */
export const loadMetricEventSummary = (
  projectName: String,
  instanceGroup: String,
  params: Object,
  force: Boolean = false,
  loader: any = true,
): Action => ({
  type: 'LOAD_METRIC_EVENT_SUMMARY',
  payload: { projectName, instanceGroup, params, force, loader },
});
