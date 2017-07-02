/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const newDataDogProject = (credentials: Credentials, projectName: String, params: Object) => {
  const { samplingInterval, apiKey, appKey } = params;

  return fetchPost(getEndpoint('add-datadog-project'), {
    ...credentials,
    projectName,
    projectCloudType: '',
    appkey: appKey,
    apikey: apiKey,
    samplingInterval: parseInt(samplingInterval, 10) || 5,
    email: '',
  }).then((d) => {
    return d;
  });
};

export default newDataDogProject;
