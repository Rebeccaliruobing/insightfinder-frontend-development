/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectModel = (credentials: Credentials, projectName: String, params: Object) => {
  const { startTime, endTime } = params;

  const startTimeStampMillis = moment(startTime).valueOf();
  const endTimeStampMillis = moment(endTime).valueOf();

  return fetchGet(getEndpoint('logstreamingmanualtirgger'), {
    ...credentials,
    projectName,
    modelType: 'holistic',
    startTimeStampMillis,
    endTimeStampMillis,
  }).then((d) => {
    return d;
  });
};

export default loadProjectModel;
