/* @flow */
/* eslint-disable no-console */
import type { DashboardState, Action } from '../types';

const initialState: DashboardState = {
  detectedEvents: [],
  selectedProject: null,
  selectedGroup: null,
  startTime: null,
  endTime: null,
};

const reducer = (
  state: DashboardState = initialState,
  action: Action,
): DashboardState => {
  return { ...initialState, ...state };
};

export default reducer;
