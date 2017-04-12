/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const loadLogStreaming = (
  credentials: Credentials,
  operation : String,
) =>
  fetchPost(
    getEndpoint('logstreaming'),
    {
      operation,
      ...credentials,
    },
  ).then(d => d.data);

export default loadLogStreaming;
