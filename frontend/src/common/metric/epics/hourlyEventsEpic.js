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
import { loadHourlyEvents } from '../../apis';
import { setMetricCurrentInfo } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const hourlyEventsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_HOURLY_EVENTS').concatMap(action => {
    const { projectName, instanceGroup, startTime, endTime } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const projects = R.filter(p => p.isMetric, state.app.projects);
    const currentProject = R.find(p => p.projectName === projectName, projects);

    // If project is emtpy, or the project is not in the list, just return empty value.
    if (!projectName || !currentProject) {
      return Observable.concat(
        Observable.of(
          setMetricCurrentInfo({
            currentHourlyEvents: null,
            currentHourlyEventsLoading: false,
          }),
        ),
      );
    }

    return Observable.concat(
      Observable.of(
        setMetricCurrentInfo({
          currentHourlyEventsLoading: true,
        }),
      ),
      Observable.from(
        loadHourlyEvents(credentials, {
          projectName,
          instanceGroup,
          startTime,
          endTime,
          isStationary: currentProject.isStationary,
        }),
      )
        .concatMap(data => {
          return Observable.of(
            setMetricCurrentInfo({
              currentHourlyEvents: data,
            }),
          );
        })
        .catch(err => {
          return apiEpicErrorHandle(err);
        }),
      Observable.of(
        setMetricCurrentInfo({
          currentHourlyEventsLoading: false,
        }),
      ),
    );
  });

export default hourlyEventsEpic;
