/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import R from 'ramda';
import moment from 'moment';
import { Observable } from 'rxjs/Observable';
import type { Deps } from '../../types';
import {
  loadLogRareEventList,
  loadLogFrequencyAnomalyList,
  loadLogClusterList,
  loadLogPatternSequenceList,
  loadLogIncidentList,
} from '../../apis';
import { showAppLoader, hideAppLoader } from '../../app/actions';
import { apiEpicErrorHandle } from '../../errors';
import { setLogInfo } from '../actions';

const viewApis = {
  rare: loadLogRareEventList,
  cluster: loadLogClusterList,
  freq: loadLogFrequencyAnomalyList,
  seq: loadLogPatternSequenceList,
};

const incidentEpic = (action$: any, { getState }: Deps) =>
  action$.ofType('LOAD_LOG_INCIDENT').concatMap((action) => {
    const pickNotNil = R.pickBy(a => !R.isNil(a));
    const monthFormat = 'YYYY-MM';

    const state = getState();
    const { credentials } = state.auth;
    const { incidentListParams: prevIncidentListParams, incidentList } = state.log;
    const { projectName, params } = action.payload;
    const { month, incidentId, view } = params;
    const incidentParams = pickNotNil({ projectName, ...params });
    const incidentListParams = pickNotNil({ projectName, month });
    console.log(incidentParams, incidentListParams, prevIncidentListParams);
    const monthlyDate = moment(month, monthFormat).startOf('month').valueOf();

    // The data for each view is stored in incident, we might reuse
    // the existing data if we params are same, but now we just reload
    // the data everytime.
    const apiFunc = viewApis[view];

    // TODO: Get logFreqWindow from project info.
    let apiAction$ = null;

    // We need to load the incident list first, which contains detail inforation
    // about the incident. By checking the incidentlist params.
    if (!R.equals(incidentListParams, prevIncidentListParams)) {
      apiAction$ = Observable.from(loadLogIncidentList(credentials, projectName, { monthlyDate }))
        .concatMap((listData) => {
          const incidentList = listData.data.incidentList;
          // Add more params which can get from project info.
          const incidentInfo = R.find(i => i.id === incidentId, incidentList);
          console.log(listData.data.incidentList, incidentInfo);
          return Observable.from(
            apiFunc(credentials, projectName, {
              ...params,
              incidentStartTime: incidentInfo.incidentStartTime,
              incidentEndTime: incidentInfo.incidentEndTime,
              logFreqWindow: 10 * 60 * 1000,
            }),
          )
            .concatMap((d) => {
              return Observable.of(
                setLogInfo({
                  incidentList,
                  incident: { [view]: d.data },
                }),
              );
            })
            .catch((err) => {
              return apiEpicErrorHandle(err);
            });
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    } else {
      // Add more params which can get from project info.
      const incidentInfo = R.find(i => i.id === incidentId, incidentList);
      apiAction$ = Observable.from(
        apiFunc(credentials, projectName, {
          ...params,
          incidentStartTime: incidentInfo.incidentStartTime,
          incidentEndTime: incidentInfo.incidentEndTime,
          logFreqWindow: 10 * 60 * 1000,
        }),
      )
        .concatMap((d) => {
          return Observable.of(setLogInfo({ incident: { [view]: d.data } }));
        })
        .catch((err) => {
          return apiEpicErrorHandle(err);
        });
    }

    return Observable.concat(
      Observable.of(setLogInfo({ currentError: null, incidentListParams, incidentParams })),
      Observable.of(showAppLoader()),
      apiAction$,
      Observable.of(hideAppLoader()),
    );
  });

export default incidentEpic;
