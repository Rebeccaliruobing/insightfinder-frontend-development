/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const newGoogleProject = (credentials: Credentials, projectName: String, params: Object) => {
  const { projectId, projectType, fileName, serviceAccount } = params;

  return fetchPost(getEndpoint('add-google-project'), {
    ...credentials,
    projectName,
    'project-id': projectId,
    'project-type': projectType,
    filename: fileName,
    'service-account': serviceAccount,
    hasAgentData: false,
  }).then((d) => {
    return d;
  });
};

export default newGoogleProject;
