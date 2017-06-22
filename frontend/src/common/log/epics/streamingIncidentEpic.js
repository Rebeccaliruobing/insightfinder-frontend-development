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
import { loadLogStreamingIncident } from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogStreaming } from '../actions';

const streamingIncidentEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_STREAMING_INCIDENT').concatMap((action) => {
    const { projectName, incidentId, view } = action.payload;
    const state = getState();
    const { credentials } = state.auth;
    const streamingIncidentInfoParams = action.payload;

    return Observable.concat(
      Observable.of(showAppLoader()),
      Observable.of(
        setLogStreaming({
          streamingErrorMessage: null,
          streamingIncidentInfoParams,
          streamingIncidentInfo: {},
        }),
      ),
      Observable.from(
        loadLogStreamingIncident(credentials, {
          projectName,
          incidentId,
        }),
      )
        .concatMap((d) => {
          return Observable.of(
            setLogStreaming({
              streamingIncidentInfo: get(d, 'data', {}),
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
