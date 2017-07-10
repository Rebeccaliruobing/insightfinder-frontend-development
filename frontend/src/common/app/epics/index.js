/* @flow */
/**
 * *****************************************************************************
 * copyright insightfinder inc., 2017
 * *****************************************************************************
 **/

import loadProjectGroupListEpic from './loadProjectGroupListEpic';
import projectEpic from './projectEpic';
import { RehydrateEpic, appStartEpic } from './startEpic';

const epics = [loadProjectGroupListEpic, RehydrateEpic, appStartEpic, projectEpic];

export default epics;
