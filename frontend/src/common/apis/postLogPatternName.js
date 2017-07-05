/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const postLogPatternName = (credentials: Credentials, projectName: String, params: Object) => {
  const { patternId, patternName } = params;
  return fetchPost(getEndpoint('logstreamingsetpattern'), {
    ...credentials,
    projectName,
    patterns: {
      [patternId.toString()]: patternName,
    },
  }).then(d => {
    return d;
  });
};

export default postLogPatternName;
