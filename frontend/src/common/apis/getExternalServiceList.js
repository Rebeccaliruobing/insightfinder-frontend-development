/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/*  @flow */
/* eslint-disable no-console */

import { get } from 'lodash';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getExternalServiceList = (credentials: Credentials) => {
  // TODO: Replace dashboard-uservalues API
  return fetchGet(getEndpoint('dashboard-uservalues'), {
    ...credentials,
  }).then(d => {
    const extServiceAllInfo = JSON.parse(get(d.data, 'extServiceAllInfo', '[]'));
    return {
      rawData: d.data,
      data: extServiceAllInfo,
    };
  });
};

export default getExternalServiceList;
