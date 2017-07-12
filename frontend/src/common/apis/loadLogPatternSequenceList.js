/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* eslint-disable no-console */

import R from 'ramda';
import { isArray } from 'lodash';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import { logPatternTopKToArray } from './magicParsers';

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
  }).then(d => {
    const rawData = d.data;
    const sequences = rawData || [];

    // Merge sequences and patters into a array, with different type.
    let sequenceAndPatterns = [];

    R.addIndex(R.forEach)((seq, idx) => {
      const { count, pattern, patternInfoList } = seq;
      const id = `seq-${idx}`;

      if (pattern && !isArray(patternInfoList)) {
        console.error("[IF] Pattern sequence doesn't contains patternInfoList array", seq);
      }

      const patternsInfo = patternInfoList || [];
      const seqNameWords = [];
      let seqKeywords = [];
      const seqPatterns = [];
      const patterns = R.map(p => {
        const { nid, patternName, count } = p;
        const keywords = logPatternTopKToArray(p.topK);
        const episodes = logPatternTopKToArray(p.topKEpisode);
        let name = patternName;
        if (name === `Pattern ${nid}`) {
          seqNameWords.push(keywords[0] || name);
          name = keywords.join('-') || name;
        }
        seqKeywords = seqKeywords.concat(keywords);
        seqPatterns.push(nid);

        return {
          id: nid,
          isPattern: true,
          name,
          count,
          keywords,
          episodes,
        };
      }, patternsInfo);

      sequenceAndPatterns = [
        ...sequenceAndPatterns,
        {
          id,
          patterns: seq.pattern,
          isSequence: true,
          name: seqNameWords.join('-'),
          keywords: seqKeywords,
          count,
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
