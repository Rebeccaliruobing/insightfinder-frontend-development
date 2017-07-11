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

const loadHourlyEvents = (credentials: Credentials, params: Object) => {
  const { projectName, startTime, endTime, instanceGroup } = params;
  const dateFormat = 'YYYY-MM-DD';
  const mStartTime = moment(startTime, dateFormat).startOf('day');
  const mEndTime = moment(endTime, dateFormat).endOf('day');

  const diffDays = mEndTime.diff(mStartTime, 'days');
  const numberOfDays = diffDays + 1;

  const mNow = moment();
  const realEndTime = (mEndTime > mNow ? mNow : mEndTime).valueOf();

  return fetchPost(getEndpoint('execDashboard'), {
    ...credentials,
    operation: 'loadHourly',
    projectName,
    instanceGroup,
    modelType: 'Holistic',
    timezoneOffset: moment().utcOffset(),
    numberOfDays,
    startTimestamp: mStartTime.valueOf(),
    endTimestamp: realEndTime,
  }).then(d => {
    return aggregateToMultiHourData(d.data, realEndTime, numberOfDays);
  });
};

export default loadHourlyEvents;
