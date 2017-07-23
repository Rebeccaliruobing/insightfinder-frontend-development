/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

import loadMetricEventSummaryEpic from './loadMetricEventSummaryEpic';
import hourlyEventsEpic from './hourlyEventsEpic';
import weeklyAnomaliesEpic from './weeklyAnomaliesEpic';
import updateMetricEventPatternNameEpic from './updateMetricEventPatternNameEpic';

const epics = [
  hourlyEventsEpic,
  loadMetricEventSummaryEpic,
  weeklyAnomaliesEpic,
  updateMetricEventPatternNameEpic,
];

export default epics;
