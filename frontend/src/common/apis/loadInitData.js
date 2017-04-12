/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

/**
 * Load the initial data includes projects info, metadata.
 * Old API: postJSONDashboardUserValues()
 * TODO: convert the response data into objects.
 */
const loadInitData = (
  credentials: Credentials,
) =>
  fetchPost(
    getEndpoint('dashboard-uservalues'),
    {
      operation: 'display',
      ...credentials,
    },
  ).then(d => d.data);

export default loadInitData;
