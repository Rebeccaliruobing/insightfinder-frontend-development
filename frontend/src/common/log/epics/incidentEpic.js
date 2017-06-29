/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import R from 'ramda';
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';
import {
  loadLogRareEventList,
  loadLogFrequencyAnomalyList,
  loadLogClusterList,
  loadLogPatternSequenceList,
} from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogInfo } from '../actions';

const viewApis = {
  rare: loadLogRareEventList,
  cluster: loadLogClusterList,
  freq: loadLogFrequencyAnomalyList,
  seq: loadLogPatternSequenceList,
};

const incidentEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_INCIDENT').concatMap((action) => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));

    const state = getState();
    const { credentials } = state.auth;
    const { incident } = state.log;
    const { projectName, params } = action.payload;
    const { view } = params;
    const incidentParams = pickNotNil({ projectName, ...params });

    // The data for each view is stored in incident, we might reuse
    // the existing data if we params are same, but now we just reload
    // the data everytime.
    const apiFunc = viewApis[view];

    // Add more params which can get from project info.
    // TODO: Get logFreqWindow from project info.
    const apiAction$ = Observable.from(
      apiFunc(credentials, projectName, { ...params, logFreqWindow: 10 * 60 * 1000 }),
    )
      .concatMap((d) => {
        return Observable.of(setLogInfo({ incident: { ...incident, [view]: d.data } }));
      })
      .catch((err) => {
        return apiEpicErrorHandle(err);
      });

    return Observable.concat(
      Observable.of(setLogInfo({ currentError: null, incidentParams })),
      Observable.of(showAppLoader()),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default incidentEpic;
