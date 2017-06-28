/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get, isNumber } from 'lodash';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const loadProjectSettings = (credentials: Credentials, params: Object) => {
  return fetchGet(getEndpoint('projects/update'), {
    ...credentials,
    ...params,
    operation: 'display',
  }).then((d) => {
    const rawData = d.data;

    // The settings return from API are in several strings, we need to convert them
    // into objects.

    // sharedUsernames is an java list string, like [demo,test], convert into array
    // and do string trim and remove empty string.
    const sharedUsernamesStr = get(rawData, 'projectModelAllJSON.sharedUsernames', '').replace(
      /[[\]]/gi,
      '',
    );
    const sharedUserNames = R.filter(R.identity, sharedUsernamesStr.split(/\s*,\s*/));

    const predictionWindow = get(rawData, 'projectModelAllJSON.predictionWindow', '4');
    const learningSkippingPeriod = get(rawData, 'projectModelAllJSON.learningSkippingPeriod ', '');
    const detectionSkippingPeriod = get(rawData, 'projectModelAllJSON.detectionSkippingPeriod', '');
    const pvalue = get(rawData, 'projectModelAllJSON.pvalue', '0.9');
    const cvalue = get(rawData, 'projectModelAllJSON.cvalue', '5');
    const emailpvalue = get(rawData, 'projectModelAllJSON.emailpvalue', '0.9');
    const emailcvalue = get(rawData, 'projectModelAllJSON.emailcvalue', '5');
    const derivedpvalue = get(rawData, 'projectModelAllJSON.derivedpvalue', '0.9');
    const logFreqWindow = get(rawData, 'projectModelAllJSON.logFreqWindow', '10');

    // The metricUnitMapping and metricSettings is a string, converted it into array.
    // Meanwhile, needs merge metric info from both string.
    const metricSettings = JSON.parse(
      get(rawData, 'projectSettingsAllInfoJSON.metricSettings', '[]'),
    );
    const metricUnitMapping = JSON.parse(get(rawData, 'metricUnitMapping', '[]'));

    const metricUnitMap = {};
    R.forEach((item) => {
      const { unit, shortMetric } = item;
      metricUnitMap[item.metric] = { unit, shortMetric };
    }, metricUnitMapping);

    const metrics = R.map((setting) => {
      let smetric = setting.smetric;
      const pos = smetric.indexOf('/');
      if (pos !== -1) {
        smetric = smetric.substring(0, pos);
      }
      let { unit, shortMetric } = metricUnitMap[smetric] || {};
      const pos2 = unit.indexOf('(');
      const pos3 = unit.indexOf(')');
      if (pos2 !== -1 && pos3 !== -1) {
        unit = unit.substring(pos2 + 1, pos3);
      }
      let isCustomMetric = false;
      if (
        (!isNumber(setting.groupId) ||
          (isNumber(setting.groupId) && parseInt(setting.groupId, 10) < 1000)) &&
        unit === ''
      ) {
        // has group id<1000 and not AWS/GAE metrics
        isCustomMetric = true;
      }
      return {
        ...setting,
        unit,
        shortMetric,
        isCustomMetric,
      };
    }, metricSettings);

    const data = {
      sharedUserNames,
      predictionWindow,
      learningSkippingPeriod,
      detectionSkippingPeriod,
      pvalue,
      cvalue,
      emailpvalue,
      emailcvalue,
      derivedpvalue,
      logFreqWindow,
      metrics,
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectSettings;
