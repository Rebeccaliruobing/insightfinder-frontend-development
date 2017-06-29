/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import incidentEpic from './incidentEpic';
import incidentListEpic from './incidentListEpic';
import fileEpic from './fileEpic';
import streamingEpic from './streamingEpic';
import streamingListEpic from './streamingListEpic';
import streamingIncidentEpic from './streamingIncidentEpic';

const epics = [
  incidentEpic,
  incidentListEpic,
  fileEpic,
  streamingEpic,
  streamingListEpic,
  streamingIncidentEpic,
];

export default epics;
