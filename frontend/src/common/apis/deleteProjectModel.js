/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const deleteProjectModel = (
  credentials: Credentials,
  projectName: String,
  params: Object,
  modelKeyObj: Object,
) => {
  return fetchGet(getEndpoint('modelPicking'), {
    ...credentials,
    operation: 'delete',
    projectName,
    ...params,
    modelKeyObj: JSON.stringify(modelKeyObj),
  }).then((d) => {
    return d;
  });
};

export default deleteProjectModel;
