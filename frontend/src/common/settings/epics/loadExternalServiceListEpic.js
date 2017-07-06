/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';

import type { Deps } from '../../types';
import { getExternalServiceList } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setSettingsInfo } from '../actions';

const loadExternalServiceListEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_EXTERNAL_SERVICE_LIST').concatMap(() => {
    const state = getState();
    const { credentials } = state.auth;

    const apiAction$ = Observable.from(getExternalServiceList(credentials))
      .concatMap(d => {
        return Observable.of(setSettingsInfo({ externalServiceList: d.data }));
      })
      .catch(err => {
        return apiEpicErrorHandle(err);
      });

    return Observable.concat(
      Observable.of(showAppLoader),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default loadExternalServiceListEpic;
