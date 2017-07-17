/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { Observable } from 'rxjs/Observable';

import type { Deps } from '../../types';
import { setProjectCreationStatus } from '../actions';
import { loadProjectList } from '../../app/actions';
import {
  newAWSCloudWatchProject,
  newCustomProject,
  newDataDogProject,
  newGoogleProject,
  newNewRelicProject,
} from '../../apis';
import { apiEpicErrorHandle } from '../../errors';

const createProjectEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('CREATE_PROJECT').concatMap(action => {
    const state = getState();

    const { credentials } = state.auth;
    const { projectName, projectType, params } = action.payload;

    let api = Observable.empty();

    if (projectType === 'AWSCloudWatch') {
      api = newAWSCloudWatchProject(credentials, projectName, params);
    } else if (projectType === 'InsightAgent') {
      api = newCustomProject(credentials, projectName, params);
    } else if (projectType === 'DataDog') {
      api = newDataDogProject(credentials, projectName, params);
    } else if (projectType === 'Google') {
      api = newGoogleProject(credentials, projectName, params);
    } else if (projectType === 'NewRelic') {
      api = newNewRelicProject(credentials, projectName, params);
    }

    return Observable.from(api)
      .concatMap(() => {
        return Observable.concat(
          Observable.of(loadProjectList()),
          Observable.of(setProjectCreationStatus('success')),
        );
      })
      .catch(err => {
        return Observable.concat(
          Observable.of(loadProjectList()),
          apiEpicErrorHandle(err),
          Observable.of(setProjectCreationStatus('failed')),
        );
      });
  });

export default createProjectEpic;
