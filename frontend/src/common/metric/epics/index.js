/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

import loadMetricEventSummaryEpic from './loadMetricEventSummaryEpic';
import hourlyEventsEpic from './hourlyEventsEpic';
import weeklyAnomaliesEpic from './weeklyAnomaliesEpic';

const epics = [hourlyEventsEpic, loadMetricEventSummaryEpic, weeklyAnomaliesEpic];

export default epics;
