/*  @flow */
import { get } from 'lodash';
import R from 'ramda';
import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchPost from './fetchPost';

const loadLogIncident = (
  credentials: Credentials,
) => {
  return fetchPost(
    getEndpoint('dashboard-benchmark'), {
      ...credentials,
      operation: 'display',
    },
  ).then((d) => {
    let infos = JSON.parse(get(d, ['data', 'publishedDataAllInfo'], '[]'));

    // Convert metaData from string to object
    infos = R.map(i => ({
      ...i,
      metaData: JSON.parse(i.metaData || '{}'),
    }), infos);

    return infos;
  });
};

export default loadLogIncident;
