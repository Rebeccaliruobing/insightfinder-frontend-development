/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import fileEpic from './fileEpic';
import streamingListEpic from './streamingListEpic';

const epics = [
  fileEpic,
  streamingListEpic,
];

export default epics;
