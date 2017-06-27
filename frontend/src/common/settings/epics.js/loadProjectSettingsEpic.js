/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import R from 'ramda';

import type { Deps } from '../../types';
import { loadProjectSettings, loadProjectModel } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setProjectSettings } from '../actions';

const loadProjectSettingsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_SETTINGS').concatMap((action) => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const dateFormat = 'YYYY-MM-DD';

    const state = getState();
    const { projectName, params, force } = action.payload;
    const { credentials } = state.auth;
    const { projects } = state.app;
    const { setting, instanceGroup, startTime, endTime } = params;

    const projectSettingsParams = pickNotNil({ projectName, ...params });

    const prevProjectSettingsParams = state.settings.projectSettingsParams || {};

    console.log('epic called', action.payload);

    let currentErrorMessage = null;
    let apiAction$ = null;

    // If force or project changed, we need to reload the setting and reset the stored
    // settings.
    const refresh = force || projectName !== prevProjectSettingsParams.projectName;
    const prevProjectSettings = refresh ? {} : (state.settings.projectSettings || {});

    if (!R.find(p => p.projectName === projectName, projects)) {
      // The routing will guarantee the projectName is not empty, but we need
      // to check whether the projectName is a valid project. If invalid, set
      // error and clean the current settings.

      currentErrorMessage = appMessages.errorsProjectNotFound;
      apiAction$ = Observable.of(setProjectSettings({ projectSettings: {} }));
    } else if (refresh && setting === 'model') {
      // reload

      apiAction$ = Observable.from(loadProjectSettings(credentials, { projectName }))
        .concatMap((settingsData) => {
          return Observable.from(
            loadProjectModel(credentials, {
              projectName,
              instanceGroup,
              startTime: moment(startTime, dateFormat).valueOf(),
              endTime: moment(endTime, dateFormat).valueOf(),
            }),
          )
            .concatMap((modelData) => {
              // Project changed, so we reset all settings.
              return Observable.of(
                setProjectSettings({
                  projectSettings: { ...settingsData.data, ...modelData.data },
                }),
              );
            })
            .catch((err) => {
              // TODO: API error, ignore it now.
              return Observable.of(
                setProjectSettings({
                  projectSettings: { ...prevProjectSettings, ...settingsData.data },
                }),
              );
              // return apiEpicErrorHandle(err);
            });
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    } else if (
      setting === 'episodeword' && (force || projectName !== prevProjectSettingsParams.projectName)
    ) {
      apiAction$ = Observable.empty();
      // Load log project episodes and words
    } else if (setting === 'model') {
      // Call model API only, as the settings already exists.
      apiAction$ = Observable.from(
        loadProjectModel(credentials, {
          projectName,
          instanceGroup,
          startTime: moment(startTime, dateFormat).valueOf(),
          endTime: moment(endTime, dateFormat).valueOf(),
        }),
      )
        .concatMap((modelData) => {
          // Project not changed, only load model, so needs keep other settings.
          return Observable.of(
            setProjectSettings({
              projectSettings: { ...prevProjectSettings, ...modelData.data },
            }),
          );
        })
        .catch((err) => {
          // TODO: API error, ignore it now.
          return Observable.empty();
          // return apiEpicErrorHandle(err);
        });
    } else {
      apiAction$ = Observable.from(loadProjectSettings(credentials, { projectName }))
        .concatMap((settingsData) => {
          // Reset all settings.
          return Observable.of(setProjectSettings({ projectSettings: { ...settingsData.data } }));
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    }

    // Return the general sequence for all API calls.
    return Observable.concat(
      Observable.of(showAppLoader),
      Observable.of(setProjectSettings({ currentErrorMessage, projectSettingsParams })),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default loadProjectSettingsEpic;
