/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const newExternalService = (credentials: Credentials, type: String, params: Object) => {
  const { account } = params;
  const serviceKey = type === 'addSlack' ? params.webhook : params.serviceKey;

  return fetchPost(getEndpoint('service-integration'), {
    ...credentials,
    operation: type,
    account,
    service_key: serviceKey,
  }).then(d => {
    return d;
  });
};

export default newExternalService;
