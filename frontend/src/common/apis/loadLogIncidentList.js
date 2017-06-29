/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogIncidentList = (credentials: Credentials, projectName: String, params: Object) => {
  return fetchGet(getEndpoint('logstreaming'), {
    ...credentials,
    operation: 'list',
    projectName,
    ...params,
  }).then((d) => {
    const rawData = d.data;

    // TODO: Check the duplidate incident id.
    // Add special properties for each incident.
    let incidentList = d.data || [];
    incidentList = R.map((i) => {
      const startTime = moment(i.incidentStartTime);
      return {
        ...i,
        id: startTime.valueOf().toString(),
        name: startTime.format('YYYY-MM-DD'),
        totalEventsCount: null,
        rareEventsCount: i.rareEventsSize,
        clusterCount: (i.cluster || []).length,
      };
    }, incidentList);

    return {
      rawData,
      data: { incidentList },
    };
  });
};

export default loadLogIncidentList;
