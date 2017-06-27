/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectModel = (
  credentials: Credentials,
  projectName: String,
  instanceGroup: String,
  modelKeyObj: Object,
) => {
  return fetchGet(getEndpoint('modelPicking'), {
    ...credentials,
    projectName,
    instanceGroup,
    operation: 'save',
    modelKeyObj: JSON.stringify(modelKeyObj),
  }).then((d) => {
    return d;
  });
};

export default loadProjectModel;
