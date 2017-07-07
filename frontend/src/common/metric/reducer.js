/* @flow */
/* eslint-disable no-console */
import type { MetricState, Action } from '../types';

const initialState: MetricState = {
  currentHourlyEvents: null,
  currentHourlyEventsLoading: false,
  currentWeeklyAnomalies: null,
  currentErrorMessage: null,

  mainError: null,
  eventSummary: {},
  eventSummaryParams: {},
};

const reducer = (state: MetricState = initialState, action: Action): MetricState => {
  if (action.type === 'SET_METRIC_CURRENT_INFO') {
    return {
      ...state,
      ...action.payload,
    };
  } else if (action.type === 'SET_METRIC_EVENT_SUMMARY') {
    const { view, params, info } = action.payload;
    const { eventSummaryParams, eventSummary } = state;

    return {
      ...state,
      eventSummaryParams: {
        ...eventSummaryParams,
        [view]: params,
      },
      eventSummary: {
        ...eventSummary,
        [view]: info,
      },
    };
  }
  return { ...initialState, ...state };
};

export default reducer;
