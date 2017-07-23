/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const postMetricEventPatternName = (
  credentials: Credentials,
  projectName: String,
  params: Object,
) => {
  return fetchPost(
    getEndpoint('events'),
    {
      ...credentials,
      projectName,
      ...params,
    },
    false,
  ).then(d => {
    return d;
  });
};

export default postMetricEventPatternName;
