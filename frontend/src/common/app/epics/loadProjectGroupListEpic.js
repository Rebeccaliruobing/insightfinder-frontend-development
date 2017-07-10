/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */

import { Observable } from 'rxjs/Observable';

import type { Deps } from '../../types';
import { getProjectGroupList } from '../../apis';
import { getLoaderEpicAction } from '../../utils';
import { setProjectGroupList } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const loadProjectGroupListEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_GROUP_LIST').concatMap(action => {
    const { projectName, loader } = action.payload;
    const state = getState();
    const { credentials } = state.auth;

    const { showLoader, hideLoader } = getLoaderEpicAction(loader);
    const apiAction$ = Observable.from(getProjectGroupList(credentials, projectName))
      .concatMap(d => Observable.of(setProjectGroupList(projectName, d.data.groups)))
      .catch(err => apiEpicErrorHandle(err));

    return Observable.concat(
      showLoader,
      Observable.of(setProjectGroupList(projectName)),
      apiAction$,
      hideLoader,
    );
  });

export default loadProjectGroupListEpic;
