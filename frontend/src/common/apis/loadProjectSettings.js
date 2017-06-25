/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get } from 'lodash';

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
    };

    return {
      rawData,
      data,
    };
  });
};

export default loadProjectSettings;
