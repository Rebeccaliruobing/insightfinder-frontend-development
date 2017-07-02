/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import 'rxjs';
import { combineEpics } from 'redux-observable';
import appEpics from './app/epics';
import authEpics from './auth/epics';
import metricEpics from './metric/epics';
import logEpics from './log/epics';
import settingsEpics from './settings/epics';
import usecaseEpics from './usecase/epics';

const epics = [
  ...appEpics,
  ...authEpics,
  ...metricEpics,
  ...logEpics,
  ...settingsEpics,
  ...usecaseEpics,
];

const configureEpics = deps => (action$, { getState }) =>
  combineEpics(...epics)(action$, {
    ...deps,
    getState,
  });

export default configureEpics;
