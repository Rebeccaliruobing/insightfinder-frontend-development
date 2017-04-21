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
  incidentList = R.map((i) => {
    return {
      ...i,
      id: i.incidentKey,
      name: i.incidentKey,
    };
  }, incidentList);

  return {
    incidentList,
  };
});

export default loadLogStreaming;
