/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreamingPattern = (
  credentials: Credentials,
  projectName: String,
  incidentId: String,
) => {
  return fetchGet(getEndpoint('logstreamingpattern'), {
    ...credentials,
    operation: 'queryPattern',
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

export default loadLogStreamingPattern;
