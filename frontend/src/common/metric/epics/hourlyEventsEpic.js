/* @flow */
/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';
import { loadHourlyEvents } from '../../apis';
import { setMetricCurrentInfo } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const hourlyEventsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_HOURLY_EVENTS')
    .concatMap((action) => {
      const { projectId, instanceGroup, startTime, endTime } = action.payload;
      const state = getState();
      const { credentials } = state.auth;

      // If projectId is emtpy, return a emtpy data.
      if (!projectId) {
        return Observable.concat(
          Observable.of(setMetricCurrentInfo({
            currentHourlyEvents: {},
            currentHourlyEventsLoading: false,
          })),
        );
      }

      return Observable.concat(
        Observable.of(setMetricCurrentInfo({
          currentHourlyEventsLoading: true,
        })),
        Observable
          .from(loadHourlyEvents(credentials, {
            projectId, instanceGroup, startTime, endTime,
          }))
          .concatMap((data) => {
            return Observable.of(setMetricCurrentInfo({
              currentHourlyEvents: data,
            }));
          })
          .catch((err) => {
            return apiEpicErrorHandle(err);
          }),
        Observable.of(setMetricCurrentInfo({
          currentHourlyEventsLoading: false,
        })),
      );
    });

export default hourlyEventsEpic;
