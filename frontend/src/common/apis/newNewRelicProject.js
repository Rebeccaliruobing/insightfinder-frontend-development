/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const newNewRelicProject = (credentials: Credentials, projectName: String, params: Object) => {
  const { samplingInterval, apiKey } = params;

  return fetchPost(getEndpoint('add-newrelic-project'), {
    ...credentials,
    projectName,
    projectCloudType: '',
    apikey: apiKey,
    samplingInterval: parseInt(samplingInterval, 10) || 5,
    email: '',
  }).then(d => {
    return d;
  });
};

export default newNewRelicProject;
