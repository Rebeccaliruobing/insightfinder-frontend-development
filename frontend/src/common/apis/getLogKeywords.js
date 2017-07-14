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

const getLogKeywords = (credentials: Credentials, projectName: String, params: Object) => {
  // Use the time as the incident id.
  const { incidentId } = params;
  return fetchGet(getEndpoint('logkeyword'), {
    ...credentials,
    projectName,
    dayTimeMillis: incidentId,
  }).then(d => {
    const rawData = d.data;
    let keywordList = rawData || [];

    keywordList = R.sort((a, b) => a.count - b.count, keywordList);
    keywordList = R.map(
      k => ({
        ...k,
        id: k.keyword,
        name: k.keyword,
      }),
      keywordList,
    );

    const data = {
      keywordList,
    };
    console.log('[IF] log keywords', rawData, keywordList);

    return {
      rawData,
      data,
    };
  });
};

export default getLogKeywords;
