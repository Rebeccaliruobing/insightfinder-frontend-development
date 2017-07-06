/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/*  @flow */
/* eslint-disable no-console */

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const deleteExternalService = (credentials: Credentials, serviceId: String) => {
  return fetchPost(
    getEndpoint('service-integration'),
    { ...credentials, operation: 'delete', service_id: serviceId },
    false,
  );
};

export default deleteExternalService;
