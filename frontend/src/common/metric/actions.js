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
    projectName, instanceGroup, startTime, endTime,
  },
});

export const loadMetricWeeklyAnomalies = (
  projectName: String,
  startTime: String,
  endTime: String,
): Action => ({
  type: 'LOAD_METRIC_WEEKLY_ANOMALIES',
  payload: {
    projectName, startTime, endTime,
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
