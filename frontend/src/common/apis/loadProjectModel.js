/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectModel = (credentials: Credentials, projectName: String, params: Object) => {
  return fetchGet(getEndpoint('modelPicking'), {
    ...credentials,
    projectName,
    operation: 'list',
    ...params,
  }).then((d) => {
    const rawData = d.data;
    const data = rawData;

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectModel;
