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
    // Need to handle several cases
    //
    // - projectName is empty, which also means there is no project to select, show message.
    // - projectName is not in the list, show message.
    // - params are correct, calls API and handler errors.

    const { projectName, month } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const projects = R.filter(p => p.isLogStreaming, state.app.projects);
    const streamingInfosParams = { projectName, month };

    if (!projectName) {
      return Observable.concat(
        Observable.of(
          setLogStreaming({
            streamingInfos: [],
            streamingInfosParams,
            streamingErrorMessage: appMessages.errorsNoLogProject,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    } else if (!R.find(p => p.projectName === projectName, projects)) {
      return Observable.concat(
        Observable.of(
          setLogStreaming({
            streamingInfos: [],
            streamingInfosParams,
            streamingErrorMessage: appMessages.errorsProjectNotFound,
          }),
        ),
        Observable.of(hideAppLoader()),
      );
    }

    const monthlyDate = moment(month, 'YYYY-MM').startOf('month').valueOf();
    return Observable.concat(
      Observable.of(
        setLogStreaming({
          streamingErrorMessage: null,
          streamingInfosParams,
        }),
      ),
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
