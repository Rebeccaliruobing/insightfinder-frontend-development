/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import { get, isNumber } from 'lodash';
import R from 'ramda';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getProjectModel = (credentials: Credentials, projectName: String, params: Object) => {
  const { instanceGroup, startTime, endTime } = params;
  const dateFormat = 'YYYY-MM-DD';

  // The start time & end time is in logical format, like 2017-06-26, convert it into GMT time.
  const modelStartTime = moment(startTime, dateFormat).subtract(1, 'day').endOf('day').valueOf();
  const modelEndTime = moment(endTime, dateFormat).endOf('day').valueOf();

  return fetchGet(getEndpoint('modelPicking'), {
    ...credentials,
    projectName,
    operation: 'list',
    instanceGroup,
    modelStartTime,
    modelEndTime,
  }).then(d => {
    const rawData = d.data;
    const rawModels = get(rawData, 'modelKeys', []);

    // Convert
    const models = R.map(m => {
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
      const metrics = mapIndexed((val, idx) => {
        return {
          name: val,
          max: isNumber(maxs[idx]) ? maxs[idx].toFixed(2) : NaN,
          min: isNumber(mins[idx]) ? mins[idx].toFixed(2) : NaN,
        };
      }, names);

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

export default getProjectModel;
