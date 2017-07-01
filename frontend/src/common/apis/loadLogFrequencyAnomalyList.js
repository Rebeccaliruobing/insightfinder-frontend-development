/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogFrequencyAnomalyList = (
  credentials: Credentials,
  projectName: String,
  params: Object,
) => {
  // Use the time as the incident id.
  const { incidentId } = params;
  return fetchGet(getEndpoint('logfrequencyanomaly'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
    isRare: true,
  }).then((d) => {
    const rawData = d.data;
    const { incidentStartTime, incidentEndTime } = params;

    const mStartTime = moment(incidentStartTime);
    const mEndTime = moment(incidentEndTime);
    const startTime = mStartTime.valueOf();
    const endTime = mEndTime.valueOf();

    let patterns = get(rawData, 'patternList', []);

    patterns = R.map((p) => {
      // Convert the topK string into array.
      const keywords = R.filter(
        k => Boolean(k),
        R.map(
          k => k.trim(),
          p.topK && p.topK.length > 0
            ? p.topK.replace(/\(\d+\)/g, '').replace(/'/g, '').split(',')
            : [],
        ),
      );
      //
      const name = p.patternName === `Pattern ${p.nid}` ? keywords.join('-') : p.patternName;
      return {
        nid: p.nid,
        keywords,
        name,
        patternName: p.patternName,
        eventsCount: p.count,
      };
    }, patterns);

    return {
      rawData,
      data: {
        startTime,
        endTime,
        patterns,
      },
    };
  });
};

export default loadLogFrequencyAnomalyList;
