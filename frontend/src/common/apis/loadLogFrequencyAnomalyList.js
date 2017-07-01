/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */
import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import { logPatternTopKToArray, logPatternAnomalyToArray } from './magicParsers';

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
      console.warn('[IF] totalFreqVectorArr is not used');
    }

    const freqVectorObj = get(rawData, 'freqVectorObj', {});
    const freqTimestamps = toIntArray(get(freqVectorObj, 'timestamp', '').split(','));
    if (R.isEmpty(freqVectorObj) || freqTimestamps.length === 0) {
      console.error(
        '[IF] freqVectorObj or freqVectorObj["timestamp"] is empty',
        get(rawData, 'freqVectorObj'),
      );
    }

    let derivedAnomalyString = get(rawData, 'derivedAnomalyString[0].anomalies');
    if (typeof derivedAnomalyString !== 'string') {
      derivedAnomalyString = '';
      console.error('[IF] derivedAnomalyString is empty or not a one item Array, Q:splitId="0"?');
    }

    const allAnomalies = logPatternAnomalyToArray(derivedAnomalyString);
    let matchedAnomalyCount = 0;

    let patterns = get(rawData, 'patternList', []);
    // TODO: sort the patterns by anomaly ratio
    patterns = R.map((p) => {
      const { nid, patternName } = p;
      const keywords = logPatternTopKToArray(p.topK);
      const name = p.patternName === `Pattern ${nid}` ? keywords.join('-') : patternName;

      const anomalies = R.filter(a => !isNaN(a.nid) && a.nid === nid, allAnomalies);
      // Get the mean anomaly ratio
      const anomalyMeanRatio = R.mean(R.map(a => a.ratio, anomalies));
      matchedAnomalyCount += anomalies.length;

      // Get the freq vector
      const freqs = toIntArray(get(freqVectorObj, p.patternName, '').split(','));
      if (freqs.length !== freqTimestamps.length) {
        console.error(
          `[IF] ${patternName} freqVectorObj not match timestamp, will left align and 0 pad.`,
        );
      }

      // TODO: Needs hints
      const freqTsData = [];
      const barColors = {};
      R.addIndex(R.forEach)((ts, idx) => {
        const t = new Date(ts);
        barColors[t.valueOf()] = 'teal'; // blue & red
        freqTsData.push([t, freqs[idx] || 0]);
      }, freqTimestamps);

      return {
        nid,
        name,
        patternName,
        keywords,
        anomalies,
        eventsCount: p.count,
        freqTsData,
        barColors,
        anomalyMeanRatio,
      };
    }, patterns);
    patterns = R.sort((a, b) => a.anomalyMeanRatio > b.anomalyMeanRatio, patterns);

    if (matchedAnomalyCount !== allAnomalies.length) {
      console.warn(
        `[IF] Not all anomalies have matched pattern, matched: ${matchedAnomalyCount}`,
        allAnomalies,
      );
    }

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
