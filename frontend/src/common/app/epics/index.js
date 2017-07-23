/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

import loadProjectGroupListEpic from './loadProjectGroupListEpic';
import projectEpic from './projectEpic';
import { RehydrateEpic, appStartEpic } from './startEpic';
import defaultTimezoneEpic from './defaultTimezoneEpic';

const epics = [
  loadProjectGroupListEpic,
  RehydrateEpic,
  appStartEpic,
  projectEpic,
  defaultTimezoneEpic,
];

export default epics;
