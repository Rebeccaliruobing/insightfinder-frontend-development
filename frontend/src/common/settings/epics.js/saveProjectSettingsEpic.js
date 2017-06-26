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
import { saveProjectSettings } from '../../apis';
import { apiEpicErrorHandle } from '../../errors';
import { setLoadingComponents, loadProjectSettings } from '../actions';

const saveProjectSettingsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('SAVE_PROJECT_SETTINGS').concatMap((action) => {
    const state = getState();
    const { credentials } = state.auth;
    const { projectName, ...params } = state.settings.projectSettingsParams;
    const { settings, components } = action.payload;

    console.log('save epic', state, action.payload);
    // TODO: Based on the settings, call different API to check settings.
    return Observable.concat(
      Observable.of(setLoadingComponents(components)),
      Observable.from(saveProjectSettings(credentials, projectName, settings))
        .concatMap(() => {
          // The response must be sucess, otherwise it will throw error.
          return Observable.empty();
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        }),
      // Reset all loading components' status.
      Observable.of(setLoadingComponents(R.mapObjIndexed(() => false, components))),
      // Reload the settings
      Observable.of(loadProjectSettings(projectName, params, true)),
    );
  });

export default saveProjectSettingsEpic;
