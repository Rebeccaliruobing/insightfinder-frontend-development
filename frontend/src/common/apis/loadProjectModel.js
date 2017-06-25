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

const loadProjectModel = (credentials: Credentials, params: Object) => {
  return fetchGet(getEndpoint('displayProjectModel'), {
    ...credentials,
    ...params,
    origin: '',
  }).then((d) => {
    const rawData = d.data;
    const data = {};

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectModel;
