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
import { newExternalService } from '../../apis';
import { apiEpicErrorHandle } from '../../errors';
import { showAppAlert, setLoadingComponents } from '../../app/actions';
import { loadExternalServiceList } from '../actions';
import { settingsMessages } from '../messages';

const addExternalServiceEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('ADD_EXTERNAL_SERVICE').concatMap(action => {
    const state = getState();
    const { credentials } = state.auth;
    const { type, params, components } = action.payload;

    return Observable.concat(
      Observable.of(setLoadingComponents(components)),
      Observable.from(newExternalService(credentials, type, params))
        .concatMap(() => {
          return Observable.of(showAppAlert('info', settingsMessages.infoExternalServcieAdded));
        })
        .catch(err => {
          return apiEpicErrorHandle(err);
        }),
      // Reset all loading components' status.
      Observable.of(setLoadingComponents(R.mapObjIndexed(() => false, components))),
      // Reload the list
      Observable.of(loadExternalServiceList()),
    );
  });

export default addExternalServiceEpic;
