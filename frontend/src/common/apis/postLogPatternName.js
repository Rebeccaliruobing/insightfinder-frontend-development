/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPostJson from './fetchPostJson';

const postLogPatternName = (credentials: Credentials, projectName: String, params: Object) => {
  const { incidentId, patternId, patternName } = params;
  return fetchPostJson(
    getEndpoint('logstreamingsetpattern'),
    {
      ...credentials,
      projectName,
      dayTimeMillis: incidentId,
    },
    {
      [patternId.toString()]: patternName,
    },
  ).then(d => {
    return d;
  });
};

export default postLogPatternName;
