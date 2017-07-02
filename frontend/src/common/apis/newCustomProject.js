/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const newAWSCloudWatchProject = (credentials: Credentials, projectName: String, params: Object) => {
  const {
    instanceType,
    dataType,
    samplingInterval,
    processName,
    region,
    iamAccessKey,
    secretAccessKey,
  } = params;

  return fetchPost(getEndpoint('add-custom-project'), {
    ...credentials,
    projectName,
    projectCloudType: instanceType,
    dataType,
    samplingInterval: parseInt(samplingInterval, 10) || 5,
    zone: region,
    email: '',
    'access-key': iamAccessKey,
    'secrete-key': secretAccessKey,
    processName,
  }).then((d) => {
    return d;
  });
};

export default newAWSCloudWatchProject;
