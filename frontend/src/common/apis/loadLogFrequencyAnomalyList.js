/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */
import R from 'ramda';
import { get, range } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import { logPatternTopK2Array, logPatternNameToId } from './magicParsers';

const loadLogFrequencyAnomalyList = (
  credentials: Credentials,
  projectName: String,
  params: Object,
) => {
  // Use the time as the incident id.
  const { incidentId, logFreqWindow } = params;
  return fetchGet(getEndpoint('logfrequencyanomaly'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
    isRare: true,
  }).then((d) => {
    const rawData = d.data;

    const toIntArray = R.pipe(R.filter(f => Boolean(f)), R.map(n => parseInt(n.trim(), 10)));

    // Save the incident start/end time, it's not used now.
    const { incidentStartTime, incidentEndTime } = params;
    const startTime = moment(incidentStartTime).valueOf();
    const endTime = moment(incidentEndTime).valueOf();

    // The response contains the pattern, total freq vector, pattern non zero freq vector
    // and anomaly string for the pattern.
    // total freq vector provides (timestamp, freq) for all patterns, it's not used in UI now.
    const totalFreqVectorArr = get(rawData, 'totalFreqVectorArr', []);
    if (!R.isEmpty(totalFreqVectorArr)) {
      console.warn('totalFreqVectorArr is not used');
    }

    const freqVectorObj = get(rawData, 'freqVectorObj', {});
    const freqTimestamps = toIntArray(get(freqVectorObj, 'timestamp', '').split(','));
    if (R.isEmpty(freqVectorObj) || freqTimestamps.length === 0) {
      console.error(
        'freqVectorObj or freqVectorObj["timestamp"] is empty',
        get(rawData, 'freqVectorObj'),
      );
    }
    const size = freqTimestamps.length;

    let patterns = get(rawData, 'patternList', []);
    // TODO: sort the patterns by anomaly ratio
    patterns = R.map((p) => {
      const { nid, patternName } = p;
      const keywords = logPatternTopK2Array(p.topK);
      const name = p.patternName === `Pattern ${nid}` ? keywords.join('-') : patternName;

      // Get the freq vector
      const freqs = toIntArray(get(freqVectorObj, p.patternName, '').split(','));
      if (freqs.length !== freqTimestamps.length) {
        console.error(
          `${patternName} freqVectorObj not match timestamp, will left align and 0 pad.`,
        );
      }

      const freqTsData = [];
      R.addIndex(R.forEach)((ts, idx) => {
        freqTsData.push([new Date(ts), freqs[idx] || 0]);
      }, freqTimestamps);

      return {
        nid,
        name,
        patternName,
        keywords,
        eventsCount: p.count,
        freqTsData,
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
