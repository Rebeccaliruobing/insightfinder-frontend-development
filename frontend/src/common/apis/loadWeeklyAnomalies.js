/*  @flow */

/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

// TODO: Change to GET when API changed
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';
import normalizeStats from '../../../containers/executive-dashboard/normalize-stats';

const loadWeeklyAnomalies = (
  credentials: Credentials,
  params: Object,
) => {
  const { projectId, startTime, endTime } = params;
  const dateFormat = 'YYYY-MM-DD';
  const mStartTime = moment(startTime, dateFormat);
  const mEndTime = moment(endTime, dateFormat);

  const diffDays = mEndTime.diff(mStartTime, 'days');
  const numberOfDays = diffDays + 1;

  const mNow = moment();
  const realEndTime = (mEndTime > mNow ? mNow : mEndTime).valueOf();

  return fetchPost(
    getEndpoint('execDashboard'), {
      ...credentials,
      operation: 'loadAnomalyAll',
      projectName: projectId,
      modelType: 'Holistic',
      timezoneOffset: moment().utcOffset(),
      numberOfDays,
      endTimestamp: realEndTime,
    },
  ).then((d) => {
    return normalizeStats(d.data);
  });
};

export default loadWeeklyAnomalies;
