/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const loadLogIncident = (
  credentials: Credentials,
  operation: String,
  params: Object,
) => {
  const { projectName, incident } = params;
  const { modelType,
    incidentStartTime: startTime, incidentEndTime: endTime,
    derivedPvalue,
    pValue: pvalue, cValue: cvalue, modelStartTime, modelEndTime } = incident;
  return fetchPost(
    getEndpoint('logAnalysis'), {
      ...credentials,
      operation: '',
      projectName,
      modelType, startTime, endTime, derivedPvalue,
      pvalue, cvalue, modelStartTime, modelEndTime,
      isExistentIncident: true,
    },
  ).then((d) => {
    console.log(d);
    return d.data;
  });
};

export default loadLogIncident;
