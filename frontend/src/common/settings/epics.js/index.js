/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import loadProjectSettingsEpic from './loadProjectSettingsEpic';
import saveProjectSettingsEpic from './saveProjectSettingsEpic';

const epics = [
  loadProjectSettingsEpic,
  saveProjectSettingsEpic,
];

export default epics;
