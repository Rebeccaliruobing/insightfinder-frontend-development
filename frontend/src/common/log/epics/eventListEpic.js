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
import type { Deps } from '../../types';
import { loadLogEventList } from '../../apis';
import { setLoadingComponents } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogInfo } from '../actions';

const logEventListEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_EVENTLIST').concatMap((action) => {
    const state = getState();
    const { projectName, view, params, components } = action.payload;
    const { credentials } = state.auth;

    const viewsState = state.log.viewsState || {};

    const apiAction$ = Observable.from(loadLogEventList(credentials, projectName, params))
      .concatMap((d) => {
        return Observable.of(
          setLogInfo({
            viewsState: {
              ...viewsState,
              [view]: {
                ...get(viewsState, view, {}),
                currentEventList: d.data,
              },
            },
          }),
        );
      })
      .catch((err) => {
        return apiEpicErrorHandle(err);
      });

    return Observable.concat(
      Observable.of(setLoadingComponents(components)),
      apiAction$,
      Observable.of(setLoadingComponents(R.mapObjIndexed(() => false, components))),
    );
  });

export default logEventListEpic;
