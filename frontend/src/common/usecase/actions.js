/* @flow */
import type { Action } from '../types';

export const loadBugRepository = (
): Action => ({
  type: 'LOAD_BUG_REPOSITORY',
  payload: {},
});

export const setBugRepository = (
  bugRepository: Object,
): Action => ({
  type: 'SET_BUG_REPOSITORY',
  payload: {
    bugRepository,
  },
});
