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
import fetchGet from './fetchGet';

const loadProjectModel = (credentials: Credentials, projectName: String, params: Object) => {
  return fetchGet(getEndpoint('modelPicking'), {
    ...credentials,
    projectName,
    operation: 'list',
    ...params,
  }).then((d) => {
    const rawData = d.data;
    const rawModels = get(rawData, 'modelKeys', []);

    // Convert
    const models = R.map((m) => {
      const {
        startTimestamp,
        endTimestamp,
        mapData,
        modelKey,
        pickableFlag,
        sampleCount,
        maxValues,
        metricNameList,
        minValues,
      } = m;

      const names = (metricNameList || '[]').slice(1, -1).split(',');
      const maxs = JSON.parse(maxValues || '[]');
      const mins = JSON.parse(minValues || '[]');

      const mapIndexed = R.addIndex(R.map);
      const metrics = mapIndexed((val, idx) => ({
        name: val,
        max: maxs[idx].toFixed(2),
        min: mins[idx].toFixed(2),
      }), names);

      return {
        startTimestamp,
        endTimestamp,
        mapData,
        metrics,
        modelKey,
        pickableFlag,
        sampleCount,
      };
    }, rawModels);

    const data = {
      models,
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectModel;
