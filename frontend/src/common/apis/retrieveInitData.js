/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

/**
 * Retrieve the initial data includes projects info, metadata.
 * Old API: postJSONDashboardUserValues()
 * TODO: convert the response data into objects.
 */
const retrieveInitData = (
  credentials: Credentials,
) =>
  fetchPost(
    getEndpoint('dashboard-uservalues'),
    {
      operation: 'display',
      ...credentials,
    },
  ).then(d => d.data);

export default retrieveInitData;
