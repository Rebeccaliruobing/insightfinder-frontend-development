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
import { deleteExternalService } from '../../apis';
import { apiEpicErrorHandle } from '../../errors';
import { setSettingsInfo, loadExternalServiceList } from '../actions';

const removeExternalServiceEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('REMOVE_EXTERNAL_SERVICE').concatMap(action => {
    const state = getState();
    const { credentials } = state.auth;
    let { externalServiceList } = state.settings;
    const { serviceId } = action.payload;

    // Set the status to removing.
    externalServiceList = R.map(extsvc => {
      if (extsvc.id === serviceId) {
        return { ...extsvc, status: 'removing' };
      }
      return extsvc;
    }, externalServiceList);

    const apiAction$ = Observable.from(deleteExternalService(credentials, serviceId))
      .concatMap(() => Observable.empty())
      .catch(err => {
        return apiEpicErrorHandle(err);
      });

    // Reload the external list if error or success.
    return Observable.concat(
      Observable.of(setSettingsInfo({ externalServiceList })),
      apiAction$,
      Observable.of(loadExternalServiceList()),
    );
  });

export default removeExternalServiceEpic;
