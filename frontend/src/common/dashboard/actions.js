/* @flow */
import type { Action } from '../types';

export const loadDashboardData = (
  projectId: ?string, groupId: ?string,
): Action => ({
  type: 'LOAD_DASHBOARD_DATA',
  payload: {
    projectId,
    groupId,
  },
});
