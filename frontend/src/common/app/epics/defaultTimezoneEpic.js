/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
***/

import { Observable } from 'rxjs/Observable';
import R from 'ramda';

import type { Deps } from '../../types';
import { postDefaultTimezone } from '../../apis';
import { setDefaultTimezone, setLoadingComponents } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const defaultTimezoneEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('UPDATE_DEFAULT_TIMEZONE').concatMap(action => {
    const state = getState();
    const { defaultTimezone, components } = action.payload;
    const { credentials } = state.auth;

    const apiAction$ = Observable.from(postDefaultTimezone(credentials, defaultTimezone))
      .concatMap(() => {
        return Observable.of(setDefaultTimezone(defaultTimezone));
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

export default defaultTimezoneEpic;
