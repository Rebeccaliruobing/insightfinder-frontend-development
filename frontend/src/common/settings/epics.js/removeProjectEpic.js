/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { Observable } from 'rxjs/Observable';
import R from 'ramda';

import type { Deps } from '../../types';
import { appMessages } from '../../app/messages';
import { loadProjectList, showAppAlert } from '../../app/actions';
import { deleteProject } from '../../apis';
import { settingsMessages } from '../messages';
import { apiEpicErrorHandle } from '../../errors';

const removeProjectEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('REMOVE_PROJECT').concatMap((action) => {
    const state = getState();

    const { credentials } = state.auth;
    const { projectName } = action.payload;
    const { projects } = state.app;

    const project = R.find(p => p.projectName === projectName, projects);
    if (!project) {
      return Observable.of(showAppAlert('error', appMessages.errorsProjectNotFound));
    }

    return Observable.from(deleteProject(credentials, projectName))
      .concatMap(() => {
        return Observable.concat(
          Observable.of(showAppAlert('info', settingsMessages.infoProjectlRemoved)),
          Observable.of(loadProjectList()),
        );
      })
      .catch((err) => {
        return apiEpicErrorHandle(err);
      });
  });

export default removeProjectEpic;
