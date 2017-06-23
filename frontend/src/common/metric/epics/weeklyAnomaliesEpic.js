/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */

import { Observable } from 'rxjs/Observable';
import R from 'ramda';
import type { Deps } from '../../types';
import { loadWeeklyAnomalies } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { appMessages } from '../../app/messages';
import { setMetricCurrentInfo } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const weeklyAnomaliesEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_WEEKLY_ANOMALIES').concatMap((action) => {
    const { projectName, startTime, endTime } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const projects = R.filter(p => p.isMetric, state.app.projects);

    // For this epic, it needs to handle the project empty, non exist cases.
    // It needs to set the error message, remove project.

    // When projectName empty, which also means there is no project to auto select.
    // So we need to show message to help user create project.
    if (!projectName) {
      return Observable.concat(
        Observable.of(
          setMetricCurrentInfo({
            currentWeeklyAnomalies: null,
            currentErrorMessage: appMessages.errorsNoMetricProject,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    } else if (!R.find(p => p.projectName === projectName, projects)) {
      return Observable.concat(
        Observable.of(
          setMetricCurrentInfo({
            currentWeeklyAnomalies: null,
            currentErrorMessage: appMessages.errorsProjectNotFound,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    }

    return Observable.concat(
      Observable.of(setMetricCurrentInfo({ currentErrorMessage: null })),
      Observable.of(showAppLoader()),
      Observable.from(
        loadWeeklyAnomalies(credentials, {
          projectName,
          startTime,
          endTime,
        }),
      )
        .concatMap((data) => {
          return Observable.of(
            setMetricCurrentInfo({
              currentErrorMessage: null,
              currentWeeklyAnomalies: data.data,
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        }),
      Observable.of(hideAppLoader()),
    );
  });

export default weeklyAnomaliesEpic;
