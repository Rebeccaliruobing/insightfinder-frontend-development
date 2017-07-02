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
  const { instanceTypes, region, iamAccessKey, secretAccessKey } = params;
  return fetchPost(getEndpoint('add-amazon-project'), {
    ...credentials,
    projectName,
    zone: region,
    instanceType: instanceTypes.toString(),
    email: '',
    'access-key': iamAccessKey,
    'secrete-key': secretAccessKey,
    hasAgentData: false,
  }).then((d) => {
    return d;
  });
};

export default newAWSCloudWatchProject;
