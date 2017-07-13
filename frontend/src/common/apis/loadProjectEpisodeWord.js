/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectEpisodeWord = (credentials: Credentials, projectName: String) => {
  return fetchGet(getEndpoint('logAnalysis'), {
    ...credentials,
    projectName,
    operation: 'readonly',
    isExistentIncident: true,
  }).then(d => {
    const rawData = d.data;
    const episodes = rawData.episodeMapArr || [];
    const words = rawData.wordCountArr || [];

    const selectedKeywords = R.map(
      w => ({
        ...w,
        id: w.index,
        name: w.pattern,
      }),
      R.filter(w => w.selected, words),
    );

    const data = {
      episodes,
      words,
      selectedKeywords,
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectEpisodeWord;
