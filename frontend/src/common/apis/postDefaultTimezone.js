/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const postDefaultTimezone = (credentials: Credentials, defaultTimezone: String) => {
  return fetchPost(getEndpoint('system/updateTimezone'), {
    ...credentials,
    timezoneString: defaultTimezone,
  }).then(d => {
    return d;
  });
};

export default postDefaultTimezone;
