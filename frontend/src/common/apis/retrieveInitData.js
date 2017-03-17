/*  @flow */
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

/**
 * Retrieve the initial data includes projects info, metadata.
 * Old API: postJSONDashboardUserValues()
 */
const retrieveInitData = (
  credentials: Credentials,
) =>
  fetchPost(
    getEndpoint('dashboard-uservalues'),
    {
      operation: 'display',
      userName: 'admin',
      token: 'fsfds',
      // ...credentials,
    },
  )
    .then(d => d);

export default retrieveInitData;
