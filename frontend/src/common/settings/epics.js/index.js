/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import loadProjectSettingsEpic from './loadProjectSettingsEpic';
import pickProjectModelEpic from './pickProjectModelEpic';
import removeProjectEpic from './removeProjectEpic';
import removeProjectModelEpic from './removeProjectModelEpic';
import saveProjectSettingsEpic from './saveProjectSettingsEpic';

const epics = [
  loadProjectSettingsEpic,
  pickProjectModelEpic,
  removeProjectEpic,
  removeProjectModelEpic,
  saveProjectSettingsEpic,
];

export default epics;
