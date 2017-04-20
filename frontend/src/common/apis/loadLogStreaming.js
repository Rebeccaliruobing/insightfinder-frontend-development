/*  @flow */
import R from 'ramda';
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import mockData from './mock/loadLogStreaming.json';

const loadLogStreaming = (
  credentials: Credentials,
  params: Object,
) => fetchGet(
  getEndpoint('logstreaming'), {
    ...credentials,
    operation: 'list',
    ...params,
  },
).catch(() => {
  return mockData;
}).then((d) => {
  console.log(['logstreaming/list', d]);
  let incidentList = d.data;
  const timeFormat = 'YYYY/MM/DD mm:ss';

  incidentList = R.map((i) => {
    const startTime = moment(i.incidentStartTime);
    const endTime = moment(i.incidentEndTime);
    return {
      ...i,
      id: i.incidentKey,
      name: `${startTime.format(timeFormat)}-${endTime.format(timeFormat)}`,
    };
  }, incidentList);

  return {
    incidentList,
  };
});

export default loadLogStreaming;
