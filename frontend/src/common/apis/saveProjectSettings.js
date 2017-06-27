/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';
// import mockResponseOK from './mock/mockResponseOK';

/**
 * Save project settings with changed value.
 */
const saveProjectSettings = (credentials: Credentials, projectName: String, params: Object) => {
  // TODO: Need to send the only changed settings to server.
  // console.warn('mock POST api /projects/update', projectName, params);
  // return Promise.resolve(mockResponseOK);
  const jsonParams = {};
  R.forEachObjIndexed((val, key) => {
    jsonParams[key] = val ? JSON.stringify(val) : null;
  }, params);

  console.log('jsonParams', params);

  return fetchPost(getEndpoint('projects/update'), {
    ...credentials,
    operation: 'updateprojsettings',
    projectName,
    ...jsonParams,
  }).then((d) => {
    return d;
  });
};

export default saveProjectSettings;
