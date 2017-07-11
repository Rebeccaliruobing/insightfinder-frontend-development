/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */

import { Observable } from 'rxjs/Observable';
import R from 'ramda';

import type { Deps } from '../../types';
import { getLoaderEpicAction } from '../../utils';
import { getProjectGroupList, getMetricEventList } from '../../apis';
import { setMetricEventSummary } from '../actions';
import { setProjectGroupList } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';

const loadMetricEventSummaryEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_EVENT_SUMMARY').concatMap(action => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const { projectName, instanceGroup, params, force, loader } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const { currentProjectName } = state.app;

    const { view, ...rest } = params;
    const { startTime, endTime } = rest;
    const viewParams = pickNotNil({ projectName, instanceGroup, ...rest });
    const { showLoader, hideLoader } = getLoaderEpicAction(loader);

    const eventType = view;

    // Reset view if force
    let resetView = Observable.empty();
    if (force) {
      resetView = Observable.of(
        setMetricEventSummary(view === 'detected' ? 'predicted' : 'detected'),
      );
    }

    // Check whether we need load group for current project
    let apiAction$ = Observable.empty();
    if (projectName !== currentProjectName) {
      apiAction$ = Observable.from(getProjectGroupList(credentials, projectName))
        .concatMap(d => {
          return Observable.concat(
            Observable.of(setProjectGroupList(projectName, d.data.groups)),
            Observable.from(
              getMetricEventList(credentials, projectName, instanceGroup, eventType, {
                startTime,
                endTime,
              }),
            )
              .concatMap(d => Observable.of(setMetricEventSummary(view, viewParams, d.data)))
              .catch(err => apiEpicErrorHandle(err)),
          );
        })
        .catch(err => apiEpicErrorHandle(err));
    } else {
      apiAction$ = Observable.from(
        getMetricEventList(credentials, projectName, instanceGroup, eventType, {
          startTime,
          endTime,
        }),
      )
        .concatMap(d => Observable.of(setMetricEventSummary(view, viewParams, d.data)))
        .catch(err => apiEpicErrorHandle(err));
    }

    return Observable.concat(
      showLoader,
      resetView,
      Observable.of(setMetricEventSummary(view, viewParams)),
      apiAction$,
      hideLoader,
    );
  });

export default loadMetricEventSummaryEpic;
