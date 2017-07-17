/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */
import R from 'ramda';
import { get, isArray } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import { logPatternTopKToArray, logPatternAnomalyToMap } from './magicParsers';

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
  }).then(d => {
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

    let derivedAnomalyString = get(rawData, 'derivedAnomalyString');
    if (!isArray(derivedAnomalyString)) {
      derivedAnomalyString = [];
      console.error('[IF] expect derivedAnomalyString to be an Array', derivedAnomalyString);
    }

    const allAnomalies = logPatternAnomalyToMap(derivedAnomalyString);

    let patterns = get(rawData, 'patternList', []);
    // TODO: sort the patterns by anomaly ratio
    patterns = R.map(p => {
      const { nid, patternName } = p;
      const keywords = logPatternTopKToArray(p.topK);
      const episodes = logPatternTopKToArray(p.topKEpisode);
      const name = patternName === `Pattern ${nid}` ? keywords.join('-') : patternName;

      const anomalies = allAnomalies[nid.toString()] || {};
      const anomalyCount = R.keys(anomalies).length;

      // Get the freq vector
      const freqs = toIntArray(get(freqVectorObj, `Pattern ${nid}`, '').split(','));
      if (freqs.length !== freqTimestamps.length) {
        console.error(
          `[IF] nid:${nid};${name} freqVectorObj not match timestamp`,
          freqs,
          freqTimestamps,
        );
      }

      let freqTsData = [];
      const barColors = {};
      if (freqTimestamps.length > 0) {
        const tsObj = moment(freqTimestamps[0]).subtract(10, 'minutes');
        barColors[tsObj.valueOf()] = 'teal';
        freqTsData.push([new Date(tsObj.valueOf()), 0]);
      }

      R.addIndex(R.forEach)((ts, idx) => {
        const t = new Date(ts);
        const anomaly = anomalies[ts.toString()];

        barColors[ts] = 'teal';
        if (anomaly) {
          barColors[ts] = anomaly.pct > 0 ? 'red' : 'blue';
        }
        freqTsData.push([t, freqs[idx] || 0, get(anomaly, 'pct')]);
      }, freqTimestamps);

      if (freqTimestamps.length > 0) {
        const tsObj = moment(freqTimestamps[freqTimestamps.length - 1]).add(10, 'minutes');
        barColors[tsObj.valueOf()] = 'teal';
        freqTsData.push([new Date(tsObj.valueOf()), 0]);
      }

      freqTsData = R.sort((a, b) => a[0].valueOf() - b[0].valueOf(), freqTsData);

      return {
        nid,
        name,
        patternName,
        keywords,
        episodes,
        anomalies,
        eventsCount: p.count,
        freqTsData,
        barColors,
        anomalyCount,
      };
    }, patterns);
    patterns = R.sortWith([R.descend(R.prop('anomalyCount'))], patterns);

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
