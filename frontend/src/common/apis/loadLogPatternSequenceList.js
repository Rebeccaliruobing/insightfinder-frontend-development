/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get } from 'lodash';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadLogPatternSequenceList = (
  credentials: Credentials,
  projectName: String,
  params: Object,
) => {
  // Use the time as the incident id.
  const { incidentId } = params;
  return fetchGet(getEndpoint('logpatternsequencelist'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
  }).then((d) => {
    const rawData = d.data;
    const sequences = rawData || [];

    // Merge sequences and patters into a array, with different type.
    let sequenceAndPatterns = [];

    R.forEach((seq) => {
      const { count, pattern } = seq;
      const id = '0';

      // TODO: Convert the pattern id string into a object will be replaced later.
      let patterns = R.filter(p => Boolean(p), R.map(p => p.trim(), (pattern || '').split(',')));
      const seqKeywords = [];
      patterns = R.map((p) => {
        const nid = p;
        const patternName = `Pattern ${p}`;
        const keywords = [patternName];

        const name = patternName === `Pattern ${nid}` ? keywords.join('-') : patternName;
        if (keywords.length > 0) {
          seqKeywords.push(keywords[0]);
        }

        return {
          id: nid,
          isPattern: true,
          name,
          count: '',
          keywords,
        };
      }, patterns);

      sequenceAndPatterns = [
        ...sequenceAndPatterns,
        {
          id,
          isPattern: false,
          name: seqKeywords.join('-'),
          count,
          keywords: [],
        },
        ...patterns,
      ];
    }, sequences);

    return {
      rawData,
      data: {
        sequences: sequenceAndPatterns,
      },
    };
  });
};

export default loadLogPatternSequenceList;
