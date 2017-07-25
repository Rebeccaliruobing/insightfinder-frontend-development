/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
import moment from 'moment';
import momenttz from 'moment-timezone';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const postDefaultTimezone = (credentials: Credentials, defaultTimezone: String) => {
  let timezoneOffset = 0;
  if (defaultTimezone && defaultTimezone !== 'default') {
    timezoneOffset = -momenttz.tz.zone(defaultTimezone).offset(moment.utc());
  } else {
    defaultTimezone = '';
  }

  return fetchPost(getEndpoint('system/updateTimezone'), {
    ...credentials,
    timezoneString: defaultTimezone,
    timezoneOffset,
  }).then(d => {
    return d;
  });
};

export default postDefaultTimezone;
