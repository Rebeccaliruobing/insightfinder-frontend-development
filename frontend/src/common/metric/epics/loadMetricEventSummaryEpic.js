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
import { setMetricEventSummary } from '../actions';

const loadMetricEventSummaryEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_METRIC_EVENT_SUMMARY').concatMap(action => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const { projectName, params, loader } = action.payload;
    const state = getState();
    const { view, ...rest } = params;
    const viewParams = pickNotNil({ projectName, ...rest });
    const { credentials } = state.auth;

    const { showLoader, hideLoader } = getLoaderEpicAction(loader);

    console.log(credentials, projectName);

    return Observable.concat(
      showLoader,
      Observable.of(setMetricEventSummary(view, viewParams, [])),
      hideLoader,
    );
  });

export default loadMetricEventSummaryEpic;
