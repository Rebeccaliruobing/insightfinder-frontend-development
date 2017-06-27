/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import { get } from 'lodash';
import R from 'ramda';

import type { Deps } from '../../types';
import { loadProjectSettings, loadProjectModel, loadProjectEpisodeWord, loadProjectGroupList } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setProjectSettings, setSettingsApisParams } from '../actions';

const loadProjectSettingsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_SETTINGS').concatMap((action) => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const ifIn = (i, items) => items.indexOf(i) !== -1;
    const dateFormat = 'YYYY-MM-DD';
    const apisParamsKey = 'project';

    const state = getState();
    const { projectName, params, force } = action.payload;
    const { credentials } = state.auth;
    const { projects } = state.app;
    const { setting, instanceGroup, startTime, endTime } = params;

    // Different setting uses different API, if the setting are using the same API,
    // we should not call the same API when setting changed. So we store the params
    // for each API, and compare with the current params individually.
    //
    // Meanwhile, we also need to support refresh.
    const projectSettingsParams = pickNotNil({ projectName, ...params });
    const prevProjectSettingsParams = state.settings.projectSettingsParams || {};

    const settingApiParamsKey = ifIn(setting, ['model', 'episodeword']) ? setting : 'general';
    const prevCurrentApisParams = get(state.settings.currentApisParams, apisParamsKey, {});
    const prevSettingApiParams = get(prevCurrentApisParams, settingApiParamsKey, {});

    // Get the Api params for the current setting's api.
    let settingApiParams = { projectName };
    if (setting === 'model') {
      settingApiParams = pickNotNil({ projectName, instanceGroup, startTime, endTime });
    }

    let currentApisParams = { [settingApiParamsKey]: settingApiParams };
    const refresh = force || projectName !== prevProjectSettingsParams.projectName;
    let settingReload = refresh;
    if (!refresh) {
      settingReload = !R.equals(prevSettingApiParams, settingApiParams);
      currentApisParams = { ...prevCurrentApisParams, ...currentApisParams };
    }

    let currentErrorMessage = null;
    let apiAction$ = null;

    // If refresh, reset all project settings.
    let prevProjectSettings = state.settings.projectSettings || {};
    let projectGroups = state.settings.projectGroups || [];
    let grouplistAction$ = Observable.empty();
    if (refresh) {
      prevProjectSettings = {};
      projectGroups = [];
      grouplistAction$ = Observable.from(loadProjectGroupList(credentials, projectName))
        .concatMap((d) => {
          return Observable.of(setProjectSettings({ projectGroups: d.data.groups }));
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    }

    if (!R.find(p => p.projectName === projectName, projects)) {
      // The routing will guarantee the projectName is not empty, but we need
      // to check whether the projectName is a valid project. If invalid, set
      // error and clean the current settings.

      currentErrorMessage = appMessages.errorsProjectNotFound;
      apiAction$ = Observable.of(setProjectSettings({ projectSettings: {} }));
    } else if (settingReload && setting === 'model') {
      apiAction$ = Observable.from(
        loadProjectModel(credentials, projectName, {
          instanceGroup,
          modelStartTime: moment(startTime, dateFormat).valueOf(),
          modelEndTime: moment(endTime, dateFormat).valueOf(),
        }),
      )
        .concatMap((d) => {
          return Observable.of(
            setProjectSettings({
              projectSettings: { ...prevProjectSettings, ...d.data },
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    } else if (settingReload && setting === 'episodeword') {
      apiAction$ = Observable.from(loadProjectEpisodeWord(credentials, projectName))
        .concatMap((d) => {
          return Observable.of(
            setProjectSettings({
              projectSettings: { ...prevProjectSettings, ...d.data },
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    } else if (settingReload) {
      apiAction$ = Observable.from(loadProjectSettings(credentials, { projectName }))
        .concatMap((d) => {
          // Reset all settings.
          return Observable.of(
            setProjectSettings({
              projectSettings: { ...prevProjectSettings, ...d.data },
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    } else {
      apiAction$ = Observable.empty();
    }

    // Return the general sequence for all API calls.
    return Observable.concat(
      Observable.of(showAppLoader),
      Observable.of(setProjectSettings({ projectGroups, currentErrorMessage, projectSettingsParams })),
      Observable.of(setSettingsApisParams(apisParamsKey, currentApisParams)),
      grouplistAction$,
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default loadProjectSettingsEpic;
