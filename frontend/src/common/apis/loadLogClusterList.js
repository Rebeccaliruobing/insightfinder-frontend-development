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
import { logPatternTopKToArray } from './magicParsers';

const loadLogClusterList = (credentials: Credentials, projectName: String, params: Object) => {
  // Use the time as the incident id.
  const { incidentId } = params;
  return fetchGet(getEndpoint('logstreaminglistpatterns'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
  }).then(d => {
    // TODO: This API response not in data format, need to change to d.data.

    const { incidentStartTime, incidentEndTime, totalEventsCount } = params;
    const rawData = d;

    const mStartTime = moment(incidentStartTime);
    const mEndTime = moment(incidentEndTime);
    const startTime = mStartTime.valueOf();
    const endTime = mEndTime.valueOf();
    let patterns = get(rawData, 'patternArray', []);

    patterns = R.sortWith(
      [R.ascend(R.prop('eventsCount'))],
      R.map(p => {
        // Convert the topK string into array.
        const keywords = logPatternTopKToArray(p.topK);
        const episodes = logPatternTopKToArray(p.topKEpisode);

        const name = p.patternName === `Pattern ${p.nid}` ? keywords.join('-') : p.patternName;
        return {
          nid: p.nid,
          keywords,
          episodes,
          name,
          patternName: p.patternName,
          eventsCount: p.count,
          totalPercent: p.count / totalEventsCount,
        };
      }, patterns),
    );

    return {
      rawData,
      data: {
        patterns,
        startTime,
        endTime,
        totalEventsCount,
      },
    };
  });
};

export default loadLogClusterList;
