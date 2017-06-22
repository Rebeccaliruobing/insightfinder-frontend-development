/*  @flow */
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreamingIncident = (
  credentials: Credentials,
  params: Object,
) => {
  const { projectName, incident } = params;
  const { incidentStartTime } = incident;
  return fetchGet(
    getEndpoint('logstreaming'), {
      ...credentials,
      operation: 'detectionResult',
      projectName,
      dayDate: moment(incidentStartTime).valueOf(),
    },
  ).then((d) => {
    return d.data;
  });
};

export default loadLogStreamingIncident;