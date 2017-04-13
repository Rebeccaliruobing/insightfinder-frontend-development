/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogStreaming = (
  credentials: Credentials,
  operation : String,
) =>
  fetchGet(
    getEndpoint('logstreaming'),
    {
      ...credentials,
      operation,
    },
  ).then(d => d.data);

export default loadLogStreaming;
