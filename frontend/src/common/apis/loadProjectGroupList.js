/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { get } from 'lodash';
import R from 'ramda';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const loadProjectGroupList = (credentials: Credentials, projectName: String) => {
  return fetchPost(getEndpoint('instanceGrouping'), {
    ...credentials,
    projectName,
    operation: 'getGrouping',
  }).then((d) => {
    const rawData = d.data;
    const groupstr = get(rawData, 'groupingString', '');
    const groups = R.sort(
      (a, b) => a.localeCompare(b),
      R.filter(g => Boolean(g), groupstr.split(',')),
    );

    const data = {
      groups,
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectGroupList;
