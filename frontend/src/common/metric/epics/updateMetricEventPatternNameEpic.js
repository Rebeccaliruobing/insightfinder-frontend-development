/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
***/

import { Observable } from 'rxjs/Observable';
import R from 'ramda';

import type { Deps } from '../../types';
import { postMetricEventPatternName } from '../../apis';
import { setLoadingComponents } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';

const updateMetricEventPatternNameEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('UPDATE_METRIC_EVENT_PATTERN_NAME').concatMap(action => {
    const state = getState();
    const { projectName, params, components } = action.payload;
    const { credentials } = state.auth;

    const apiAction$ = Observable.from(postMetricEventPatternName(credentials, projectName, params))
      .concatMap(() => {
        return Observable.empty();
      })
      .catch(err => {
        return apiEpicErrorHandle(err);
      });

    return Observable.concat(
      Observable.of(setLoadingComponents(components)),
      apiAction$,
      Observable.of(setLoadingComponents(R.mapObjIndexed(() => false, components))),
    );
  });

export default updateMetricEventPatternNameEpic;
