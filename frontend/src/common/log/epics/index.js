/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import eventListEpic from './eventListEpic';
import incidentEpic from './incidentEpic';
import incidentListEpic from './incidentListEpic';
import logDetectionEpic from './logDetectionEpic';
import fileEpic from './fileEpic';
import streamingEpic from './streamingEpic';
import streamingListEpic from './streamingListEpic';
import streamingIncidentEpic from './streamingIncidentEpic';

const epics = [
  eventListEpic,
  incidentEpic,
  incidentListEpic,
  logDetectionEpic,
  fileEpic,
  streamingEpic,
  streamingListEpic,
  streamingIncidentEpic,
];

export default epics;
