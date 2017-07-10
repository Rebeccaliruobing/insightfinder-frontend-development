/*  @flow */

/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

// TODO: Change to GET when API changed
import moment from 'moment';
import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';
import normalizeStats from '../../../containers/executive-dashboard/normalize-stats';

const loadWeeklyAnomalies = (credentials: Credentials, params: Object) => {
  const { projectName, startTime, endTime } = params;
  const dateFormat = 'YYYY-MM-DD';
  const mStartTime = moment(startTime, dateFormat);
  const mEndTime = moment(endTime, dateFormat);

  const diffDays = mEndTime.diff(mStartTime, 'days');
  const numberOfDays = diffDays + 1;

  const mNow = moment();
  const realEndTime = (mEndTime > mNow ? mNow : mEndTime).valueOf();

  // TODO: Current loadAnomalyAll doesn't include instance/group information, we
  // need get these infos from loadResourceAll
  return fetchPost(getEndpoint('execDashboard'), {
    ...credentials,
    operation: 'loadAnomalyAll',
    projectName,
    modelType: 'Holistic',
    timezoneOffset: moment().utcOffset(),
    numberOfDays,
    startTimestamp: mStartTime.valueOf(),
    endTimestamp: realEndTime,
  }).then(anomalyData => {
    return fetchPost(getEndpoint('execDashboard'), {
      ...credentials,
      operation: 'loadResourceAll',
      projectName,
      modelType: 'Holistic',
      timezoneOffset: moment().utcOffset(),
      numberOfDays,
      startTimestamp: mStartTime.valueOf(),
      endTimestamp: realEndTime,
    }).then(resourceData => {
      const anomalyEventStats = anomalyData.data;
      const resourceEventStats = resourceData.data;
      // Merge instance/group from resource into anomaly
      R.forEachObjIndexed((resource, name) => {
        R.forEachObjIndexed((stats, group) => {
          const anomaly = anomalyEventStats[name][group];
          anomaly.current.NumberOfInstances = stats.current.NumberOfInstances;
          anomaly.current.NumberOfMetrics = stats.current.NumberOfMetrics;
        }, resource);
      }, resourceEventStats);

      return {
        rawData: {
          anomalyEventStats,
          resourceEventStats,
        },
        data: {
          anomalyEventStats: normalizeStats(anomalyEventStats),
          resourceEventStats: normalizeStats(resourceEventStats, 'current.AvgCPUUtilization'),
        },
      };
    });
  });
};

export default loadWeeklyAnomalies;
