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
import moment from 'moment';
import type { Deps } from '../../types';
import { loadLogStreamingList } from '../../apis';
import { appMessages } from '../../app/messages';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogStreaming } from '../actions';

const streamingListEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING_LIST').concatMap((action) => {
    const { projectName, month } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const projects = R.filter(p => p.isLogStreaming, state.app.projects);

    // When projectName empty, which also means there is no project to auto select.
    // So we need to show message to help user create project.
    console.log(projectName);
    if (!projectName) {
      return Observable.concat(
        Observable.of(
          setLogStreaming({
            currentErrorMessage: appMessages.errorsNoLogProject,
            streamingInfos: null,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    } else if (!R.find(p => p.projectName === projectName, projects)) {
      return Observable.concat(
        Observable.of(
          setLogStreaming({
            currentErrorMessage: appMessages.errorsProjectNotFound,
            streamingInfos: null,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    }

    const monthlyDate = moment(month, 'YYYY-MM').startOf('month').valueOf();
    return Observable.concat(
      Observable.of(setLogStreaming({ currentErrorMessage: null })),
      Observable.of(showAppLoader()),
      Observable.from(
        loadLogStreamingList(credentials, {
          projectName,
          monthlyDate,
        }),
      )
        .concatMap((d) => {
          return Observable.of(
            setLogStreaming({
              streamingInfos: get(d, 'data', []),
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        }),
      Observable.of(hideAppLoader()),
    );
  });

export default streamingListEpic;
