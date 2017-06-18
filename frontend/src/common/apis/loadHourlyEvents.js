/*  @flow */

/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';
import { aggregateToMultiHourData } from '../../../containers/executive-dashboard/heatmap-data';

const loadHourlyEvents = (
  credentials: Credentials,
  params: Object,
) => {
  const { projectId, startTime, endTime, instanceGroup } = params;
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
      operation: 'loadHourly',
      projectName: projectId,
      instanceGroup,
      modelType: 'Holistic',
      timezoneOffset: moment().utcOffset(),
      numberOfDays,
      endTimestamp: realEndTime,
    },
  ).then((d) => {
    return aggregateToMultiHourData(d.data, realEndTime, numberOfDays);
  });
};

export default loadHourlyEvents;
