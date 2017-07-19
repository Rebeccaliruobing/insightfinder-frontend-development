/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

/* eslint-disable no-console */
import R from 'ramda';
import { isArray } from 'lodash';
import moment from 'moment';

import type { Credentials } from '../types';
import getEndpoint from './getEndpoint';
import fetchGet from './fetchGet';

const getLogIncidentList = (credentials: Credentials, projectName: String, params: Object) => {
  const monthFormat = 'YYYY-MM';
  const { month } = params;

  return fetchGet(getEndpoint('logstreaming'), {
    ...credentials,
    operation: 'list',
    projectName,
    // Convert the month into utc time.
    monthlyDate: moment.utc(month, monthFormat).startOf('month').valueOf(),
  }).then(d => {
    const rawData = d.data;

    if (!isArray(d.data)) {
      console.error('[IF] expected data contains Array of incident, but get', d.data);
    }

    const monthObj = moment.utc(month, monthFormat).startOf('month');
    const daysInMonth = monthObj.daysInMonth();
    const incidentList = d.data || [];
    let currentDay = 1;

    // Sort by incidents start time.
    const incidents = [];
    R.forEach(i => {
      const startTime = moment.utc(i.incidentStartTime);
      const dayOfMonth = startTime.date();
      // If there is any missing day, add a empty one.
      while (currentDay < dayOfMonth) {
        const incidentKey = monthObj.valueOf().toString();
        incidents.push({
          isEmpty: true,
          dayOfMonth: monthObj.date(),
          weekday: monthObj.weekday(),
          incidentKey,
          id: incidentKey,
          name: monthObj.format('YYYY-MM-DD'),
        });
        monthObj.add(1, 'day');
        currentDay += 1;
      }

      incidents.push({
        ...i,
        isEmpty: false,
        dayOfMonth: startTime.date(),
        weekday: startTime.weekday(),
        id: startTime.valueOf().toString(),
        name: startTime.format('YYYY-MM-DD'),
        totalEventsCount: i.logentrycount,
        rareEventsCount: i.rareEventsSize,
        anomalyHigherCount: i.anomalyHigherCount,
        anomalyLowerCount: i.anomalyLowerCount,
        clusterCount: (i.cluster || []).length,
      });
      monthObj.add(1, 'day');
      currentDay += 1;
    }, incidentList);

    while (currentDay <= daysInMonth) {
      const incidentKey = monthObj.valueOf().toString();
      incidents.push({
        isEmpty: true,
        dayOfMonth: monthObj.date(),
        weekday: monthObj.weekday(),
        incidentKey,
        id: incidentKey,
      });
      monthObj.add(1, 'day');
      currentDay += 1;
    }

    return {
      rawData,
      data: { incidentList: incidents },
    };
  });
};

export default getLogIncidentList;
