/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import { Observable } from 'rxjs/Observable';
import { get } from 'lodash';
import type { Deps } from '../../types';
import { loadLogStreamingPattern } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogStreaming } from '../actions';

const viewApis = {
  cluster: loadLogStreamingPattern,
  rare: loadLogStreamingPattern,
};

const streamingIncidentEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING_INCIDENT').concatMap((action) => {
    const { projectName, incidentId, view } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const { streamingIncidentInfo } = state.log;
    const streamingIncidentInfoParams = action.payload;

    // The data for each view is stored in incident info, we might reuse
    // the existing data if we params are same, but now we just reload
    // the data everytime.
    const apiFunc = viewApis[view];

    return Observable.concat(
      Observable.of(showAppLoader()),
      Observable.of(
        setLogStreaming({
          streamingErrorMessage: null,
          streamingIncidentInfoParams,
          // Reset the data for the current view only
          streamingIncidentInfo: { ...streamingIncidentInfo, [view]: {} },
        }),
      ),
      Observable.from(
        apiFunc(credentials, {
          projectName,
          incidentId,
        }),
      )
        .concatMap((d) => {
          return Observable.of(
            setLogStreaming({
              streamingIncidentInfo: { ...streamingIncidentInfo, [view]: get(d, 'data', {}) },
            }),
          );
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        }),
      Observable.of(hideAppLoader()),
    );
  });

export default streamingIncidentEpic;
