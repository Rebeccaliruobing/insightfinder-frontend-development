/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import R from 'ramda';
import { get } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';
import { getEventType } from './magicParsers';

const getMetricEventList = (
  credentials: Credentials,
  projectName: String,
  instanceGroup: String,
  eventType: String,
  params: Object,
) => {
  const dateFormat = 'YYYY-MM-DD';
  const modelType = instanceGroup.toLowerCase() === 'all' ? 'Holistic' : 'splitByEnv';
  const { startTime, endTime } = params;

  // TODO: based on the view, change start/end time.
  const nowObj = moment();
  const startTimeObj = moment(startTime, dateFormat).startOf('day');
  let endTimeObj = moment(endTime, dateFormat).endOf('day');
  if (endTimeObj > nowObj) {
    endTimeObj = nowObj;
  }

  return fetchGet(getEndpoint('events'), {
    ...credentials,
    projectName,
    instanceGroup,
    startTime: startTimeObj.valueOf(),
    endTime: endTimeObj.valueOf(),
    modelType,
    eventType,
  }).then(d => {
    const rawData = d.data;
    const gname = instanceGroup.split(':')[1] || instanceGroup;

    const events = get(rawData, gname, []);
    const eventList = R.addIndex(R.map)((evt, idx) => {
      const rootCauseTypes = get(evt, ['rootCauseJson', 'rootCauseTypes'], '');
      let eventTypes = rootCauseTypes.split('\n');
      eventTypes = R.uniq(
        R.map(s => getEventType(s), R.filter(s => Boolean(s), R.map(s => s.trim(), eventTypes))),
      );

      return {
        ...evt,
        id: events.length - idx,
        eventTypes,
        rootCauseTypes,
      };
    }, events);

    const ratios = R.map(v => v.anomalyRatio, eventList);
    const maxAnomalyRatio = R.reduce(R.max, 0, ratios);
    const minAnomalyRatio = R.reduce(R.min, 0, ratios);

    const data = {
      projectName,
      instanceGroup,
      maxAnomalyRatio,
      minAnomalyRatio,
      eventList,
    };

    return {
      rawData,
      data,
    };
  });
};

export default getMetricEventList;
