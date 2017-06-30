/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import moment from 'moment';
import { get } from 'lodash';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogEventList = (credentials: Credentials, projectName: String, params: Object) => {
  let { dayTimeMillis } = params;

  if (!dayTimeMillis) {
    dayTimeMillis = moment(params.startTimeMillis).startOf('day').valueOf();
  }
  // Use the time as the incident id.
  return fetchGet(getEndpoint('logstreamingevent'), {
    ...credentials,
    projectName,
    ...params,
    dayTimeMillis,
  }).then((d) => {
    // TODO: This API response not in data format, need to change to d.data.

    const rawData = d;
    let events = get(rawData, 'eventArray', []);
    events = R.map((e) => {
      const etimeVal = moment(e.timestamp).valueOf();
      return {
        datetime: e.timestamp,
        timestamp: etimeVal,
        rawData: e.rawData,
      };
    }, events);

    return {
      rawData,
      data: events,
    };
  });
};

export default loadLogEventList;