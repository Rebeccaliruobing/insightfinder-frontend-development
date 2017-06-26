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
import { get } from 'lodash';

import type { Deps } from '../../types';
import { loadProjectSettings, loadProjectModel } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setProjectSettings } from '../actions';

const loadProjectSettingsEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_SETTINGS').concatMap((action) => {
    const { projectName, setting, instanceGroup, startTime, endTime, force } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const { projects } = state.app;
    const projectSettingsParams = R.omit(['force'], action.payload);
    const prevProjectName = get(state.settings, 'projectSettingsParams.projectName');
    const prevProjectSettings = state.settings.projectSettings || {};
    const dateFormat = 'YYYY-MM-DD';

    console.log('epic called', action.payload);

    // The routing will guarantee the projectName is not empty, but we need
    // to check whether the projectName is a valid project.
    if (!R.find(p => p.projectName === projectName, projects)) {
      return Observable.concat(
        Observable.of(showAppLoader),
        Observable.of(
          setProjectSettings({
            projectSettings: {},
            projectSettingsParams,
            currentErrorMessage: appMessages.errorsProjectNotFound,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    }

    // There are two apis used to get project settings, one for modelsl, the other
    // is for other settings.
    // If setting is model, if projectName is changed, we need call all apis, otherwse
    // we just the model api. We also need call api to get project grouping.
    // If setting is not model, we can just call general api
    let apiAction$ = null;
    if (setting === 'model' && (force || projectName !== prevProjectName)) {
      // Call settings api first, and then model api, set the data when all APIs return.

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
    } else if (setting === 'episodeword' && (force || projectName !== prevProjectName)) {
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

    return Observable.concat(
      Observable.of(showAppLoader),
      Observable.of(
        setProjectSettings({
          currentErrorMessage: null,
          projectSettingsParams,
        }),
      ),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default loadProjectSettingsEpic;
