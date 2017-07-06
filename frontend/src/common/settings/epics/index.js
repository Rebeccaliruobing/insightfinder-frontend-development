/* @flow */
/**
 * *****************************************************************************
 * Copyright InsightFinder Inc., 2017
 * *****************************************************************************
 **/

import createProjectEpic from './createProjectEpic';
import loadExternalServiceListEpic from './loadExternalServiceListEpic';
import loadProjectSettingsEpic from './loadProjectSettingsEpic';
import pickProjectModelEpic from './pickProjectModelEpic';
import removeProjectEpic from './removeProjectEpic';
import removeProjectModelEpic from './removeProjectModelEpic';
import saveProjectSettingsEpic from './saveProjectSettingsEpic';

const epics = [
  createProjectEpic,
  loadExternalServiceListEpic,
  loadProjectSettingsEpic,
  pickProjectModelEpic,
  removeProjectEpic,
  removeProjectModelEpic,
  saveProjectSettingsEpic,
];

export default epics;
