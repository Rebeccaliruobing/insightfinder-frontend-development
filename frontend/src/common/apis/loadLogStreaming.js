/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreaming = (
  credentials: Credentials,
  operation: String,
  params: Object,
) => fetchGet(
  getEndpoint('logstreaming'), {
    ...credentials,
    operation,
    ...params,
  },
  ).then(d => ({
    instances: d.data,
  }));

export default loadLogStreaming;
