/* @flow */
import type { Action } from '../types';

export const loadMetricHourlyEvents = (
  projectId: String,
  instanceGroup: String,
  startTime: String,
  endTime: String,
): Action => ({
  type: 'LOAD_METRIC_HOURLY_EVENTS',
  payload: {
    projectId, instanceGroup, startTime, endTime,
  },
});

export const loadMetricWeeklyAnomalies = (
  projectId: String,
  startTime: String,
  endTime: String,
): Action => ({
  type: 'LOAD_METRIC_WEEKLY_ANOMALIES',
  payload: {
    projectId, startTime, endTime,
  },
});

export const setMetricCurrentInfo = (
  info: Object,
): Action => ({
  type: 'SET_METRIC_CURRENT_INFO',
  payload: {
    ...info,
  },
});
