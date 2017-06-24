/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectSettings = (credentials: Credentials, projectName: String) => {
  return fetchGet(getEndpoint('projects/update'), {
    ...credentials,
    projectName,
  }).then((d) => {
    const rawData = d.data;
    const data = {};

    console.log(rawData);

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectSettings;
