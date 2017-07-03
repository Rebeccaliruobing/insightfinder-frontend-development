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

import { showAppAlert } from '../../app/actions';
import type { Deps } from '../../types';
import { updateProjectModel } from '../../apis';
import { apiEpicErrorHandle } from '../../errors';
import { settingsMessages } from '../messages';
import { loadProjectSettings } from '../actions';

const pickProjectModelEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('PICK_PROJECT_MODEL').concatMap((action) => {
    const dateFormat = 'YYYY-MM-DD';

    const state = getState();
    const { credentials } = state.auth;
    const { projectName, modelKey, params } = action.payload;
    const { instanceGroup, startTime, endTime } = params;
    const models = get(state.settings, 'projectSettings.models', []);

    // Find the model with the key, if cannot find, just send warning message.
    const model = R.find(m => m.modelKey === modelKey, models);

    if (!model) {
      return Observable.of(showAppAlert('warn', settingsMessages.warnProjectModelNotExists));
    }

    const { startTimestamp, endTimestamp } = model;
    const modelKeyObj = { startTimestamp, endTimestamp, modelKey };

    return Observable.from(
      updateProjectModel(
        credentials,
        projectName,
        {
          instanceGroup,
          modelStartTime: moment(startTime, dateFormat).valueOf(),
          modelEndTime: moment(endTime, dateFormat).valueOf(),
        },
        modelKeyObj,
      ),
    )
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
