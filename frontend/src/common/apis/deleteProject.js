/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const deleteProject = (credentials: Credentials, projectName: String) => {
  return fetchPost(getEndpoint('remove-project'), {
    ...credentials,
    projectName,
  }).then((d) => {
    return d;
  });
};

export default deleteProject;
