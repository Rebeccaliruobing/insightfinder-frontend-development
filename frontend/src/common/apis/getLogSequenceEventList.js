/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */

import R from 'ramda';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getLogSequenceEventList = (credentials: Credentials, projectName: String, params: Object) => {
  let { dayTimeMillis } = params;

  if (!dayTimeMillis) {
    dayTimeMillis = params.startTimeMillis;
  }
  // Use the time as the incident id.
  return fetchGet(getEndpoint('logpatternsequenceoccuranceservlet'), {
    ...credentials,
    projectName,
    dayTimeMillis,
    patternSequence: params.patterns,
  }).then(d => {
    const rawData = d.data;
    let sequences = rawData;

    sequences = R.map(seq => {
      return R.map(e => {
        const etimeVal = moment(e.timestamp).valueOf();
        return {
          datetime: e.timestamp,
          timestamp: etimeVal,
          rawData: e.rawData,
        };
      }, seq);
    }, sequences);

    if (sequences.length === 0) {
      console.warn(`[IF] Empty event list for patterns: ${params.patterns}`);
    }

    return {
      rawData,
      data: sequences,
    };
  });
};

export default getLogSequenceEventList;
