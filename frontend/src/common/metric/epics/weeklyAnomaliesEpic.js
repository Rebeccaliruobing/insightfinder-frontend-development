/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';
import { loadWeeklyAnomalies } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { setMetricCurrentInfo } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const weeklyAnomaliesEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_WEEKLY_ANOMALIES')
    .concatMap((action) => {
      const { projectId, startTime, endTime } = action.payload;
      const state = getState();
      const { credentials } = state.auth;

      // If projectId is emtpy, return a emtpy data.
      if (!projectId) {
        return Observable.concat(
          Observable.of(setMetricCurrentInfo({
            currentWeeklyAnomalies: {},
          })),
          Observable.of(hideAppLoader()),
        );
      }

      return Observable.concat(
        Observable.of(showAppLoader()),
        Observable
          .from(loadWeeklyAnomalies(credentials, {
            projectId, startTime, endTime,
          }))
          .concatMap((data) => {
            return Observable.of(setMetricCurrentInfo({
              currentWeeklyAnomalies: data,
            }));
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(hideAppLoader()),
      );
    });

export default weeklyAnomaliesEpic;
