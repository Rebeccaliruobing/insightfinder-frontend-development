/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import R from 'ramda';
import { get } from 'lodash';
import type { Deps } from '../../types';
import { postLogPatternName } from '../../apis';
import { setLoadingComponents } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogInfo } from '../actions';

const setPatternNameEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('SET_LOG_PATTERN_NAME').concatMap(action => {
    const state = getState();
    const { projectName, view, patternId, incidentId, patternName, components } = action.payload;
    const { credentials } = state.auth;

    const apiAction$ = Observable.from(
      postLogPatternName(credentials, projectName, { incidentId, patternId, patternName }),
    )
      .concatMap(d => {
        console.log(d);
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

export default setPatternNameEpic;
