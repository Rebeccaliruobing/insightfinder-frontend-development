/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectEpisodeWord = (credentials: Credentials, projectName: String) => {
  return fetchGet(getEndpoint('logAnalysis'), {
    ...credentials,
    projectName,
    operation: 'readonly',
    isExistentIncident: true,
  }).then((d) => {
    const rawData = d.data;
    const data = {
      episodes: rawData.episodeMapArr || [],
      words: rawData.wordCountArr || [],
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectEpisodeWord;
