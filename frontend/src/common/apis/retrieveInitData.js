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
    getEndpoint('dashboard-uservalues1'),
    {
      operation: 'display',
      ...credentials,
    },
  )
    .then(d => d);

export default retrieveInitData;
