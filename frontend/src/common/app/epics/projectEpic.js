/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { Observable } from 'rxjs/Observable';

import type { Deps } from '../../types';
import { getProjectList } from '../../apis';
import { setProjectList, setInitData } from '../actions';
import { apiEpicErrorHandle } from '../../errors';

const projectEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_PROJECT_LIST').concatMap(() => {
    const state = getState();
    const { credentials } = state.auth;

    return Observable.from(getProjectList(credentials))
      .concatMap(d => {
        return Observable.concat(
          Observable.of(setInitData({ defaultTimezone: d.data.defaultTimezone })),
          Observable.of(setProjectList(d.data.projects)),
        );
      })
      .catch(err => {
        return apiEpicErrorHandle(err);
      });
  });

export default projectEpic;
