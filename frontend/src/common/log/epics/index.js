/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import fileEpic from './fileEpic';
import streamingEpic from './streamingEpic';
import streamingListEpic from './streamingListEpic';
import streamingIncidentEpic from './streamingIncidentEpic';

const epics = [
  fileEpic,
  streamingEpic,
  streamingListEpic,
  streamingIncidentEpic,
];

export default epics;
