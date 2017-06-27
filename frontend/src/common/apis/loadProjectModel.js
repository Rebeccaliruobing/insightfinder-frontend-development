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
        modelKey,
        pickableFlag,
        sampleCount,
        maxValues,
        metricNameList,
        minValues,
        pickedFlag,
        pickedExpiry,
        // pickedModelKeyTimestamp,
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

      const dataset = get(m, 'mapData[0].NASValues', []);
      const heatmap = dataset.map(d => parseFloat(d.split(',')[1]));

      return {
        startTimestamp,
        endTimestamp,
        heatmap,
        metrics,
        modelKey,
        pickable: Boolean(pickableFlag),
        picked: Boolean(pickedFlag),
        pickedExpiry,
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
