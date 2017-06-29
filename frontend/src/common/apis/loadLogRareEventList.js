/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get, range } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogRareEventList = (credentials: Credentials, projectName: String, params: Object) => {
  // Use the time as the incident id.
  const { incidentId, logFreqWindow } = params;
  return fetchGet(getEndpoint('logstreamingevent'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
    isRare: true,
  }).then((d) => {
    // TODO: This API response not in data format, need to change to d.data.

    const { incidentStartTime, incidentEndTime, totalEventsCount } = params;
    const rawData = d;
    const events = get(rawData, 'eventArray', []);

    const mStartTime = moment(incidentStartTime);
    const mEndTime = moment(incidentEndTime);
    const startTime = mStartTime.valueOf();
    const endTime = mEndTime.valueOf();

    // Prepare the ts data used by charts.
    const size = Math.ceil((endTime - startTime + 2) / logFreqWindow);
    const tsEvents = range(size).map(i => [new Date(startTime + i * logFreqWindow), 0]);

    const eventBuckets = {};
    R.forEach((e) => {
      const etimeVal = moment(e.timestamp).valueOf();
      const idx = Math.floor((etimeVal - startTime) / logFreqWindow);
      if (idx >= 0 && idx < size) {
        const time = tsEvents[idx][0].valueOf().toString();
        tsEvents[idx][1] += 1;

        if (!eventBuckets[time]) {
          eventBuckets[time] = {
            name: '',
            events: [],
            nEvents: 0,
            keywords: [],
            episodes: [],
          };
        }

        const bucket = eventBuckets[time];
        bucket.events.push({
          datetime: e.timestamp,
          timestamp: etimeVal,
          rawData: e.rawData,
        });
        bucket.keywords = bucket.keywords.concat(e.keywords);
        bucket.episodes = bucket.episodes.concat(e.episodes);
        bucket.nEvents = bucket.events.length;
      }
    }, events);

    return {
      rawData,
      data: {
        events,
        tsEvents,
        eventBuckets,
        startTime,
        endTime,
        logFreqWindow,
        totalEventsCount,
      },
    };
  });
};

export default loadLogRareEventList;
