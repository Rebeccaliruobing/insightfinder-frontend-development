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

import { showAppAlert } from '../../app/actions';
import type { Deps } from '../../types';
import { pickProjectModel } from '../../apis';
import { apiEpicErrorHandle } from '../../errors';
import { settingsMessages } from '../messages';
import { loadProjectSettings } from '../actions';

const pickProjectModelEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('PICK_PROJECT_MODEL').concatMap((action) => {
    const state = getState();
    const { credentials } = state.auth;
    const { projectName, instanceGroup, modelKey, params } = action.payload;
    const models = get(state.settings, 'projectSettings.models', []);

    // Find the model with the key, if cannot find, just send warning message.
    const model = R.find(m => m.modelKey === modelKey, models);

    if (!model) {
      return Observable.of(showAppAlert('warn', settingsMessages.warnProjectModelNotExists));
    }

    const { startTimestamp, endTimestamp } = model;
    const modelKeyObj = { startTimestamp, endTimestamp, modelKey };

    return Observable.from(pickProjectModel(credentials, projectName, instanceGroup, modelKeyObj))
      .concatMap(() => {
        return Observable.concat(
          Observable.of(showAppAlert('info', settingsMessages.infoProjectModelPicked)),
          Observable.of(loadProjectSettings(projectName, params, true)),
        );
      })
      .catch((err) => {
        return apiEpicErrorHandle(err);
      });
  });

export default pickProjectModelEpic;
