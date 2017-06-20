/* @flow */
/* eslint-disable no-console */
import type { MetricState, Action } from '../types';

const initialState: MetricState = {
  currentHourlyEvents: null,
  currentHourlyEventsLoading: false,
  currentWeeklyAnomalies: null,
  currentErrorMessage: null,
};

const reducer = (
  state: MetricState = initialState,
  action: Action,
): MetricState => {
  if (action.type === 'SET_METRIC_CURRENT_INFO') {
    return {
      ...state,
      ...action.payload,
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
