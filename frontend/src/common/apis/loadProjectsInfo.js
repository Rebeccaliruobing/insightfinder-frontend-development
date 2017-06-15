/*  @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectsInfo = (
  credentials: Credentials,
) => {
  return fetchGet(
    getEndpoint('loadProjectsInfo'), {
      ...credentials,
    },
  ).then((d) => {
    return {
      rawData: d.data,
    };
  });
};

export default loadProjectsInfo;
