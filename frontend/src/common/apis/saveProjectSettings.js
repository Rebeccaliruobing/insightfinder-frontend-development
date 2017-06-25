/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';
import mockResponseOK from './mock/mockResponseOK';

/**
 * Save project settings with changed value.
 */
const saveProjectSettings = (credentials: Credentials, projectName: String, params: Object) => {
  // TODO: Need to send the only changed settings to server.
  console.warn('mock POST api /projects/update', projectName, params);
  return Promise.resolve(mockResponseOK);
  /*
  return fetchPost(getEndpoint('projects/update'), {
    ...credentials,
    projectName,
    ...params,
  }).then(() => {
    return true;
  });
  */
};

export default saveProjectSettings;
