/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/
/* @flow */

import loginEpic from './loginEpic';
import logoffEpic from './logoffEpic';

const epics = [
  loginEpic,
  logoffEpic,
];

export default epics;
