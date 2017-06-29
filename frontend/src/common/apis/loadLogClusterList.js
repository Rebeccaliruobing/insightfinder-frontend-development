/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogClusterList = (credentials: Credentials, projectName: String, params: Object) => {
  // Use the time as the incident id.
  const { incidentId } = params;
  return fetchGet(getEndpoint('logstreamingsetpattern'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
  }).then((d) => {
    // TODO: This API response not in data format, need to change to d.data.

    const rawData = d;
    const events = get(rawData, 'eventArray', []);

    const mStartTime = moment(parseInt(incidentId, 10)).startOf('day');
    const mEndTime = mStartTime.clone().endOf('day');
    const startTime = mStartTime.valueOf();
    const endTime = mEndTime.valueOf();

    return {
      rawData,
      data: {
        events,
        startTime,
        endTime,
      },
    };
  });
};

export default loadLogClusterList;
