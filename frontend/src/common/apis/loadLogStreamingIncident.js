/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreamingIncident = (credentials: Credentials, params: Object) => {
  const { projectName, incidentId } = params;
  // The incidentId is the value of the incidentStartTime.
  return fetchGet(getEndpoint('logstreaming'), {
    ...credentials,
    operation: 'detectionResult',
    projectName,
    dayDate: incidentId,
  }).then((d) => {
    const rawData = d.data;
    const data = rawData;
    return {
      rawData,
      data,
    };
  });
};

export default loadLogStreamingIncident;
