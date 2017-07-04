/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import R from 'ramda';
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';
import { getLogRerunDetection } from '../../apis';
import { showAppAlert, showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { logMessages } from '../messages';

const logDetectionEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('RERUN_LOG_DETECTION').concatMap((action) => {
    const state = getState();
    const { credentials } = state.auth;
    const { incidentList } = state.log;
    const { projectName, incidentId } = action.payload;
    const incidentInfo = R.find(i => i.id === incidentId, incidentList);

    if (!incidentInfo) {
      return Observable.of(showAppAlert('warn', logMessages.errorNoIncident));
    }

    const { incidentStartTime, incidentEndTime } = incidentInfo;
    return Observable.concat(
      Observable.of(showAppLoader()),
      Observable.from(
        getLogRerunDetection(credentials, projectName, {
          startTime: incidentStartTime,
          endTime: incidentEndTime,
        }),
      )
        .concatMap(() => Observable.of(showAppAlert('info', logMessages.infoRerunTriggerred)))
        .catch((err) => {
          return apiEpicErrorHandle(err);
        }),
      Observable.of(hideAppLoader()),
    );
  });

export default logDetectionEpic;
