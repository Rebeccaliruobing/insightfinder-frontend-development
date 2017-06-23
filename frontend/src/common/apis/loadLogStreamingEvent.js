/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreamingEvent = (
  credentials: Credentials,
  projectName: String,
  incidentId: String,
) => {
  return fetchGet(getEndpoint('logstreamingevent'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
  }).then((d) => {
    const rawData = d.data;
    return {
      rawData,
      data: d.data,
    };
  });
};

export default loadLogStreamingEvent;
