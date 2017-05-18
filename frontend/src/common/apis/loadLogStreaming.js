/*  @flow */
import R from 'ramda';
import moment from 'moment';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreaming = (
  credentials: Credentials,
  params: Object,
) => fetchGet(
  getEndpoint('logstreaming'), {
    ...credentials,
    operation: 'list',
    ...params,
  },
).then((d) => {
  let incidentList = d.data;
  incidentList = R.map((i) => {
    return {
      ...i,
      id: i.incidentKey,
      name: moment(i.incidentStartTime).format('YYYY-MM-DD'),
    };
  }, incidentList);

  return {
    incidentList,
  };
});

export default loadLogStreaming;
