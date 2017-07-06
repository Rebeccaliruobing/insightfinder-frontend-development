/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/*  @flow */
/* eslint-disable no-console */

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getExternalServiceList = (credentials: Credentials) => {
  // TODO: Change to real api.
  return fetchGet(getEndpoint('loadProjectsInfo'), {
    ...credentials,
  }).then(d => {
    const externalServiceList = [];
    return {
      rawData: d.data,
      data: externalServiceList,
    };
  });
};

export default getExternalServiceList;
